import User from "../Models/user_schemas.js";
import Blog from "../Models/blog_schemas.js";
import upload from "../Config/multer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "simpleSecret123";

const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

const getCookieOptions = () => ({
    httpOnly: true,
    // localhost:5173 → localhost:3000 is same-site, Lax works reliably in dev
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already in use" });

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
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
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
        if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = generateToken(user._id);
        res.cookie("token", token, getCookieOptions());

        res.json({
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
        });
    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({ error: "Server error during signin" });
    }
};

// Get User Controller
const getUser = async (req, res) => {
    try {
        if (!req.user || !req.user._id) return res.status(401).json({ error: "Unauthorized" });

        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 }).populate("author", "name email avatar");

        res.status(200).json({ user, blogs });
    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ error: "Server error while fetching user data" });
    }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, bio, dateOfBirth, location, website, twitter, instagram, github, linkedin } = req.body;

        const update = {
            ...(name !== undefined ? { name } : {}),
            ...(email !== undefined ? { email } : {}),
            ...(bio !== undefined ? { bio } : {}),
            ...(dateOfBirth !== undefined ? { dateOfBirth } : {}),
            ...(location !== undefined ? { location } : {}),
            ...(website !== undefined ? { website } : {}),
            ...(twitter !== undefined ? { twitter } : {}),
            ...(instagram !== undefined ? { instagram } : {}),
            ...(github !== undefined ? { github } : {}),
            ...(linkedin !== undefined ? { linkedin } : {}),
        };

        if (req.file) update.avatar = `/uploads/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(userId, update, { new: true }).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: "Profile updated", user });
    } catch (err) {
        console.error("Update profile error:", err);
        res.status(500).json({ error: "Server error while updating profile" });
    }
};

export { signup, signin, getUser };

// Public: search users by name or email
export const searchUsers = async (req, res) => {
    try {
        const q = (req.query.q || "").trim();
        if (!q) return res.json([]);
        const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        const users = await User.find({ $or: [{ name: regex }, { email: regex }] })
            .select("name email avatar createdAt")
            .limit(10);
        res.json(users);
    } catch (err) {
        console.error("Search users error:", err);
        res.status(500).json({ error: "Server error while searching users" });
    }
};

// Public: get a user's public profile with their blogs
export const getPublicUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        const blogs = await Blog.find({ author: id })
            .sort({ createdAt: -1 })
            .populate("author", "name email avatar");
        res.json({ user, blogs });
    } catch (err) {
        console.error("Get public profile error:", err);
        res.status(500).json({ error: "Server error while fetching profile" });
    }
};