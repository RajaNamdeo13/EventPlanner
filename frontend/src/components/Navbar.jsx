import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import { FaBars, FaTimes, FaCalendarAlt, FaCalculator, FaShieldAlt } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", target: "hero" },
    { name: "Services", target: "services" },
    { name: "Portfolio", target: "portfolio" },
    { name: "Cost Estimator", target: "calculator" },
    { name: "About", target: "about" },
    { name: "Reviews", target: "testimonials" },
    { name: "FAQ", target: "faq" },
    { name: "Contact", target: "contact" },
  ];

  const handleNavClick = (target) => {
    setMenuOpen(false);
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(target, {
          smooth: true,
          duration: 500,
          offset: -80,
        });
      }, 150);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <RouterLink to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-badge">
            <FaCalendarAlt className="logo-icon" />
          </div>
          <span className="logo-title">
            Event<span className="gradient-text">Planner</span>
          </span>
        </RouterLink>

        {/* Desktop Navigation Links */}
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              {isHomePage ? (
                <ScrollLink
                  to={item.target}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  activeClass="active-nav"
                  className="nav-link"
                >
                  {item.name}
                </ScrollLink>
              ) : (
                <button
                  className="nav-link nav-btn-link"
                  onClick={() => handleNavClick(item.target)}
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="nav-actions">
          <RouterLink
            to="/admin"
            className="admin-badge-btn"
            title="Admin Management Portal"
          >
            <FaShieldAlt className="btn-icon" />
            <span>Admin</span>
          </RouterLink>

          {isHomePage ? (
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              offset={-80}
              className="cta-btn primary-cta"
            >
              Book Event
            </ScrollLink>
          ) : (
            <RouterLink to="/" className="cta-btn primary-cta">
              Book Event
            </RouterLink>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="mobile-links">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {isHomePage ? (
                <ScrollLink
                  to={item.target}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </ScrollLink>
              ) : (
                <button
                  className="mobile-link text-left"
                  onClick={() => handleNavClick(item.target)}
                >
                  {item.name}
                </button>
              )}
            </React.Fragment>
          ))}
          <RouterLink
            to="/admin"
            className="mobile-link admin-link"
            onClick={() => setMenuOpen(false)}
          >
            <FaShieldAlt style={{ marginRight: "8px" }} /> Admin Dashboard
          </RouterLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;