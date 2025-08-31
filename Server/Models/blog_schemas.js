import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        category: { type: String, required: true, trim: true },
        likes: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        viewedBy: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, viewedAt: { type: Date, default: Date.now } }],
        sharedBy: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, sharedAt: { type: Date, default: Date.now } }],
    },
    { timestamps: true }
);

blogSchema.add({
    likedBy: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, likedAt: { type: Date, default: Date.now } }],
    comments: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, text: { type: String, required: true, trim: true }, createdAt: { type: Date, default: Date.now } }],
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;