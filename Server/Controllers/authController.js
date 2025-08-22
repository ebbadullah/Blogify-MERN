import User from "../Models/user_schemas.js";
import Blog from "../Models/blog_schemas.js";
import upload from "../Config/multer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET || "simpleSecret123", {
        expiresIn: "7d",
    });
};

// Cookie options for dev/prod
const getCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

// Signup Controller
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar: req.file ? `/uploads/${req.file.filename}` : "/default-avatar.png"
        });

        const token = generateToken(user._id);

        res.cookie("token", token, getCookieOptions());

        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            },
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Server error during signup" });
    }
};

// Signin Controller
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, getCookieOptions());

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            },
        });
    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({ error: "Server error during signin" });
    }
};

// Get User Controller
const getUser = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = req.user._id;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const blogs = await Blog.find({ author: userId })
            .sort({ createdAt: -1 })
            .populate("author", "name email avatar");

        res.status(200).json({
            user,
            blogs,
        });
    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ error: "Server error while fetching user data" });
    }
};

export { signup, signin, getUser };

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, bio, location, website, twitter, instagram, github, linkedin } = req.body;

        const update = {
            ...(name !== undefined ? { name } : {}),
            ...(email !== undefined ? { email } : {}),
            ...(bio !== undefined ? { bio } : {}),
            ...(location !== undefined ? { location } : {}),
            ...(website !== undefined ? { website } : {}),
            ...(twitter !== undefined ? { twitter } : {}),
            ...(instagram !== undefined ? { instagram } : {}),
            ...(github !== undefined ? { github } : {}),
            ...(linkedin !== undefined ? { linkedin } : {}),
        };

        if (req.file) {
            update.avatar = `/uploads/${req.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(userId, update, { new: true }).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: "Profile updated", user });
    } catch (err) {
        console.error("Update profile error:", err);
        res.status(500).json({ error: "Server error while updating profile" });
    }
};