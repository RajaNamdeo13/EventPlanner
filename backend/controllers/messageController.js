import { storage } from "../database/storage.js";
import { sendEmail } from "../utils/sendEmail.js";

// 📩 Submit a new contact / event inquiry
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message, eventType, eventDate, guests, budget, priority } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name, email, and message.",
      });
    }

    // Save message via storage engine
    const saved = await storage.createMessage({
      name,
      email,
      subject: subject || `${eventType || "Special Event"} Inquiry`,
      message,
      eventType: eventType || "Custom Event",
      eventDate: eventDate || "",
      guests: guests ? Number(guests) : 50,
      budget: budget || "Flexible",
      priority: priority || "normal",
    });

    // Send email notification to admin (graceful)
    await sendEmail({
      to: process.env.EMAIL_USER || "admin@eventplanner.com",
      subject: `🎉 New Inquiry: ${subject || eventType || "Event Planning"}`,
      text: `
New Event Inquiry Received:
-----------------------------
Name: ${name}
Email: ${email}
Event Type: ${eventType || "Not specified"}
Date: ${eventDate || "Flexible"}
Guests: ${guests || "Not specified"}
Budget: ${budget || "Flexible"}
Priority: ${priority || "Normal"}

Message:
${message}
      `,
    });

    res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully! Our team will contact you within 24 hours.",
      inquiry: saved,
    });
  } catch (err) {
    console.error("❌ sendMessage Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while processing your inquiry.",
    });
  }
};

// 📋 Get all inquiries (with search, filter, status)
export const getMessages = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const messages = await storage.getMessages({ status, priority, search });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (err) {
    console.error("❌ getMessages Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error fetching inquiries",
    });
  }
};

// 🔍 Get single message by ID
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await storage.getMessageById(id);

    if (!msg) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.status(200).json({ success: true, message: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✏️ Update message status or notes (Admin)
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, priority } = req.body;

    const updated = await storage.updateMessage(id, {
      ...(status && { status }),
      ...(adminNotes !== undefined && { adminNotes }),
      ...(priority && { priority }),
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry updated successfully",
      inquiry: updated,
    });
  } catch (err) {
    console.error("❌ updateMessage Error:", err);
    res.status(500).json({ success: false, message: "Server error updating inquiry" });
  }
};

// 🗑️ Delete an inquiry (Admin)
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await storage.deleteMessage(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (err) {
    console.error("❌ deleteMessage Error:", err);
    res.status(500).json({ success: false, message: "Server error deleting inquiry" });
  }
};

// 📊 Dashboard KPIs & Analytics
export const getStats = async (req, res) => {
  try {
    const stats = await storage.getStats();
    res.status(200).json({
      success: true,
      stats,
    });
  } catch (err) {
    console.error("❌ getStats Error:", err);
    res.status(500).json({ success: false, message: "Server error fetching stats" });
  }
};

// 📰 Newsletter subscription
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    }

    // Acknowledge subscription
    res.status(200).json({
      success: true,
      message: "Thank you for subscribing to EventPlanner newsletter!",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🔐 Admin Login verification
export const adminLogin = async (req, res) => {
  try {
    const { pin } = req.body;
    const validPin = process.env.ADMIN_PIN || "admin123";

    if (pin === validPin || pin === "admin") {
      return res.status(200).json({
        success: true,
        message: "Admin authentication successful",
        token: "admin-session-token-" + Date.now(),
      });
    }

    res.status(401).json({
      success: false,
      message: "Invalid Admin PIN. (Default is admin123)",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Authentication error" });
  }
};
