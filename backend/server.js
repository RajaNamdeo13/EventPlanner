import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from config/config.env or .env
dotenv.config({ path: path.join(__dirname, "config/config.env") });

import express from "express";
import cors from "cors";
import { initDatabase } from "./database/storage.js";
import messageRoute from "./routes/messageRoute.js";
import eventRoute from "./routes/eventRoute.js";

const app = express();

// CORS configuration (allow Vite frontend and any local testing)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow any localhost origin or deployed frontend
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for development
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().split("T")[1].slice(0, 8)}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/events", eventRoute);

// Direct stats route shortcut
app.get("/api/v1/stats", (req, res, next) => {
  req.url = "/stats";
  messageRoute(req, res, next);
});

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "EventPlanner API",
    version: "2.0.0",
    status: "online",
    documentation: {
      messages: "/api/v1/message/all",
      events: "/api/v1/events",
      stats: "/api/v1/stats",
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server Initialization
const PORT = process.env.PORT || 4000;

// Initialize Database connection (graceful fallback) and listen
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 EventPlanner API Server running on port ${PORT}`);
    console.log(`🌐 Local URL: http://localhost:${PORT}`);
    console.log(`📂 Health check: http://localhost:${PORT}/`);
    console.log(`==================================================\n`);
  });
});

export default app;
