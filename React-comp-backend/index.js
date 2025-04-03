import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectMongoDB from './src/config/mongoDB.js';
import pool from './src/config/postgres.js';
import authRoute from './src/routes/authRoutes.js';
import userRoute from './src/routes/userRoutes.js';
import noteRoutes from './src/routes/noteRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectMongoDB();

// Connect to PostgreSQL
pool.connect()
  .then(() => console.log("Connected to PostgreSQL! ✅"))
  .catch((err) => console.error("PostgreSQL Connection Error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());


app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/note", noteRoutes);
app.use("/blog", blogRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});