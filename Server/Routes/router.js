import express from "express";
import { signup, signin, getUser } from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  readBlog,
  shareBlog,
  getDefaultCategories // 🔹 Import this
} from "../Controllers/blogController.js";
import upload from "../Config/multer.js";

const router = express.Router();

// 🔹 Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", authMiddleware, getUser);

// 🔹 Blog CRUD
router.post("/blogs", authMiddleware, upload.single("image"), createBlog); // Create
router.get("/blogs", getBlogs); // Get all
router.get("/blogs/:id", getBlogById); // Get one by ID
router.put("/blogs/:id", authMiddleware, upload.single("image"), updateBlog); // Update
router.delete("/blogs/:id", authMiddleware, deleteBlog); // Delete

// 🔹 Blog Actions
router.post("/blogs/:id/like", authMiddleware, likeBlog); // Like blog
router.post("/blogs/:id/read", authMiddleware, readBlog); // Unique view
router.post("/blogs/:id/share", authMiddleware, shareBlog); // Share blog

// 🔹 Categories route
router.get("/blogs/categories", getDefaultCategories); // ✅ New route to fetch default categories

// 🔹 Auth check
router.get("/check-auth", authMiddleware, (req, res) => {
  res.json({ userId: req.user._id });
});

export default router;
