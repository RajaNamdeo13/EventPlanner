console.log("🔥 THIS server.js IS RUNNING 🔥");

import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import express from "express";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// MongoDB connection (Mongoose 7+)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Database connection failed:", err.message));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});


