import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'; // Add this line
import connectDB from './Config/db_connection.js';
import router from './Routes/router.js';

dotenv.config();

// Initialize express
const app = express();

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Add this line
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", router);

// Server setup
const PORT = process.env.PORT || 5000;

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});