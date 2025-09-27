import mongoose from "mongoose";
import Blog from "../Models/blog_schemas.js";
import getFileUri from "../Config/fileURI.js";
import { uploadToCloudinary } from "../Config/cloudinary.js";

export const createBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        if (!title || !description || !category) return res.status(400).json({ error: "Title, description and category are required" });
        if (!req.file) return res.status(400).json({ error: "Image is required" });

        // Convert file to URI format
        const fileUri = getFileUri(req.file);
        
        // Upload to Cloudinary
        const cloudinaryResponse = await uploadToCloudinary(fileUri, "blog_images");
        if (!cloudinaryResponse) {
            return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
        }

        const author = req.user._id;
        const newBlog = await Blog.create({
            title,
            author,
            description,
            category: category.trim(),
            imageUrl: cloudinaryResponse.secure_url,
        });

        const populatedBlog = await Blog.findById(newBlog._id).populate('author', 'name email avatar');
        res.status(201).json({ message: "Blog created successfully", blog: populatedBlog });
    } catch (error) {
        console.error("Blog creation error:", error);
        res.status(500).json({ error: "Server error while creating blog" });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email avatar").sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching blogs" });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email avatar").populate("comments.userId", "name email avatar");
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching blog" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        
        // Only include fields that are provided
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (category) updateData.category = category.trim();

        if (req.file) {
            try {
                // Convert file to URI format
                const fileUri = getFileUri(req.file);
                
                // Upload to Cloudinary
                const cloudinaryResponse = await uploadToCloudinary(fileUri, "blog_images");
                if (!cloudinaryResponse) {
                    return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
                }
                
                updateData.imageUrl = cloudinaryResponse.secure_url;
            } catch (error) {
                console.error("Image upload error:", error);
                return res.status(400).json({ error: "Failed to process image" });
            }
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate("author", "name email avatar");
        if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });

        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ error: "Server error while updating blog" });
    }
};

// DELETE Blog
export const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error while deleting blog" });
    }
};

// LIKE Blog
export const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email avatar").populate("comments.userId", "name email avatar");
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        const userIdStr = req.user._id.toString();
        const hasLiked = blog.likedBy?.some((l) => l.userId?.toString() === userIdStr);

        if (hasLiked) {
            blog.likedBy = blog.likedBy.filter((l) => l.userId?.toString() !== userIdStr);
            blog.likes = Math.max(0, (blog.likes || 0) - 1);
            await blog.save();
            return res.json({ message: "Blog unliked", liked: false, blog });
        } else {
            blog.likedBy.push({ userId: req.user._id });
            blog.likes = (blog.likes || 0) + 1;
            await blog.save();
            return res.json({ message: "Blog liked", liked: true, blog });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error while liking blog" });
    }
};

// READ / VIEW Blog (Unique Views)
export const readBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email avatar").populate("comments.userId", "name email avatar");
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        const alreadyViewed = blog.viewedBy.some((view) => view.userId.toString() === req.user._id.toString());
        if (!alreadyViewed) {
            blog.views += 1;
            blog.viewedBy.push({ userId: req.user._id });
            await blog.save();
        }

        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: "Server error while reading blog" });
    }
};

// SHARE Blog
export const shareBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email avatar").populate("comments.userId", "name email avatar");
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        const alreadyShared = blog.sharedBy.some((share) => share.userId.toString() === req.user._id.toString());
        if (!alreadyShared) {
            blog.shares += 1;
            blog.sharedBy.push({ userId: req.user._id });
            await blog.save();
        }

        res.json({ message: "Blog shared", blog });
    } catch (err) {
        res.status(500).json({ error: "Server error while sharing blog" });
    }
};

// GET Default Categories
export const getDefaultCategories = async (req, res) => {
    try {
        const categories = Blog.getDefaultCategories ? Blog.getDefaultCategories() : [];
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching categories" });
    }
};

// COMMENTS: Get list
export const getComments = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).select("comments").populate("comments.userId", "name email avatar");
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.json(blog.comments || []);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching comments" });
    }
};

// COMMENTS: Add
export const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) return res.status(400).json({ error: "Comment text is required" });

        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        const newComment = { userId: req.user._id, text: text.trim(), createdAt: new Date() };
        blog.comments.push(newComment);
        await blog.save();

        const updated = await Blog.findById(req.params.id).select("comments").populate("comments.userId", "name email avatar");
        res.status(201).json({ message: "Comment added", comments: updated.comments });
    } catch (error) {
        res.status(500).json({ error: "Server error while adding comment" });
    }
};

// COMMENTS: Delete
export const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        const comment = blog.comments.id(commentId);
        if (!comment) return res.status(404).json({ error: "Comment not found" });

        const isOwner = comment.userId?.toString() === req.user._id.toString();
        const isBlogAuthor = blog.author?.toString() === req.user._id.toString();
        if (!isOwner && !isBlogAuthor) return res.status(403).json({ error: "Not allowed to delete this comment" });

        comment.remove();
        await blog.save();

        const updated = await Blog.findById(id).select("comments").populate("comments.userId", "name email avatar");
        res.json({ message: "Comment deleted", comments: updated.comments });
    } catch (error) {
        res.status(500).json({ error: "Server error while deleting comment" });
    }
};