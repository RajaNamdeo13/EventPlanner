import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      {/* Global Toast Notifications */}
      <Toaster position="top-right" />

      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <section id="hero">
        <HeroSection />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
