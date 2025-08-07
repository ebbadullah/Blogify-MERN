
import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Blog = mongoose.model("Blog", blogSchema)

export default Blog
