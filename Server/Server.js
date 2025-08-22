import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'; 
import connectDB from './Config/db_connection.js';
import router from './Routes/router.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS config for local dev (React Vite on 5173)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("🚀 Blog API is running successfully!");
});


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});