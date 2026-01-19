import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import testRouter from "./router/testRouter.js";

const app = express(); // ✅ MUST be before app.use()

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// CORS Configuration
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ROUTES (order matters)
app.use("/api", testRouter);
app.use("/api/v1/message", messageRouter);

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Event Planner API is running! 🚀",
  });
});

// Connect to database
dbConnection();

export default app;
