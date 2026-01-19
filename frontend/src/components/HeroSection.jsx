import React from "react";
import { Link } from "react-scroll";

const HeroSection = () => {
  return (
    <section className="hero">
      <img src="/event.jpg" alt="event management" />

      <div className="item">
        <h3>Plan • Manage • Celebrate</h3>

        <div>
          <h1>All Your Events, One Smart Platform</h1>
          <p>
            EventHive helps you plan, organize, and manage events effortlessly —
            from small gatherings to large celebrations.
          </p>

          <Link to="contact" spy={true} smooth={true} duration={500}>
            GET STARTED
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
