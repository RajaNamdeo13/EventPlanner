import React from "react";
import { Link } from "react-scroll";
import { FaMagic, FaCalendarCheck, FaCalculator, FaAward, FaUsers, FaStar } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="hero-section" id="hero">
      {/* Ambient background glow & image */}
      <div className="hero-backdrop">
        <img
          src="/event-hero.svg"
          alt="Event Planner Stage Atmosphere"
          className="hero-bg-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-container">
        {/* Animated Badge */}
        <div className="hero-badge">
          <FaMagic className="badge-icon" />
          <span>Premier Luxury Event Management & Coordination</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline">
          Crafting <span className="gradient-text">Unforgettable</span> Memories & Seamless Celebrations
        </h1>

        <p className="hero-subtext">
          From breathtaking fairytale weddings and high-profile corporate galas to milestone birthdays and private retreats — we handle every single detail so you can enjoy every moment.
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <Link
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            className="hero-btn primary-hero-btn"
          >
            <FaCalendarCheck />
            <span>Book Your Event</span>
          </Link>

          <Link
            to="calculator"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            className="hero-btn secondary-hero-btn"
          >
            <FaCalculator />
            <span>Calculate Budget</span>
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap orange">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3 className="stat-number">550+</h3>
              <p className="stat-label">Events Planned</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap cyan">
              <FaStar />
            </div>
            <div className="stat-info">
              <h3 className="stat-number">99.4%</h3>
              <p className="stat-label">Client Approval</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap gold">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h3 className="stat-number">65,000+</h3>
              <p className="stat-label">Guests Hosted</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap rose">
              <FaAward />
            </div>
            <div className="stat-info">
              <h3 className="stat-number">15+</h3>
              <p className="stat-label">Industry Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
