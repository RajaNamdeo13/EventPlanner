import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCalendarAlt,
  FaUsers,
  FaCoins,
} from "react-icons/fa";

const Contact = ({ prefillData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("100");
  const [budget, setBudget] = useState("Flexible");
  const [priority, setPriority] = useState("normal");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Pre-fill data if passed from Services or Calculator
  useEffect(() => {
    if (prefillData) {
      if (prefillData.eventType) setEventType(prefillData.eventType);
      if (prefillData.guests) setGuests(String(prefillData.guests));
      if (prefillData.budget) setBudget(prefillData.budget);
      if (prefillData.subject) setSubject(prefillData.subject);
      if (prefillData.notes) setMessage(prefillData.notes);
    }
  }, [prefillData]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending your inquiry...");

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/message/send`,
        {
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || `${eventType} Inquiry`,
          eventType,
          eventDate,
          guests: Number(guests) || 50,
          budget,
          priority,
          message: message.trim(),
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      toast.success(
        response.data.message || "Your inquiry has been submitted successfully!",
        { id: toastId }
      );

      // Clear form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setEventDate("");
      setBudget("Flexible");
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      const errMsg =
        error.response?.data?.message ||
        "Could not connect to server. Please ensure the backend is running.";
      toast.error(errMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-kicker">GET IN TOUCH</span>
          <h2 className="section-title">
            Let's Plan Your <span className="gradient-text">Celebration</span>
          </h2>
          <p className="section-subtitle">
            Tell us about your dream event. Our executive planning team will review your details and respond with a personalized proposal within 24 hours.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="contact-cards-grid">
          <div className="contact-info-card">
            <div className="card-icon-circle">
              <FaMapMarkerAlt />
            </div>
            <h4>Headquarters</h4>
            <p>100 Celebration Plaza, Suite 400</p>
            <span className="sub-detail">Bengaluru & Global Destinations</span>
          </div>

          <div className="contact-info-card">
            <div className="card-icon-circle">
              <FaPhoneAlt />
            </div>
            <h4>Call Concierge</h4>
            <p>+1 (800) 555-EVENT</p>
            <span className="sub-detail">Mon - Sat: 9:00 AM - 8:00 PM</span>
          </div>

          <div className="contact-info-card">
            <div className="card-icon-circle">
              <FaEnvelope />
            </div>
            <h4>Email Desk</h4>
            <p>concierge@eventplanner.com</p>
            <span className="sub-detail">24/7 Priority Support</span>
          </div>

          <div className="contact-info-card">
            <div className="card-icon-circle">
              <FaClock />
            </div>
            <h4>Response Guarantee</h4>
            <p>Within 24 Hours</p>
            <span className="sub-detail">Free Initial Consultation</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="contact-form-wrapper">
          <form className="inquiry-form" onSubmit={handleSendMessage}>
            <div className="form-head">
              <h3>Event Inquiry & Booking Request</h3>
              <p>Fill out the parameters below to initiate your planning journey.</p>
            </div>

            {/* Row 1: Name & Email */}
            <div className="form-grid-2">
              <div className="input-group">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="input-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. eleanor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Row 2: Event Type & Target Date */}
            <div className="form-grid-2">
              <div className="input-group">
                <label>Event Category</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  disabled={loading}
                >
                  <option value="Wedding">Wedding Planning</option>
                  <option value="Corporate Gala">Corporate Gala & Summit</option>
                  <option value="Milestone Birthday">Milestone Birthday</option>
                  <option value="Anniversary">Anniversary Celebration</option>
                  <option value="Outdoor Retreat">Glamping & Outdoor Retreat</option>
                  <option value="Game Night">Game Night / Tournament</option>
                  <option value="Custom Event">Other Bespoke Event</option>
                </select>
              </div>

              <div className="input-group">
                <label>Target Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Row 3: Guests, Budget, Priority */}
            <div className="form-grid-3">
              <div className="input-group">
                <label>Approx. Guests</label>
                <input
                  type="number"
                  min="5"
                  max="5000"
                  placeholder="e.g. 150"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="input-group">
                <label>Estimated Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  disabled={loading}
                >
                  <option value="Flexible">Flexible / Discuss</option>
                  <option value="Under $5,000">Under $5,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000 - $35,000">$15,000 - $35,000</option>
                  <option value="$35,000 - $75,000">$35,000 - $75,000</option>
                  <option value="$75,000+">$75,000+ (Luxury Concierge)</option>
                </select>
              </div>

              <div className="input-group">
                <label>Urgency Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={loading}
                >
                  <option value="normal">Normal Priority</option>
                  <option value="urgent">Urgent / Approaching Date</option>
                  <option value="low">Low (Planning for Next Year)</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div className="input-group">
              <label>Subject / Event Title</label>
              <input
                type="text"
                placeholder="e.g. 10th Anniversary Sunset Gala on the Lake"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Message Area */}
            <div className="input-group">
              <label>Event Vision & Special Requirements *</label>
              <textarea
                rows={5}
                placeholder="Tell us about the vibe, aesthetic preferences, dietary needs, entertainment wishlist, or any questions..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-inquiry-btn"
              disabled={loading}
            >
              {loading ? (
                <span>Submitting Your Details...</span>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Submit Inquiry For Review</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;