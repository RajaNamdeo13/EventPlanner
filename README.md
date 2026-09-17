# 🎉 EventPlanner — Full-Stack Event Management & Booking Platform

A full-stack, production-grade **Event Planning & Booking Web Application** built using the **MERN Stack (MongoDB / Resilient JSON Storage, Express.js, React.js, Node.js, Vite)**.

Designed with modern dark-slate and vibrant amber aesthetics, glassmorphism cards, interactive budget estimation, complete inquiry booking flows, and an administrative control hub.

---

## 🌟 Key Features

### 💻 Client Experience (Frontend)
- 🌐 **Modern Luxury Aesthetic**: Tailored dark slate palette, animated ambient spotlights, vibrant amber accents, and micro-interactions.
- ⚡ **Interactive Event Cost & Budget Estimator**: Real-time pricing calculator for guests, venue styling, catering tiers, and add-on productions (drones, live bands, pyrotechnics) with 1-click quote prefill.
- 🎪 **Comprehensive Services Showcase**: 6 curated event packages (Weddings, Corporate Summits, Milestone Birthdays, Anniversaries, Glamping Retreats, Esports Tournaments).
- 📸 **Filterable Portfolio Showcase**: Categorized gallery of past and upcoming celebrations with guest and venue metadata.
- 📩 **Smart Booking Inquiry Form**: Multi-parameter inquiry form (event type, target date, guest count, budget range, urgency level) with instant toast feedback.
- 💬 **Client Testimonials & Expandable FAQ**: Social proof and accordion answering top logistical questions.
- 📱 **100% Responsive**: Smooth navigation across desktop, tablets, and smartphones with mobile drawer menu.
- 📰 **Newsletter Subscription**: Connected live to backend.

### 🛡️ Administrative Control Hub (`/admin`)
- 🔐 **PIN Protected Access**: Secure administrative gate (Default PIN: `admin123`).
- 📊 **Real-time KPI Metrics**: Live statistics for total inquiries, pending action items, confirmed bookings, and estimated revenue pipeline.
- 📋 **Inquiry Moderation Table**:
  - Live search by client name, email, or subject.
  - Multi-criteria filtering by Status (`New`, `In Progress`, `Confirmed`, `Archived`) and Priority (`Urgent`, `Normal`, `Low`).
  - Inline status update dropdowns that persist to database.
  - Detail Inspection modal with client requirements and internal staff notes editor.
  - Direct email launcher (`mailto:`).
  - Permanent delete action.
  - **1-Click Export to CSV** for client records and spreadsheet imports.
- 🎪 **Services & Events Catalog Manager**: Add, inspect, and remove published event packages.

### ⚙️ Resilient Backend Architecture
- 🗄️ **Dual Storage Engine**:
  - Automatically connects to **MongoDB** if available.
  - Seamlessly falls back to a **persistent local JSON storage** (`backend/data/`) if MongoDB is not running, ensuring zero-configuration startup out of the box!
- ✉️ **Safe Email Delivery Service**:
  - Dispatches email alerts via Nodemailer when configured.
  - Automatically uses mock console logger if SMTP credentials are omitted, preventing crashes.
- 🔒 **CORS & Error Handling**: Robust CORS middleware and standardized JSON error responses.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router v7, React Scroll, React Hot Toast, React Icons.
- **Backend**: Node.js, Express.js (v5), Mongoose (v9), Nodemailer, CORS, Dotenv.
- **Database**: MongoDB (with zero-config local persistent JSON fallback).
- **Tooling**: Concurrently (multi-process runner), Rollup/Vite build system.

---

## 📂 Project Structure

```
EventPlanner/
├── backend/
│   ├── config/
│   │   └── config.env             # Environment variables (PORT, DB, PIN)
│   ├── controllers/
│   │   └── messageController.js   # Inquiry CRUD, stats, auth, newsletter
│   ├── database/
│   │   ├── dbConnection.js        # Mongoose connector
│   │   └── storage.js             # Dual MongoDB/JSON persistent storage engine
│   ├── data/                      # Local JSON persistent database (fallback)
│   │   ├── messages.json
│   │   └── events.json
│   ├── models/                    # Mongoose schemas
│   ├── routes/
│   │   ├── messageRoute.js        # Message & inquiry API endpoints
│   │   └── eventRoute.js          # Events catalog API endpoints
│   ├── utils/
│   │   └── sendEmail.js           # Safe email delivery & mock logger
│   ├── package.json
│   └── server.js                  # Express API server entry point
│
├── frontend/
│   ├── public/
│   │   ├── images/                # Vector service illustrations
│   │   ├── event-hero.svg         # Hero stage backdrop graphic
│   │   └── event.jpg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Responsive navbar with smooth scroll & routes
│   │   │   ├── HeroSection.jsx    # Hero with live counters & CTAs
│   │   │   ├── Services.jsx       # Tabbed packages showcase
│   │   │   ├── Calculator.jsx     # Real-time event budget estimator
│   │   │   ├── Portfolio.jsx      # Filterable event gallery
│   │   │   ├── About.jsx          # Company story & pillars
│   │   │   ├── Testimonials.jsx   # Client reviews & star ratings
│   │   │   ├── FAQ.jsx            # Interactive accordion
│   │   │   ├── Contact.jsx        # Smart booking inquiry form
│   │   │   └── Footer.jsx         # Newsletter & navigation footer
│   │   ├── pages/
│   │   │   └── Admin.jsx          # Full Admin control hub & moderation portal
│   │   ├── App.jsx                # Router & toast configuration
│   │   ├── App.css                # Luxury design system stylesheet
│   │   └── main.jsx
│   └── package.json
│
├── package.json                   # Root orchestrator with concurrently
└── README.md
```

---

## 🚀 Quick Start Guide

### 1️⃣ Automatic One-Command Setup
To install all dependencies across root, backend, and frontend:
```bash
npm run install-all
```

### 2️⃣ Start Both Backend & Frontend
Launch the complete full-stack environment with one command:
```bash
npm run dev
```

The terminal will launch:
- 🌐 **Frontend**: `http://localhost:5173`
- 🚀 **Backend API**: `http://localhost:4000`

---

## 🔐 Administrative Access

Navigate to:
```
http://localhost:5173/admin
```
- **Default Admin PIN**: `admin123` (or `admin`)
- PIN can be customized in `backend/config/config.env` under `ADMIN_PIN`.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/` | API status & health check | Public |
| `POST` | `/api/v1/message/send` | Submit event booking inquiry | Public |
| `GET` | `/api/v1/message/all` | Fetch all inquiries (with search/filters) | Admin |
| `PUT` | `/api/v1/message/:id` | Update status (`new`, `in-progress`, `confirmed`, `archived`) & notes | Admin |
| `DELETE` | `/api/v1/message/:id` | Delete inquiry | Admin |
| `GET` | `/api/v1/stats` | KPI analytics & metrics | Admin |
| `POST` | `/api/v1/message/admin/login` | Authenticate admin PIN | Admin |
| `POST` | `/api/v1/message/newsletter` | Newsletter subscribe | Public |
| `GET` | `/api/v1/events` | List published event packages | Public |
| `POST` | `/api/v1/events` | Publish new event package | Admin |
| `DELETE` | `/api/v1/events/:id` | Remove event package | Admin |

---

## 📦 How to Extract and Run from the ZIP Package
1. Unzip `EventPlanner-FullStack.zip` into any folder.
2. Open a terminal inside that folder.
3. Run:
   ```bash
   npm run install-all
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser!
