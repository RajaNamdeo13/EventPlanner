import React from "react";
import { FaHeart, FaHandshake, FaPalette, FaClock } from "react-icons/fa";

const About = () => {
  const pillars = [
    {
      icon: <FaHeart />,
      title: "Zero-Stress Execution",
      desc: "Our seasoned directors orchestrate timelines down to the minute, allowing you to be a true guest at your own event.",
    },
    {
      icon: <FaHandshake />,
      title: "Curated Vendor Network",
      desc: "We work only with vetted, award-winning florists, caterers, lighting masters, and entertainment partners.",
    },
    {
      icon: <FaPalette />,
      title: "Bespoke Design & Theme",
      desc: "No cookie-cutter templates. Every detail, from table settings to stage backdrops, reflects your personality and vision.",
    },
    {
      icon: <FaClock />,
      title: "Full Budget Transparency",
      desc: "Clear upfront quotes, zero surprise fees, and live digital tracking of all vendor deposits and invoices.",
    },
  ];

  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="about-hero-grid">
          <div className="about-text-content">
            <span className="section-kicker">WHO WE ARE</span>
            <h2 className="section-title">
              We Don't Just Plan Events — We Create <span className="gradient-text">Masterpieces</span>
            </h2>
            <p className="about-lead">
              Founded over a decade ago, <strong>EventPlanner</strong> has transformed how extraordinary gatherings come to life. We bridge the gap between creative imagination and meticulous logistical precision.
            </p>
            <p className="about-body">
              Whether you are gathering 40 intimate guests for a sunset anniversary dinner or hosting 1,000 international delegates for a high-profile technology summit, our multidisciplinary team of designers, technical producers, and hospitality specialists handles every aspect with white-glove care.
            </p>

            <div className="about-stats-strip">
              <div className="mini-stat">
                <h3>12+</h3>
                <p>Years of Legacy</p>
              </div>
              <div className="mini-stat">
                <h3>550+</h3>
                <p>Masterpieces Delivered</p>
              </div>
              <div className="mini-stat">
                <h3>100%</h3>
                <p>Tailored Experiences</p>
              </div>
            </div>
          </div>

          <div className="about-pillars-grid">
            {pillars.map((p, i) => (
              <div key={i} className="pillar-card">
                <div className="pillar-icon">{p.icon}</div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
