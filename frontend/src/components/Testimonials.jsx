import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Claire & Thomas Sterling",
      event: "Fairytale Wedding at Stone Ridge",
      date: "September 2026",
      avatar: "👰",
      rating: 5,
      quote:
        "EventPlanner made the happiest day of our lives completely stress-free! From the intricate floral designs to the seamless timeline, our guests are still talking about how magical everything was.",
    },
    {
      id: 2,
      name: "David K. Henderson",
      event: "Director of Events, Horizon Global",
      date: "August 2026",
      avatar: "👔",
      rating: 5,
      quote:
        "We entrusted EventPlanner with our 600-person international conference. The AV production, catering pacing, and guest registration were flawless. A top-tier team with remarkable attention to detail.",
    },
    {
      id: 3,
      name: "Aaliyah & Marcus Patel",
      event: "Silver Jubilee Celebration",
      date: "July 2026",
      avatar: "✨",
      rating: 5,
      quote:
        "Every single request was met with warmth and professionalism. The cost calculator gave us full transparency on budget, and the day-of coordination was second to none!",
    },
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-container">
        <div className="section-header">
          <span className="section-kicker">CLIENT STORIES</span>
          <h2 className="section-title">
            Words From Our <span className="gradient-text">Happy Hosts</span>
          </h2>
          <p className="section-subtitle">
            See how we turn high expectations into unforgettable moments and lifelong memories.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((r) => (
            <div key={r.id} className="testimonial-card">
              <FaQuoteLeft className="quote-badge" />

              <div className="stars-row">
                {[...Array(r.rating)].map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>

              <p className="testimonial-text">"{r.quote}"</p>

              <div className="client-footer">
                <div className="client-avatar">{r.avatar}</div>
                <div className="client-info">
                  <h4 className="client-name">{r.name}</h4>
                  <p className="client-event">{r.event}</p>
                  <span className="client-date">{r.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
