import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "../data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const EVENTS_FILE = path.join(DATA_DIR, "events.json");

let isMongoConnected = false;

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed events
const SEED_EVENTS = [
  {
    _id: "evt-1",
    title: "Grand Royal Wedding",
    category: "Weddings",
    date: "2026-10-15",
    guests: "250 - 500 Guests",
    priceRange: "$15,000 - $35,000",
    description: "Complete luxury wedding planning including floral design, venue decor, catering management, and live orchestra.",
    image: "/images/wedding.svg",
    featured: true,
    status: "Upcoming"
  },
  {
    _id: "evt-2",
    title: "Global Tech Summit & Gala",
    category: "Corporate",
    date: "2026-11-02",
    guests: "400 - 800 Guests",
    priceRange: "$20,000 - $50,000",
    description: "Seamless corporate conference management with AV setup, keynote stages, VIP dining, and networking lounge.",
    image: "/images/party.svg",
    featured: true,
    status: "Upcoming"
  },
  {
    _id: "evt-3",
    title: "Golden Jubilee Anniversary",
    category: "Anniversary",
    date: "2026-09-28",
    guests: "80 - 150 Guests",
    priceRange: "$5,000 - $12,000",
    description: "Heartwarming celebration with personalized photo galleries, acoustic serenade, banquet dining, and keepsake favors.",
    image: "/images/anniversary.svg",
    featured: true,
    status: "Upcoming"
  },
  {
    _id: "evt-4",
    title: "Neon Glow Birthday Extravaganza",
    category: "Birthday",
    date: "2026-10-05",
    guests: "50 - 120 Guests",
    priceRange: "$3,500 - $8,000",
    description: "High-energy themed birthday bash with custom LED lighting, DJ, mocktail bar, and interactive photo booth.",
    image: "/images/birthday.svg",
    featured: false,
    status: "Upcoming"
  },
  {
    _id: "evt-5",
    title: "Starlight Wilderness Retreat",
    category: "Camping",
    date: "2026-11-20",
    guests: "30 - 70 Guests",
    priceRange: "$6,000 - $14,000",
    description: "Glamping adventure under the stars with bonfire acoustic jam, gourmet barbecue, stargazing guides, and team games.",
    image: "/images/camping.svg",
    featured: false,
    status: "Upcoming"
  },
  {
    _id: "evt-6",
    title: "Ultimate Esports & Board Game Night",
    category: "Game Night",
    date: "2026-10-22",
    guests: "40 - 100 Guests",
    priceRange: "$2,500 - $5,500",
    description: "Curated gaming tournament experience with multi-screen setups, tournament brackets, gaming snacks, and trophies.",
    image: "/images/gamenight.svg",
    featured: false,
    status: "Upcoming"
  }
];

// Initial seed messages/inquiries
const SEED_MESSAGES = [
  {
    _id: "msg-101",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    subject: "Dream Wedding In Tuscany Theme",
    message: "Hi! We are planning a sunset wedding next spring for about 180 guests. We would love full planning, floral styling, and music coordination.",
    eventType: "Wedding Planning",
    eventDate: "2027-04-18",
    guests: 180,
    budget: "$25,000 - $35,000",
    priority: "urgent",
    status: "new",
    adminNotes: "Bride requested a call this Friday afternoon.",
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString()
  },
  {
    _id: "msg-102",
    name: "Marcus Vance",
    email: "m.vance@apextech.io",
    subject: "Annual Corporate Leadership Summit",
    message: "Apex Tech is organizing our end-of-year executive summit for 300 international guests. We need high-end staging, VIP hospitality, and catering.",
    eventType: "Corporate Gala",
    eventDate: "2026-12-10",
    guests: 300,
    budget: "$40,000+",
    priority: "normal",
    status: "in-progress",
    adminNotes: "Sent initial deck and venue options in downtown.",
    createdAt: new Date(Date.now() - 3600 * 1000 * 26).toISOString()
  },
  {
    _id: "msg-103",
    name: "Elena Rostova",
    email: "elena.rostova@gmail.com",
    subject: "30th Birthday Masquerade Ball",
    message: "Looking to host a chic masquerade party with 60 guests. Need DJ, ambient lighting, signature cocktails, and gourmet finger foods.",
    eventType: "Party Planning",
    eventDate: "2026-10-30",
    guests: 65,
    budget: "$5,000 - $10,000",
    priority: "normal",
    status: "confirmed",
    adminNotes: "Deposit confirmed! DJ booked.",
    createdAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString()
  }
];

// Helper to read JSON file
function readJson(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), "utf8");
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return defaultValue;
  }
}

// Helper to write JSON file
function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err.message);
  }
}

