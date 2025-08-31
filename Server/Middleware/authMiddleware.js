import jwt from "jsonwebtoken";
import User from "../Models/user_schemas.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

