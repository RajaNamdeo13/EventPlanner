import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaShieldAlt,
  FaSignOutAlt,
  FaHome,
  FaSearch,
  FaFilter,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaFileDownload,
  FaCalendarPlus,
  FaEnvelope,
  FaUsers,
  FaCoins,
  FaSync,
  FaTimes,
} from "react-icons/fa";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [activeTab, setActiveTab] = useState("inquiries"); // "inquiries" | "events" | "stats"

  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Selected Message Modal
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [adminNotesInput, setAdminNotesInput] = useState("");

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Weddings",
    date: "",
    guests: "150 Guests",
    priceRange: "$10,000 - $20,000",
    description: "",
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Check existing session
  useEffect(() => {
    const token = sessionStorage.getItem("admin_auth_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, statusFilter, priorityFilter]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      toast.error("Please enter the Admin PIN.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/v1/message/admin/login`, {
        pin: pinInput.trim(),
      });

      if (res.data.success) {
        sessionStorage.setItem("admin_auth_token", res.data.token || "admin-active");
        setIsAuthenticated(true);
        toast.success("Welcome, Administrator!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Admin PIN. (Default: admin123)");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth_token");
    setIsAuthenticated(false);
    toast.success("Logged out of Admin Portal.");
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Inquiries
      const msgRes = await axios.get(`${API_URL}/api/v1/message/all`, {
        params: {
          status: statusFilter,
          priority: priorityFilter,
          search: searchQuery,
        },
      });
      if (msgRes.data.success) {
        setMessages(msgRes.data.messages || []);
      }

      // 2. Fetch Stats
      const statsRes = await axios.get(`${API_URL}/api/v1/stats`);
      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }

      // 3. Fetch Events Catalog
      const evtRes = await axios.get(`${API_URL}/api/v1/events`);
      if (evtRes.data.success) {
        setEvents(evtRes.data.events || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      toast.error("Failed to load dashboard data. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Update Status
  const handleStatusChange = async (msgId, newStatus) => {
    try {
      const res = await axios.put(`${API_URL}/api/v1/message/${msgId}`, {
        status: newStatus,
      });
      if (res.data.success) {
        toast.success(`Inquiry marked as ${newStatus}`);
        setMessages((prev) =>
          prev.map((m) => (m._id === msgId ? { ...m, status: newStatus } : m))
        );
        fetchDashboardData();
      }
    } catch (err) {
      toast.error("Could not update inquiry status.");
    }
  };

  // Save Admin Notes
  const handleSaveNotes = async () => {
    if (!selectedMessage) return;
    try {
      const res = await axios.put(`${API_URL}/api/v1/message/${selectedMessage._id}`, {
        adminNotes: adminNotesInput,
      });
      if (res.data.success) {
        toast.success("Internal notes saved.");
        setSelectedMessage({ ...selectedMessage, adminNotes: adminNotesInput });
        setMessages((prev) =>
          prev.map((m) =>
            m._id === selectedMessage._id ? { ...m, adminNotes: adminNotesInput } : m
          )
        );
      }
    } catch (err) {
      toast.error("Failed to save notes.");
    }
  };

  // Delete Message
  const handleDeleteMessage = async (msgId) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) return;

    try {
      const res = await axios.delete(`${API_URL}/api/v1/message/${msgId}`);
      if (res.data.success) {
        toast.success("Inquiry deleted.");
        setMessages((prev) => prev.filter((m) => m._id !== msgId));
        if (selectedMessage?._id === msgId) {
          setSelectedMessage(null);
        }
        fetchDashboardData();
      }
    } catch (err) {
      toast.error("Failed to delete inquiry.");
    }
  };

  // Create New Event
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) {
      toast.error("Please provide an event title.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/v1/events`, newEvent);
      if (res.data.success) {
        toast.success("New event service added!");
        setEvents([res.data.event, ...events]);
        setNewEvent({
          title: "",
          category: "Weddings",
          date: "",
          guests: "150 Guests",
          priceRange: "$10,000 - $20,000",
          description: "",
        });
      }
    } catch (err) {
      toast.error("Could not create event service.");
    }
  };

  // Delete Event
  const handleDeleteEvent = async (evtId) => {
    if (!window.confirm("Delete this event from the catalog?")) return;
    try {
      await axios.delete(`${API_URL}/api/v1/events/${evtId}`);
      toast.success("Event deleted from catalog.");
      setEvents((prev) => prev.filter((e) => e._id !== evtId));
    } catch (err) {
      toast.error("Failed to delete event.");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!messages.length) {
      toast.error("No inquiries available to export.");
      return;
    }

    const headers = ["ID", "Name", "Email", "Subject", "EventType", "Date", "Guests", "Budget", "Priority", "Status", "Notes", "Created"];
    const rows = messages.map((m) => [
      `"${m._id}"`,
      `"${m.name || ""}"`,
      `"${m.email || ""}"`,
      `"${(m.subject || "").replace(/"/g, '""')}"`,
      `"${m.eventType || ""}"`,
      `"${m.eventDate || ""}"`,
      `"${m.guests || ""}"`,
      `"${m.budget || ""}"`,
      `"${m.priority || ""}"`,
      `"${m.status || ""}"`,
      `"${(m.adminNotes || "").replace(/"/g, '""')}"`,
      `"${m.createdAt || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `event_planner_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inquiries exported to CSV!");
  };

  // Filtered by local search query
  const displayMessages = messages.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.email && m.email.toLowerCase().includes(q)) ||
      (m.subject && m.subject.toLowerCase().includes(q)) ||
      (m.eventType && m.eventType.toLowerCase().includes(q))
    );
  });

  // ================= RENDER LOGIN GATE IF NOT AUTHENTICATED =================
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-logo-circle">
            <FaShieldAlt />
          </div>
          <h2>Admin Management Portal</h2>
          <p>Please enter your administrative access code to manage client inquiries, event bookings, and analytics.</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="input-group">
              <label>Admin Security PIN</label>
              <input
                type="password"
                placeholder="Enter PIN (Default: admin123)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                required
              />
            </div>

            <button type="submit" className="admin-login-btn">
              Authenticate & Enter
            </button>
          </form>

          <div className="admin-login-footer">
            <Link to="/" className="back-link">
              ← Return to EventPlanner Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= AUTHENTICATED DASHBOARD =================
  return (
    <div className="admin-dashboard-layout">
      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <div className="admin-badge-icon">
            <FaShieldAlt />
          </div>
          <div>
            <h2>EventPlanner Control Hub</h2>
            <span className="live-status-pill">
              <span className="pulse-dot"></span> System Live & Operational
            </span>
          </div>
        </div>

        <div className="admin-header-right">
          <button
            className="admin-header-btn refresh"
            onClick={fetchDashboardData}
            title="Refresh Data"
          >
            <FaSync className={loading ? "spin" : ""} />
            <span>Refresh</span>
          </button>

          <Link to="/" className="admin-header-btn site-link">
            <FaHome />
            <span>Live Site</span>
          </Link>

          <button className="admin-header-btn logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="admin-body-container">
        {/* KPI Metric Cards */}
        {stats && (
          <div className="admin-kpi-grid">
            <div className="kpi-card">
              <div className="kpi-info">
                <span className="kpi-label">Total Inquiries</span>
                <h3 className="kpi-val">{stats.totalInquiries}</h3>
              </div>
              <div className="kpi-icon-wrap blue">
                <FaEnvelope />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-info">
                <span className="kpi-label">Action Required</span>
                <h3 className="kpi-val highlight-new">{stats.newInquiries}</h3>
              </div>
              <div className="kpi-icon-wrap orange">
                <FaClock />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-info">
                <span className="kpi-label">Confirmed Events</span>
                <h3 className="kpi-val highlight-confirmed">{stats.confirmedInquiries}</h3>
              </div>
              <div className="kpi-icon-wrap green">
                <FaCheckCircle />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-info">
                <span className="kpi-label">Estimated Pipeline</span>
                <h3 className="kpi-val">{stats.estimatedPipeline}</h3>
              </div>
              <div className="kpi-icon-wrap gold">
                <FaCoins />
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="admin-tabs-row">
          <div className="admin-tab-buttons">
            <button
              className={`tab-btn ${activeTab === "inquiries" ? "active" : ""}`}
              onClick={() => setActiveTab("inquiries")}
            >
              <FaEnvelope /> Inquiries & Bookings ({messages.length})
            </button>
            <button
              className={`tab-btn ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              <FaCalendarPlus /> Services & Catalog ({events.length})
            </button>
          </div>

          {activeTab === "inquiries" && (
            <div className="admin-actions-bar">
              <button className="export-csv-btn" onClick={handleExportCSV}>
                <FaFileDownload /> Export CSV
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="admin-tab-content">
            {/* Filter & Search Bar */}
            <div className="admin-filter-bar">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by client name, email, or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-dropdowns">
                <div className="filter-group">
                  <label><FaFilter /> Status:</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Urgency:</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">Urgent</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Client</th>
                    <th>Event / Subject</th>
                    <th>Details</th>
                    <th>Budget</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayMessages.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="empty-table-msg">
                        No inquiries found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    displayMessages.map((msg) => (
                      <tr key={msg._id} className={`table-row ${msg.status}`}>
                        <td>
                          <select
                            className={`status-select ${msg.status}`}
                            value={msg.status}
                            onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                          >
                            <option value="new">New</option>
                            <option value="in-progress">In Progress</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td>
                          <div className="client-cell">
                            <strong>{msg.name}</strong>
                            <span className="client-email">{msg.email}</span>
                          </div>
                        </td>
                        <td>
                          <div className="event-title-cell">
                            <strong>{msg.subject || msg.eventType}</strong>
                            <span className="event-type-badge">{msg.eventType}</span>
                          </div>
                        </td>
                        <td>
                          <div className="event-subdetails">
                            <span>📅 {msg.eventDate || "Flexible"}</span>
                            <span>👥 {msg.guests || 50} Guests</span>
                          </div>
                        </td>
                        <td>
                          <span className="budget-tag">{msg.budget || "Flexible"}</span>
                        </td>
                        <td>
                          <span className={`priority-tag ${msg.priority}`}>
                            {msg.priority === "urgent" ? "🔥 Urgent" : msg.priority}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons-cell">
                            <button
                              className="view-btn"
                              title="Inspect Details"
                              onClick={() => {
                                setSelectedMessage(msg);
                                setAdminNotesInput(msg.adminNotes || "");
                              }}
                            >
                              Inspect
                            </button>
                            <a
                              href={`mailto:${msg.email}?subject=Regarding Your Event Inquiry: ${encodeURIComponent(
                                msg.subject || "Event Planning"
                              )}`}
                              className="email-btn"
                              title="Email Client"
                            >
                              <FaEnvelope />
                            </a>
                            <button
                              className="delete-btn"
                              title="Delete Inquiry"
                              onClick={() => handleDeleteMessage(msg._id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: EVENTS CATALOG */}
        {activeTab === "events" && (
          <div className="admin-tab-content">
            <div className="events-manager-layout">
              {/* Add New Event Form */}
              <div className="add-event-card">
                <h3>Add New Service or Event to Catalog</h3>
                <form onSubmit={handleCreateEvent}>
                  <div className="input-group">
                    <label>Event / Service Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. VIP Yacht Gala Experience"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="input-group">
                      <label>Category</label>
                      <select
                        value={newEvent.category}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, category: e.target.value })
                        }
                      >
                        <option value="Weddings">Weddings</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Birthdays">Birthdays</option>
                        <option value="Anniversaries">Anniversaries</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Entertainment">Entertainment</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Guest Capacity</label>
                      <input
                        type="text"
                        placeholder="e.g. 100 - 300 Guests"
                        value={newEvent.guests}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, guests: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Estimated Price Range</label>
                    <input
                      type="text"
                      placeholder="e.g. $8,000 - $18,000"
                      value={newEvent.priceRange}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, priceRange: e.target.value })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Package Description</label>
                    <textarea
                      rows={3}
                      placeholder="Describe what is provided in this experience..."
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, description: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="create-event-btn">
                    <FaCalendarPlus /> Publish to Catalog
                  </button>
                </form>
              </div>

              {/* Active Events List */}
              <div className="active-events-list">
                <h3>Current Published Packages ({events.length})</h3>
                <div className="events-grid-inner">
                  {events.map((evt) => (
                    <div key={evt._id} className="admin-event-item">
                      <div className="event-item-header">
                        <h4>{evt.title}</h4>
                        <span className="category-pill">{evt.category}</span>
                      </div>
                      <p className="event-item-desc">{evt.description}</p>
                      <div className="event-item-meta">
                        <span>👥 {evt.guests}</span>
                        <span>🏷️ {evt.priceRange}</span>
                      </div>
                      <button
                        className="delete-event-btn"
                        onClick={() => handleDeleteEvent(evt._id)}
                      >
                        <FaTrash /> Remove Package
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* INSPECT MODAL */}
      {selectedMessage && (
        <div className="modal-backdrop" onClick={() => setSelectedMessage(null)}>
          <div className="inspect-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Inquiry Full Details</h3>
              <button
                className="close-modal-btn"
                onClick={() => setSelectedMessage(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-field-row">
                <div>
                  <label>Client Name</label>
                  <p className="val-text">{selectedMessage.name}</p>
                </div>
                <div>
                  <label>Client Email</label>
                  <p className="val-text">
                    <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
                  </p>
                </div>
              </div>

              <div className="modal-field-row">
                <div>
                  <label>Event Type</label>
                  <p className="val-text">{selectedMessage.eventType || "General"}</p>
                </div>
                <div>
                  <label>Target Date</label>
                  <p className="val-text">{selectedMessage.eventDate || "Flexible"}</p>
                </div>
              </div>

              <div className="modal-field-row">
                <div>
                  <label>Guests</label>
                  <p className="val-text">{selectedMessage.guests} Attendees</p>
                </div>
                <div>
                  <label>Budget Range</label>
                  <p className="val-text">{selectedMessage.budget}</p>
                </div>
              </div>

              <div className="modal-message-box">
                <label>Client Inquiry Message</label>
                <div className="message-content-box">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div className="modal-notes-box">
                <label>Internal Staff Notes (Saved to Database)</label>
                <textarea
                  rows={3}
                  placeholder="Add notes about calls, quotes sent, vendor contracts..."
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                />
                <button className="save-notes-btn" onClick={handleSaveNotes}>
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
