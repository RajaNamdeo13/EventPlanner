import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaArrowRight } from "react-icons/fa";
import { Link } from "react-scroll";

const Portfolio = ({ onSelectEvent }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const portfolioItems = [
    {
      id: "p1",
      title: "Fairytale Sunset Vineyard Wedding",
      category: "Weddings",
      date: "August 2026",
      location: "Napa Valley, CA",
      guests: "320 Guests",
      image: "/images/wedding.svg",
      summary: "Romantic outdoor celebration with floral canopy, multi-course wine pairing, and midnight drone light show.",
    },
    {
      id: "p2",
      title: "Fintech Global Innovation Summit",
      category: "Corporate",
      date: "July 2026",
      location: "Metropolitan Convention Center",
      guests: "750 Guests",
      image: "/images/party.svg",
      summary: "Two-day conference featuring 4 breakout stages, VIP executive banquet, and interactive demo lounges.",
    },
    {
      id: "p3",
      title: "Silver Jubilee Crystal Anniversary",
      category: "Celebrations",
      date: "June 2026",
      location: "The Grand Waterfront Manor",
      guests: "140 Guests",
      image: "/images/anniversary.svg",
      summary: "25th wedding anniversary with acoustic jazz orchestra, 6-tier crystal chandelier cake, and fireworks.",
    },
    {
      id: "p4",
      title: "Cyberpunk 21st Birthday Festival",
      category: "Celebrations",
      date: "May 2026",
      location: "Industrial Loft District",
      guests: "180 Guests",
      image: "/images/birthday.svg",
      summary: "Neon lighting installations, robotic mocktail servers, guest DJs, and retro arcade tournaments.",
    },
    {
      id: "p5",
      title: "Alpine Starlight Glamping Retreat",
      category: "Outdoor",
      date: "April 2026",
      location: "Highland Forest Sanctuary",
      guests: "60 Guests",
      image: "/images/camping.svg",
      summary: "Three-day executive wilderness escape with heated luxury yurts, bonfire culinary feast, and trail hiking.",
    },
    {
      id: "p6",
      title: "Collegiate Esports Championship Night",
      category: "Entertainment",
      date: "March 2026",
      location: "Tech Arena Hall",
      guests: "400 Guests",
      image: "/images/gamenight.svg",
      summary: "High-octane tournament broadcast with stadium LED walls, 64-player bracket, and custom stage pyrotechnics.",
    },
  ];

  const categories = ["all", "Weddings", "Corporate", "Celebrations", "Outdoor", "Entertainment"];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter(
          (item) => item.category.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-kicker">OUR PORTFOLIO</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Celebrations</span>
          </h2>
          <p className="section-subtitle">
            A glimpse into the extraordinary moments, unique themes, and flawless productions we have had the honor to create.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="portfolio-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="portfolio-card">
              <div className="card-thumb-wrap">
                <img src={item.image} alt={item.title} className="card-thumb-img" />
                <span className="portfolio-category-badge">{item.category}</span>
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.summary}</p>

                <div className="card-meta">
                  <span className="meta-item">
                    <FaCalendarAlt className="meta-icon" /> {item.date}
                  </span>
                  <span className="meta-item">
                    <FaMapMarkerAlt className="meta-icon" /> {item.location}
                  </span>
                  <span className="meta-item">
                    <FaUsers className="meta-icon" /> {item.guests}
                  </span>
                </div>

                <div className="card-footer">
                  <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="card-inquire-link"
                    onClick={() => {
                      if (onSelectEvent) {
                        onSelectEvent(item.title);
                      }
                    }}
                  >
                    <span>Plan Similar Event</span>
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
