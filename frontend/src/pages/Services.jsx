import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../services/serviceService";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("Alle");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();

        setServices(response.data);
      } catch (error) {
        console.error(error);
        setError("Die Behandlungen konnten nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices =
    activeCategory === "Alle"
      ? services
      : services.filter(
          (service) => service.category === activeCategory
        );

  if (loading) {
    return (
      <p className="services-message">
        Behandlungen werden geladen...
      </p>
    );
  }

  if (error) {
    return (
      <p className="services-message">
        {error}
      </p>
    );
  }

  return (
    <main className="services-page">

      {/* ===== Header ===== */}

      <section className="services-header">
        <p>Unsere Leistungen</p>

        <h1>Unsere Behandlungen</h1>

        <p className="services-intro">
          Entdecken Sie unsere professionellen Beauty-Behandlungen
          und finden Sie die passende Behandlung für Ihre Bedürfnisse.
        </p>
      </section>


      {/* ===== Categories ===== */}

      <div className="services-categories">

        <button
          className={activeCategory === "Alle" ? "active" : ""}
          onClick={() => setActiveCategory("Alle")}
        >
          Alle
        </button>

        <button
          className={activeCategory === "Gesicht" ? "active" : ""}
          onClick={() => setActiveCategory("Gesicht")}
        >
          Gesicht
        </button>

        <button
          className={activeCategory === "Laser" ? "active" : ""}
          onClick={() => setActiveCategory("Laser")}
        >
          Laser
        </button>

        <button
          className={activeCategory === "Waxing" ? "active" : ""}
          onClick={() => setActiveCategory("Waxing")}
        >
          Waxing
        </button>

        <button
          className={activeCategory === "Augen & Wimpern" ? "active" : ""}
          onClick={() => setActiveCategory("Augen & Wimpern")}
        >
          Augen & Wimpern
        </button>

        <button
          className={activeCategory === "Hände & Füße" ? "active" : ""}
          onClick={() => setActiveCategory("Hände & Füße")}
        >
          Hände & Füße
        </button>

        <button
          className={
            activeCategory === "Weitere Behandlungen"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveCategory("Weitere Behandlungen")
          }
        >
          Weitere Behandlungen
        </button>

      </div>


      {/* ===== Services ===== */}

      <section className="services-container">

        {filteredServices.map((service) => (
          <div
            className="service-card"
            key={service._id}
          >

            {service.image && (
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
            )}

            <div className="service-card-content">

              <h2>{service.title}</h2>

              <p className="service-description">
                {service.description}
              </p>

              <div className="service-card-footer">

                <p className="service-price">
                  {service.price} €
                </p>

                {service.duration && (
                  <p className="service-duration">
                    Dauer: {service.duration}
                  </p>
                )}

                <Link
                  to={`/booking?serviceId=${service._id}`}
                  className="service-button"
                >
                  Termin buchen
                </Link>

              </div>

            </div>

          </div>
        ))}

      </section>

    </main>
  );
};

export default Services;