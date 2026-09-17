import express from "express";
import {
  sendMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getStats,
  subscribeNewsletter,
  adminLogin,
} from "../controllers/messageController.js";

const router = express.Router();

// Public inquiry endpoints
router.post("/send", sendMessage);
router.post("/newsletter", subscribeNewsletter);
router.post("/admin/login", adminLogin);

// Dashboard endpoints
router.get("/stats", getStats);
router.get("/all", getMessages);
router.get("/admin", getMessages); // Alias for backwards compatibility with Admin.jsx
router.get("/:id", getMessageById);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;
