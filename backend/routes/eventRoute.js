import express from "express";
import { storage } from "../database/storage.js";

const router = express.Router();

// Get all events / filter by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const events = await storage.getEvents(category);
    res.status(200).json({ success: true, count: events.length, events });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching events" });
  }
});

// Create new event (Admin)
router.post("/", async (req, res) => {
  try {
    const { title, category, date, guests, priceRange, description, image } = req.body;
    if (!title || !category) {
      return res.status(400).json({ success: false, message: "Title and Category are required" });
    }

    const event = await storage.createEvent({
      title,
      category,
      date: date || new Date().toISOString().split("T")[0],
      guests: guests || "100+ Guests",
      priceRange: priceRange || "Contact for Quote",
      description: description || "",
      image: image || "/images/party.svg",
    });

    res.status(201).json({ success: true, message: "Event created successfully", event });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating event" });
  }
});

// Delete event (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await storage.deleteEvent(id);
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting event" });
  }
});

export default router;
