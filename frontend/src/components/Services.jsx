import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaCheckCircle, FaArrowRight, FaUsers, FaTag } from "react-icons/fa";

const Services = ({ onSelectService }) => {
  const services = [
    {
      id: 1,
      title: "Wedding Planning & Design",
      category: "Weddings",
      url: "/images/wedding.svg",
      tagline: "Your dream fairytale brought to life with elegance & precision.",
      capacity: "100 - 800 Guests",
      pricing: "From $12,000",
      features: [
        "Full floral styling & venue decor",
        "Gourmet multi-course banquet catering",
        "Photographer & 4K drone videography",
        "Live band, strings & DJ setup",
        "Dedicated day-of bridal concierge",
      ],
    },
    {
      id: 2,
      title: "Corporate Summits & Galas",
      category: "Corporate",
      url: "/images/party.svg",
      tagline: "High-impact conferences, product launches, and gala dinners.",
      capacity: "150 - 1,200 Guests",
      pricing: "From $15,000",
      features: [
        "High-definition AV & keynote staging",
        "Executive VIP seating & guest badge kiosks",
        "Curated brand identity & stage backdrops",
        "Networking cocktail lounges",
        "Simultaneous live broadcast & streaming",
      ],
    },
    {
      id: 3,
      title: "Milestone Birthday Celebrations",
      category: "Birthdays",
      url: "/images/birthday.svg",
      tagline: "Vibrant, personalized themed birthday parties for all ages.",
      capacity: "30 - 250 Guests",
      pricing: "From $3,500",
      features: [
        "Custom theme design & balloon architecture",
        "Specialty multi-tier designer cakes",
        "Interactive 360-degree photo booths",
        "DJ, MC & immersive party lighting",
        "Signature mocktail & cocktail bar",
      ],
    },
    {
      id: 4,
      title: "Anniversaries & Private Dinners",
      category: "Anniversaries",
      url: "/images/anniversary.svg",
      tagline: "Intimate and luxurious celebrations honoring love and milestones.",
      capacity: "20 - 150 Guests",
      pricing: "From $4,500",
      features: [
        "Romantic candlelight & floral centerpieces",
        "Private Michelin-trained chef experience",
        "Acoustic serenade or jazz quartet",
        "Personalized memory timeline gallery",
        "Luxury limousine & valet transport",
      ],
    },
    {
      id: 5,
      title: "Glamping & Outdoor Retreats",
      category: "Outdoor",
      url: "/images/camping.svg",
      tagline: "Luxury wilderness experiences blending nature with comfort.",
      capacity: "25 - 100 Guests",
      pricing: "From $5,500",
      features: [
        "Weatherproof luxury safari bell tents",
        "Gourmet artisan bonfire BBQ & smore bars",
        "Guided stargazing & telescope sessions",
        "Team building & acoustic bonfire jam",
        "Full eco-friendly hospitality & lighting",
      ],
    },
    {
      id: 6,
      title: "Game Nights & Esports Tournaments",
      category: "Entertainment",
      url: "/images/gamenight.svg",
      tagline: "Electrifying gaming events, board games & arcade experiences.",
      capacity: "30 - 150 Guests",
      pricing: "From $2,800",
      features: [
        "PS5, Xbox & high-refresh PC tournament pods",
        "Giant LED tournament bracket boards",
        "Retro arcade cabinets & board game masters",
        "Custom winners' trophies & gamer snacks",
        "Live shoutcasting & spectator zones",
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const activeService = services[activeTab];

  return (
    <section className="services-section" id="services">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">WHAT WE OFFER</span>
          <h2 className="section-title">
            Tailored Event <span className="gradient-text">Experiences</span>
          </h2>
          <p className="section-subtitle">
            From intimate gatherings to massive scale corporate events, explore our comprehensive event planning packages.
          </p>
        </div>

        {/* Category Tab Pills */}
        <div className="service-tabs">
          {services.map((srv, idx) => (
            <button
              key={srv.id}
              className={`service-tab-btn ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
            >
              {srv.category}
            </button>
          ))}
        </div>

        {/* Active Featured Service Card */}
        <div className="featured-service-display">
          <div className="service-image-col">
            <img
              src={activeService.url}
              alt={activeService.title}
              className="featured-service-img"
            />
            <div className="service-badge-overlay">
              <span className="badge-pill">
                <FaUsers /> {activeService.capacity}
              </span>
              <span className="badge-pill highlight">
                <FaTag /> {activeService.pricing}
              </span>
            </div>
          </div>

          <div className="service-details-col">
            <h3 className="service-detail-title">{activeService.title}</h3>
            <p className="service-detail-tagline">{activeService.tagline}</p>

            <div className="service-features-list">
              <h4>What is Included:</h4>
              <ul>
                {activeService.features.map((feature, i) => (
                  <li key={i}>
                    <FaCheckCircle className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-cta-row">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="service-book-btn"
                onClick={() => {
                  if (onSelectService) {
                    onSelectService(activeService.title);
                  }
                }}
              >
                <span>Inquire For This Package</span>
                <FaArrowRight />
              </Link>

              <Link
                to="calculator"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="service-calc-btn"
              >
                <span>Estimate Cost</span>
              </Link>
            </div>
          </div>
        </div>

        {/* All Services Grid Summary */}
        <div className="services-mini-grid">
          {services.map((s, idx) => (
            <div
              key={s.id}
              className={`mini-service-card ${activeTab === idx ? "selected" : ""}`}
              onClick={() => setActiveTab(idx)}
            >
              <div className="mini-card-header">
                <h4>{s.title}</h4>
                <span className="mini-tag">{s.category}</span>
              </div>
              <p className="mini-card-pricing">{s.pricing}</p>
              <p className="mini-card-cap">{s.capacity}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
