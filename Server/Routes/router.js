import express from "express";
import { signup, signin } from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/signin", signin);

// Protected route example
router.get("/check-auth", authMiddleware, (req, res) => {
  res.send({ userId: req.user._id });
});

export default router;