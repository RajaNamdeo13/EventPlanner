import React, { useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "Services", to: "services" },
    { name: "About", to: "about" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoIcon}>📅</span>
          <h2 style={styles.logoText}>Event Planner</h2>
        </div>

        {/* Desktop Navigation */}
        <ul style={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.name} style={styles.navItem}>
              <Link
                to={link.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                style={styles.navLink}
                activeClass="active"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          to="contact"
          spy={true}
          smooth={true}
          duration={500}
          style={styles.ctaButton}
        >
          Get Started
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          style={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "rgba(15, 23, 42, 0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 122, 0, 0.2)",
    boxShadow: "0 4px 20px rgba(255, 122, 0, 0.1)",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  logoIcon: {
    fontSize: "1.8rem",
  },
  logoText: {
    background: "linear-gradient(135deg, #ff7a00, #ff9933)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "1.5rem",
    fontWeight: "700",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "2rem",
    margin: 0,
    padding: 0,
  },
  navItem: {
    display: "inline-block",
  },
  navLink: {
    color: "#cbd5e1",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "color 0.3s ease",
    padding: "0.5rem 0",
    position: "relative",
  },
  ctaButton: {
    padding: "0.7rem 1.8rem",
    background: "linear-gradient(135deg, #ff7a00, #ff9933)",
    color: "white",
    borderRadius: "50px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 122, 0, 0.2)",
    textDecoration: "none",
    display: "inline-block",
  },
  menuToggle: {
    display: "none",
    background: "transparent",
    border: "none",
    color: "#ff7a00",
    fontSize: "1.8rem",
    cursor: "pointer",
    padding: "0.5rem",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    background: "#1e293b",
    padding: "1rem",
    borderTop: "1px solid rgba(255, 122, 0, 0.2)",
  },
  mobileLink: {
    color: "#cbd5e1",
    padding: "1rem",
    textDecoration: "none",
    borderBottom: "1px solid #334155",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};

// Add media query for responsive design
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @media (max-width: 768px) {
    nav ul {
      display: none !important;
    }
    nav button:last-of-type {
      display: none !important;
    }
    nav button:first-of-type {
      display: block !important;
    }
  }
  
  nav a:hover {
    color: #ff7a00 !important;
  }
  
  nav a.active {
    color: #ff7a00 !important;
    border-bottom: 2px solid #ff7a00;
  }
  
  nav button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 122, 0, 0.3);
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;