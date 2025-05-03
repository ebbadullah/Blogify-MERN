import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './Routes/router.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());  

app.use("/api", router)

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI ||"mongodb+srv://ebaddata021:ebadhunmekiakaregat0@cluster0.kpb2neh.mongodb.net/Blog"
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log(err));


