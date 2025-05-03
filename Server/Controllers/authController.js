import User from "../Models/user_schemas.js";
import bcrypt from 'bcryptjs';

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const FindUser = await User.findOne({ email });
        if (FindUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password

        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword 
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Signin Controller
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ 
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export { signup, signin };