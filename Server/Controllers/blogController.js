import Blog from "../Models/blog_schemas.js";

// Create blog controller
export const createBlog = async (req, res) => {
  const { title, author, description } = req.body;
  
  try {
    // Validate input
    if (!title || !author || !description) {
      return res.status(400).json({ error: "Title, author, and description are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Create new blog
    const newBlog = await Blog.create({
      title,
      author,
      description,
      imageUrl: `/uploads/${req.file.filename}`
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog
    });
    
  } catch (error) {
    console.error("Blog creation error:", error);
    res.status(500).json({ error: "Server error while creating blog" });
  }
};