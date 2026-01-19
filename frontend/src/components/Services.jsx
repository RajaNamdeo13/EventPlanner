import React, { useEffect, useState } from "react";

const Services = () => {
  const services = [
    { id: 1, url: "/images/birthday.svg", title: "Birthday Planning" },
    { id: 2, url: "/images/anniversary.svg", title: "Anniversary Planning" },
    { id: 3, url: "/images/camping.svg", title: "Camping Trip Planning" },
    { id: 4, url: "/images/gamenight.svg", title: "Game Night Planning" },
    { id: 5, url: "/images/party.svg", title: "Party Planning" },
    { id: 6, url: "/images/wedding.svg", title: "Wedding Planning" },
  ];

  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="services container" id="services">
      <h2>OUR SERVICES</h2>

      <div className="slider">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {services.map((service) => (
            <div className="slide" key={service.id}>
              <img src={service.url} alt={service.title} />
              <h3>{service.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="dots">
        {services.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
