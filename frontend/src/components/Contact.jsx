import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        {
          name,
          email,
          subject,
          message,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message || "Message sent successfully!");
      
      // Clear form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        {/* Contact Info Cards */}
        <div className="contact-info">
          <div className="info-card">
            <div className="icon">📍</div>
            <h4>Location</h4>
            <p>Bengaluru, Karnataka, India</p>
          </div>
          <div className="info-card">
            <div className="icon">📞</div>
            <h4>Phone</h4>
            <p>+91 9XXXXXXXXX</p>
          </div>
          <div className="info-card">
            <div className="icon">✉️</div>
            <h4>Email</h4>
            <p>support@eventplanner.com</p>
          </div>
        </div>

        {/* Map & Form Section */}
        <div className="contact-content">
          {/* Google Map */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.77490207236!2d77.3200317!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
              style={{ border: 0, width: "100%", height: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bengaluru Location"
            />
          </div>

          {/* Contact Form */}
          <div className="form-container">
            <form onSubmit={handleSendMessage}>
              <h2>GET IN TOUCH</h2>
              <p className="form-subtitle">
                Have questions about events or partnerships? We'd love to hear from you.
              </p>

              <div className="form-row">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={loading}
              />

              <textarea
                rows={8}
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={loading}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;