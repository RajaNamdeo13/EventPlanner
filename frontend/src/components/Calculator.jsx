import React, { useState, useId } from "react";
import { Link } from "react-scroll";
import { FaCalculator, FaCheck, FaCoins, FaUsers, FaBuilding, FaUtensils, FaArrowDown } from "react-icons/fa";

const Calculator = ({ onApplyQuote }) => {
  const [eventType, setEventType] = useState("Wedding");
  const [guests, setGuests] = useState(120);
  const [venueType, setVenueType] = useState("ballroom");
  const [cateringTier, setCateringTier] = useState("deluxe");
  const [addons, setAddons] = useState({
    drone: true,
    liveBand: false,
    lighting: true,
    photoBooth: true,
    fireworks: false,
  });

  const eventTypes = [
    { label: "Wedding", base: 3500 },
    { label: "Corporate Summit", base: 4000 },
    { label: "Birthday Party", base: 1500 },
    { label: "Anniversary Dinner", base: 1800 },
    { label: "Glamping / Retreat", base: 2200 },
    { label: "Game Night / Esports", base: 1200 },
  ];

  const venuePrices = {
    ballroom: { name: "Grand Ballroom / Resort", price: 4500 },
    garden: { name: "Outdoor Estate / Garden", price: 3200 },
    loft: { name: "Contemporary Urban Loft", price: 2800 },
    private: { name: "Client Private Property", price: 900 },
  };

  const cateringPrices = {
    fingerFood: { name: "Canapés & Cocktails Only", perGuest: 25 },
    buffet: { name: "Gourmet International Buffet", perGuest: 45 },
    deluxe: { name: "3-Course Plated Dining", perGuest: 75 },
    michelin: { name: "Michelin Executive Tasting", perGuest: 130 },
  };

  const addonPrices = {
    drone: { name: "4K Drone & Cinematography", price: 1800 },
    liveBand: { name: "Live Acoustic Band / Quartet", price: 1500 },
    lighting: { name: "Atmospheric Moving LED Lighting", price: 1600 },
    photoBooth: { name: "360 Video Booth & Keepsake Prints", price: 850 },
    fireworks: { name: "Cold-Spark / Pyrotechnics Show", price: 2200 },
  };

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculations
  const selectedEvent = eventTypes.find((e) => e.label === eventType) || eventTypes[0];
  const baseCost = selectedEvent.base;
  const venueCost = venuePrices[venueType].price;
  const cateringCost = guests * cateringPrices[cateringTier].perGuest;
  const addonsCost = Object.keys(addons).reduce((sum, key) => {
    return addons[key] ? sum + addonPrices[key].price : sum;
  }, 0);

  const subtotal = baseCost + venueCost + cateringCost + addonsCost;
  const coordinationFee = Math.round(subtotal * 0.12);
  const totalEstimate = subtotal + coordinationFee;

  const handleSendToContact = () => {
    if (onApplyQuote) {
      onApplyQuote({
        eventType,
        guests,
        budget: `$${totalEstimate.toLocaleString()}`,
        subject: `Quote Request for ${eventType} (${guests} Guests)`,
        notes: `Estimated budget: $${totalEstimate.toLocaleString()}. Venue: ${venuePrices[venueType].name}. Catering: ${cateringPrices[cateringTier].name}.`,
      });
    }
  };

  return (
    <section className="calculator-section" id="calculator">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">BUDGET PLANNER</span>
          <h2 className="section-title">
            Interactive <span className="gradient-text">Cost Estimator</span>
          </h2>
          <p className="section-subtitle">
            Customize every aspect of your event in real-time to get an accurate price estimate with no hidden surprises.
          </p>
        </div>

        <div className="calc-layout">
          {/* Controls Form Column */}
          <div className="calc-controls-card">
            {/* 1. Event Type */}
            <div className="calc-group">
              <label className="calc-label">
                <FaCoins className="label-icon" /> 1. Select Event Type
              </label>
              <div className="calc-pill-grid">
                {eventTypes.map((et) => (
                  <button
                    key={et.label}
                    type="button"
                    className={`calc-pill ${eventType === et.label ? "active" : ""}`}
                    onClick={() => setEventType(et.label)}
                  >
                    {et.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Guest Count Slider */}
            <div className="calc-group">
              <div className="calc-slider-header">
                <label className="calc-label">
                  <FaUsers className="label-icon" /> 2. Expected Guest Count
                </label>
                <span className="calc-val-highlight">{guests} Guests</span>
              </div>
              <input
                type="range"
                min="20"
                max="600"
                step="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="slider-limits">
                <span>20 Guests</span>
                <span>300</span>
                <span>600+ Guests</span>
              </div>
            </div>

            {/* 3. Venue Style */}
            <div className="calc-group">
              <label className="calc-label">
                <FaBuilding className="label-icon" /> 3. Preferred Venue Style
              </label>
              <div className="calc-select-grid">
                {Object.entries(venuePrices).map(([key, item]) => (
                  <div
                    key={key}
                    className={`calc-option-box ${venueType === key ? "active" : ""}`}
                    onClick={() => setVenueType(key)}
                  >
                    <span className="opt-title">{item.name}</span>
                    <span className="opt-price">+${item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Catering Grade */}
            <div className="calc-group">
              <label className="calc-label">
                <FaUtensils className="label-icon" /> 4. Catering & Dining Preference
              </label>
              <div className="calc-select-grid">
                {Object.entries(cateringPrices).map(([key, item]) => (
                  <div
                    key={key}
                    className={`calc-option-box ${cateringTier === key ? "active" : ""}`}
                    onClick={() => setCateringTier(key)}
                  >
                    <span className="opt-title">{item.name}</span>
                    <span className="opt-price">${item.perGuest} / guest</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Production & Add-ons */}
            <div className="calc-group">
              <label className="calc-label">5. Optional Enhancements & Entertainment</label>
              <div className="calc-checkbox-list">
                {Object.entries(addonPrices).map(([key, item]) => (
                  <label key={key} className="calc-checkbox-label">
                    <input
                      type="checkbox"
                      checked={addons[key]}
                      onChange={() => toggleAddon(key)}
                    />
                    <span className="chk-custom"></span>
                    <span className="chk-text">{item.name}</span>
                    <span className="chk-cost">+${item.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Summary Card Column */}
          <div className="calc-summary-wrapper">
            <div className="calc-summary-card">
              <div className="summary-header">
                <h3>Estimated Cost</h3>
                <span className="summary-badge">Real-Time Quote</span>
              </div>

              <div className="summary-big-total">
                <span className="currency">$</span>
                <span className="amount">{totalEstimate.toLocaleString()}</span>
                <span className="tax-note">est. all-inclusive</span>
              </div>

              <div className="summary-breakdown">
                <div className="breakdown-row">
                  <span>Base Planning & Coordination</span>
                  <span>${baseCost.toLocaleString()}</span>
                </div>
                <div className="breakdown-row">
                  <span>Venue Package ({venuePrices[venueType].name})</span>
                  <span>${venueCost.toLocaleString()}</span>
                </div>
                <div className="breakdown-row">
                  <span>Catering ({guests} Guests × ${cateringPrices[cateringTier].perGuest})</span>
                  <span>${cateringCost.toLocaleString()}</span>
                </div>
                <div className="breakdown-row">
                  <span>Add-on Enhancements</span>
                  <span>${addonsCost.toLocaleString()}</span>
                </div>
                <div className="breakdown-row fee">
                  <span>Professional Event Management (12%)</span>
                  <span>${coordinationFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-highlights">
                <p><FaCheck className="chk-icon" /> Dedicated lead coordinator assigned</p>
                <p><FaCheck className="chk-icon" /> Transparent pricing, zero hidden fees</p>
                <p><FaCheck className="chk-icon" /> Full vendor management & contract security</p>
              </div>

              <Link
                to="contact"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="calc-submit-btn"
                onClick={handleSendToContact}
              >
                <span>Lock In This Estimate</span>
                <FaArrowDown />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
