import React, { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How far in advance should we start planning our event?",
      a: "For large celebrations like weddings or multi-day corporate conferences, we recommend booking 6 to 12 months in advance to secure top venues and talent. For private dinners, birthdays, and smaller retreats, 4 to 8 weeks is typically sufficient.",
    },
    {
      q: "Can we customize our package or bring our own preferred vendors?",
      a: "Absolutely! Every package is completely modular. You can use our vetted network of premier caterers, florists, and entertainers, or we can seamlessly liaise and manage your hand-picked vendors under our coordination umbrella.",
    },
    {
      q: "How does the pricing and deposit structure work?",
      a: "We believe in transparent pricing with no hidden charges. A 25% initial deposit reserves your event date on our calendar. The remainder is divided into milestone installments, with the final balance due 14 days before your event.",
    },
    {
      q: "What is your contingency plan for outdoor events if the weather turns?",
      a: "We build an airtight 'Plan B' for every outdoor event from day one. This includes high-grade weatherproof marquee structures, portable heating/AC units, redundant power generators, and covered transit corridors.",
    },
    {
      q: "Do you offer 'Day-of Coordination' in addition to full-service planning?",
      a: "Yes! While our Full Concierge Planning handles everything from concept to cleanup, we also offer 'Month-Of / Day-Of Coordination' for clients who have already selected their vendors and need an experienced team to manage execution flawlessly.",
    },
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="section-container">
        <div className="section-header">
          <span className="section-kicker">GOT QUESTIONS?</span>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Find quick answers to common questions about our planning process, packages, and logistics.
          </p>
        </div>

        <div className="faq-accordion">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className={`faq-item ${openIndex === idx ? "active" : ""}`}
            >
              <button
                className="faq-question-btn"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="faq-q-text">
                  <FaQuestionCircle className="faq-q-icon" />
                  {item.q}
                </span>
                <FaChevronDown
                  className={`faq-chevron ${openIndex === idx ? "rotate" : ""}`}
                />
              </button>

              <div className="faq-answer-container">
                <div className="faq-answer-content">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
