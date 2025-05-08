import express from "express";
import { signup, signin } from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { createBlog } from "../Controllers/blogController.js";
import upload from "../Config/multer.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);

// Blog routes
router.post("/blogs", upload.single('image'), createBlog);

// Protected route
router.get("/check-auth", authMiddleware, (req, res) => {
  res.json({ userId: req.user._id });
});

export default router;