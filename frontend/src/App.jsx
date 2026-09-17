import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { scroller } from "react-scroll";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Calculator from "./components/Calculator";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";

import "./App.css";

// Landing Page Component assembling all interactive sections
const LandingPage = () => {
  const [prefillData, setPrefillData] = useState(null);

  const handleSelectService = (serviceTitle) => {
    setPrefillData({
      eventType: serviceTitle,
      subject: `Inquiry for ${serviceTitle}`,
    });
    scroller.scrollTo("contact", {
      smooth: true,
      duration: 500,
      offset: -80,
    });
  };

  const handleSelectPortfolioEvent = (eventTitle) => {
    setPrefillData({
      subject: `Inquiry based on Portfolio: ${eventTitle}`,
      notes: `I would like to plan an event similar to "${eventTitle}".`,
    });
    scroller.scrollTo("contact", {
      smooth: true,
      duration: 500,
      offset: -80,
    });
  };

  const handleApplyQuote = (quoteData) => {
    setPrefillData(quoteData);
  };

  return (
    <div className="landing-page-wrapper">
      <Navbar />

      <main>
        <HeroSection />
        <Services onSelectService={handleSelectService} />
        <Portfolio onSelectEvent={handleSelectPortfolioEvent} />
        <Calculator onApplyQuote={handleApplyQuote} />
        <About />
        <Testimonials />
        <FAQ />
        <Contact prefillData={prefillData} />
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      {/* Toast Notifications Configuration */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f8fafc",
            border: "1px solid rgba(255, 122, 0, 0.3)",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            fontSize: "0.95rem",
          },
          success: {
            iconTheme: {
              primary: "#ff7a00",
              secondary: "#fff",
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
        {/* Fallback route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
