import User from "../Models/user_schemas.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET || 'simpleSecret123', {
    expiresIn: '7d'
  });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    const token = generateToken(user._id);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.status(201).json({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during signup' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user._id);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.json({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Server error during signin' });
  }
};

export { signup, signin };