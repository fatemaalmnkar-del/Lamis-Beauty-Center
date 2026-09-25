import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../services/serviceService";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      <section className="services-header">
        <p>Unsere Leistungen</p>

        <h1>Unsere Behandlungen</h1>

        <p className="services-intro">
          Entdecken Sie unsere professionellen Beauty-Behandlungen
          und finden Sie die passende Behandlung für Ihre Bedürfnisse.
        </p>
      </section>

      <section className="services-container">

        {services.map((service) => (
          <div className="service-card" key={service._id}>
            {service.image && (
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
            )}
            <h2>{service.title}</h2>

            <p className="service-description">
              {service.description}
            </p>

            <p className="service-price">
              {service.price} €
            </p>

            {service.duration && (
              <p className="service-duration">
                Dauer: {service.duration}
              </p>
            )}

            <Link to={`/booking?serviceId=${service._id}`} className="service-button">
              Termin buchen
            </Link>
          </div>
        ))}

      </section>

    </main>
  );
};

export default Services;
