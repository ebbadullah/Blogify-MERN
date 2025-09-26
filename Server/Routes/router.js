import express from "express";
import { signup, signin, getUser, updateProfile, searchUsers, getPublicUserProfile } from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, likeBlog, readBlog, shareBlog, getDefaultCategories, getComments, addComment, deleteComment } from "../Controllers/blogController.js";
import upload from "../Config/multer.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", authMiddleware, getUser);
router.put("/user", authMiddleware, upload.single("avatar"), updateProfile);
router.get("/users/search", searchUsers);
router.get("/users/:id", getPublicUserProfile);

router.post("/blogs", authMiddleware, upload.single("image"), createBlog); 
router.get("/blogs", getBlogs); 
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", authMiddleware, upload.single("image"), updateBlog); 
router.delete("/blogs/:id", authMiddleware, deleteBlog); 
router.post("/blogs/:id/like", authMiddleware, likeBlog); 
router.post("/blogs/:id/read", authMiddleware, readBlog); 
router.post("/blogs/:id/share", authMiddleware, shareBlog);

router.get("/blogs/:id/comments", getComments);
router.post("/blogs/:id/comments", authMiddleware, addComment);
router.delete("/blogs/:id/comments/:commentId", authMiddleware, deleteComment);

router.get("/blogs/categories", getDefaultCategories); 

router.get("/check-auth", authMiddleware, (req, res) => {
    res.json({ userId: req.user._id });
});

export default router;