import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaPaperPlane,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }

    setSubscribing(true);
    try {
      await axios.post(`${API_URL}/api/v1/message/newsletter`, { email });
      toast.success("Thank you for subscribing to our VIP event dispatch!");
      setEmail("");
    } catch (err) {
      toast.error("Could not subscribe at this moment.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="footer">
      <div className="section-container">
        {/* Main Footer Row */}
        <div className="footer-top-grid">
          {/* Col 1: Brand info */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="logo-badge">
                <FaCalendarAlt className="logo-icon" />
              </div>
              <span className="logo-title">
                Event<span className="gradient-text">Planner</span>
              </span>
            </div>
            <p className="footer-brand-desc">
              Premier full-stack event planning, creative production, and day-of coordination platform. Turning your life's greatest milestones into seamless memories.
            </p>
            <div className="social-links-row">
              <a href="#instagram" className="social-icon-btn" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#twitter" className="social-icon-btn" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#linkedin" className="social-icon-btn" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#facebook" className="social-icon-btn" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#youtube" className="social-icon-btn" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <ScrollLink to="hero" smooth={true} duration={500} offset={-80}>
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="services" smooth={true} duration={500} offset={-80}>
                  Services & Packages
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="portfolio" smooth={true} duration={500} offset={-80}>
                  Event Portfolio
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="calculator" smooth={true} duration={500} offset={-80}>
                  Cost Estimator
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="about" smooth={true} duration={500} offset={-80}>
                  Our Philosophy
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="contact" smooth={true} duration={500} offset={-80}>
                  Book Event
                </ScrollLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Event Specializations */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Specializations</h4>
            <ul className="footer-links-list">
              <li>Luxury Weddings</li>
              <li>Corporate Galas</li>
              <li>Milestone Birthdays</li>
              <li>Private Anniversaries</li>
              <li>Wilderness Glamping</li>
              <li>Esports Tournaments</li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-title">VIP Event Dispatch</h4>
            <p>
              Subscribe to get curated event inspirations, seasonal package discounts, and venue spotlights.
            </p>
            <form className="footer-news-form" onSubmit={handleNewsletter}>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribing}
                  required
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="news-submit-btn"
                  aria-label="Subscribe"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
            <div className="admin-portal-shortcut">
              <RouterLink to="/admin" className="footer-admin-link">
                🔒 Admin & Staff Management Portal
              </RouterLink>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} EventPlanner Platform. All rights reserved.</p>
          <p className="credit-tag">
            Engineered with <FaHeart className="heart-icon" /> for unforgettable celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
