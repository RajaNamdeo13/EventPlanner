import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import messageRoute from "./routes/messageRoute.js";

const app = express();

// 🔥 CORS FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// 🔥 Body parser
app.use(express.json());

// 🔥 Routes
app.use("/api/v1/message", messageRoute);

// 🔥 Test
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// 🔥 DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err.message));

// 🔥 Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
