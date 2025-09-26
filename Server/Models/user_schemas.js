import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String, default: "/default-avatar.png" },
        bio: { type: String, default: "" },
        dateOfBirth: { type: Date },
        location: { type: String, default: "" },
        website: { type: String, default: "" },
        twitter: { type: String, default: "" },
        instagram: { type: String, default: "" },
        github: { type: String, default: "" },
        linkedin: { type: String, default: "" }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;