import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="banner">
        <div className="title">
          <h1>EventPlanner</h1>
          <p>Smart Event Management Platform</p>
        </div>

        <div className="tag">
          <label>Newsletter</label>
          <div>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
          <p>
            Subscribe to get updates on upcoming events, features, and special
            announcements.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