// Initialize seed data if empty
if (!fs.existsSync(EVENTS_FILE)) {
  writeJson(EVENTS_FILE, SEED_EVENTS);
}
if (!fs.existsSync(MESSAGES_FILE)) {
  writeJson(MESSAGES_FILE, SEED_MESSAGES);
}

// Connect to MongoDB gracefully
export const initDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.log("ℹ️ MONGO_URI not configured. Using persistent local JSON database engine.");
    return false;
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500,
    });
    isMongoConnected = true;
    console.log("✅ MongoDB Connected successfully");
    return true;
  } catch (err) {
    console.log("⚠️ MongoDB connection unavailable (" + err.message + "). Seamlessly using local JSON database engine.");
    isMongoConnected = false;
    return false;
  }
};

export const storage = {
  isUsingMongo: () => isMongoConnected,

  // Messages / Inquiries
  getMessages: async (filter = {}) => {
    const messages = readJson(MESSAGES_FILE, SEED_MESSAGES);
    let result = [...messages];

    if (filter.status && filter.status !== "all") {
      result = result.filter((m) => m.status === filter.status);
    }
    if (filter.priority && filter.priority !== "all") {
      result = result.filter((m) => m.priority === filter.priority);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          (m.eventType && m.eventType.toLowerCase().includes(q))
      );
    }

    // Sort descending by creation date
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return result;
  },

  getMessageById: async (id) => {
    const messages = readJson(MESSAGES_FILE, SEED_MESSAGES);
    return messages.find((m) => m._id === id) || null;
  },

  createMessage: async (data) => {
    const messages = readJson(MESSAGES_FILE, SEED_MESSAGES);
    const newMessage = {
      _id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: data.name,
      email: data.email,
      subject: data.subject || "Event Planning Inquiry",
      message: data.message,
      eventType: data.eventType || "Custom Celebration",
      eventDate: data.eventDate || "",
      guests: data.guests || 50,
      budget: data.budget || "Flexible",
      priority: data.priority || "normal",
      status: "new",
      adminNotes: "",
      createdAt: new Date().toISOString()
    };

    messages.unshift(newMessage);
    writeJson(MESSAGES_FILE, messages);
    return newMessage;
  },

  updateMessage: async (id, updates) => {
    const messages = readJson(MESSAGES_FILE, SEED_MESSAGES);
    const index = messages.findIndex((m) => m._id === id);
    if (index === -1) return null;

    messages[index] = {
      ...messages[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    writeJson(MESSAGES_FILE, messages);
    return messages[index];
  },

  deleteMessage: async (id) => {
    const messages = readJson(MESSAGES_FILE, SEED_MESSAGES);
    const filtered = messages.filter((m) => m._id !== id);
    const deleted = messages.length !== filtered.length;
    if (deleted) {
      writeJson(MESSAGES_FILE, filtered);
    }
    return deleted;
  },

  // Events
  getEvents: async (category = "all") => {
    const events = readJson(EVENTS_FILE, SEED_EVENTS);
    if (category && category !== "all") {
      return events.filter((e) => e.category.toLowerCase() === category.toLowerCase());
    }
    return events;
  },

  createEvent: async (eventData) => {
    const events = readJson(EVENTS_FILE, SEED_EVENTS);
    const newEvent = {
      _id: `evt-${Date.now()}`,
      ...eventData,
      status: eventData.status || "Upcoming",
      featured: eventData.featured || false,
      createdAt: new Date().toISOString()
    };
    events.unshift(newEvent);
    writeJson(EVENTS_FILE, events);
    return newEvent;
  },

  deleteEvent: async (id) => {
    const events = readJson(EVENTS_FILE, SEED_EVENTS);
    const filtered = events.filter((e) => e._id !== id);
    writeJson(EVENTS_FILE, filtered);
    return true;
  },

  // Stats for Admin
  getStats: async () => {
    const messages = readJson(MESSAGES_FILE, SEED_MESSAGES);
    const events = readJson(EVENTS_FILE, SEED_EVENTS);

    const total = messages.length;
    const newCount = messages.filter((m) => m.status === "new").length;
    const inProgressCount = messages.filter((m) => m.status === "in-progress").length;
    const confirmedCount = messages.filter((m) => m.status === "confirmed").length;
    const urgentCount = messages.filter((m) => m.priority === "urgent").length;

    return {
      totalInquiries: total,
      newInquiries: newCount,
      inProgressInquiries: inProgressCount,
      confirmedInquiries: confirmedCount,
      urgentInquiries: urgentCount,
      totalEvents: events.length,
      estimatedPipeline: `$${(total * 8500).toLocaleString()}`,
      satisfactionRate: "99.4%"
    };
  }
};
