

import { useEffect, useState } from "react";
import { getServices } from "../services/serviceService";
import {
  createBooking,
  getMyBookings,
  cancelBooking
} from "../services/bookingService";

import "./Booking.css";

const Booking = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await getMyBookings();
      setBookings(response.data.bookings);
    } catch (error) {
      console.error(error);
      setError("Termine konnten nicht geladen werden.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const servicesResponse = await getServices();

        setServices(servicesResponse.data);

        await fetchBookings();
      } catch (error) {
        console.error(error);
        setError("Daten konnten nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      await createBooking(formData);

      setMessage("Termin erfolgreich gebucht.");

      setFormData({
        service: "",
        date: "",
        time: ""
      });

      await fetchBookings();

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Termin konnte nicht gebucht werden."
      );
    }
  };

  const handleCancel = async (bookingId) => {
    setMessage("");
    setError("");

    try {
      await cancelBooking(bookingId);

      setMessage("Termin erfolgreich storniert.");

      await fetchBookings();

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Termin konnte nicht storniert werden."
      );
    }
  };

  const getStatusText = (status) => {
    if (status === "pending") return "Ausstehend";
    if (status === "confirmed") return "Bestätigt";
    if (status === "completed") return "Abgeschlossen";
    if (status === "cancelled") return "Storniert";

    return status;
  };

  if (loading) {
    return (
      <p className="booking-message">
        Termine werden geladen...
      </p>
    );
  }

  return (
    <main className="booking-page">

      <section className="booking-form-container">

        <p className="booking-small-title">
          Terminvereinbarung
        </p>

        <h1>Termin buchen</h1>

        <p className="booking-description">
          Wählen Sie eine Behandlung, ein Datum
          und eine passende Uhrzeit.
        </p>

        {message && (
          <p className="booking-success">
            {message}
          </p>
        )}

        {error && (
          <p className="booking-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="booking-form-group">
            <label htmlFor="service">
              Behandlung
            </label>

            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">
                Behandlung auswählen
              </option>

              {services.map((service) => (
                <option
                  key={service._id}
                  value={service._id}
                >
                  {service.title} - {service.price} €
                </option>
              ))}
            </select>
          </div>

          <div className="booking-form-group">
            <label htmlFor="date">
              Datum
            </label>

            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-form-group">
            <label htmlFor="time">
              Uhrzeit
            </label>

            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="booking-button"
          >
            Termin buchen
          </button>

        </form>
      </section>


      <section className="my-bookings">

        <h2>Meine Termine</h2>

        {bookings.length === 0 ? (
          <p className="no-bookings">
            Sie haben noch keine Termine.
          </p>
        ) : (
          <div className="bookings-list">

            {bookings.map((booking) => (
              <div
                className="booking-card"
                key={booking._id}
              >

                <h3>
                  {booking.service?.title || "Behandlung"}
                </h3>

                <p>
                  <strong>Datum:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString("de-DE")}
                </p>

                <p>
                  <strong>Uhrzeit:</strong>{" "}
                  {booking.time}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {getStatusText(booking.status)}
                </p>

                {booking.status !== "cancelled" &&
                  booking.status !== "completed" && (
                    <button
                      className="cancel-button"
                      onClick={() =>
                        handleCancel(booking._id)
                      }
                    >
                      Termin stornieren
                    </button>
                  )}

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  );
};

export default Booking;