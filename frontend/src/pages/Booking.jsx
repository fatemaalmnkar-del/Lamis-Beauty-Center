import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminBooking from "../Components/AdminBooking";
import { getServices } from "../services/serviceService";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getBookedTimes
} from "../services/bookingService";

import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiMail
} from "react-icons/fi";

import { HiOutlineSparkles } from "react-icons/hi2";

import useAutoDismiss from "../hooks/useAutoDismiss";

import "./Booking.css";

const Booking = () => {
  const user = useSelector((state) => state.auth.user);

  
  const [searchParams] = useSearchParams();

  const serviceIdfromURL = searchParams.get("serviceId") || "";

  const [services, setServices] = useState([]);
  const [bookingFilter, setBookingFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);

  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    service: serviceIdfromURL,
    date: "",
    time: ""
  });

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [adminBookingsRefresh, setAdminBookingsRefresh] = useState(0);

  useAutoDismiss(message, setMessage);
  useAutoDismiss(error, setError);

  const fetchBookings = async () => {
    try {
      const response = await getMyBookings();

      setBookings(response.data.bookings);
    } catch (error) {
      console.error(error);

      setError(
        "Bitte melden Sie sich an, um Ihre Termine zu sehen und einen Termin zu buchen."
      );
    }
  };

  const [dateOffset, setDateOffset] = useState(0);

  const availableTimes = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00"
  ];

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

  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (!formData.date) {
        setBookedTimes([]);
        return;
      }

      try {
        const response = await getBookedTimes(formData.date);

        setBookedTimes(response.data.bookedTimes);
      } catch (error) {
        console.error(error);

        setBookedTimes([]);
      }
    };

    fetchBookedTimes();
  }, [formData.date]);

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

    if (!formData.service) {
      setError("Bitte wählen Sie eine Behandlung aus.");
      return;
    }

    try {
      await createBooking(formData);
    
      if (user.role === "admin") {
        setAdminBookingsRefresh((prev) => prev + 1);
      }

    
  
      setMessage("Termin erfolgreich gebucht.");
     

      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        service: "",
        date: "",
        time: ""
      });

        if (user.role !== "admin") {
          await fetchBookings();
        }
          
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Termin konnte nicht gebucht werden."
      );
    }
  }

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

  const filteredBookings =
    bookingFilter === "all"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === bookingFilter
        );


  if (!user) {
    return (
      <main className="booking-page">
        <section className="booking-form-container">
          <p className="booking-small-title">
            TERMINVEREINBARUNG
          </p>

          <h1>Termin buchen</h1>

          <p className="booking-description">
            Bitte registrieren Sie sich und melden Sie sich an,
            um einen Termin zu buchen und Ihre Termine zu verwalten.
          </p>

          <Link to="/register" className="booking-button">
            Jetzt registrieren
          </Link>
        </section>
      </main>
    );
  }

  if (loading) {
    return (
      <p className="booking-message">
        Termine werden geladen...
      </p>
    );
  }

  const formatDateValue = (date) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getDateOptions = () => {
    const options = [];

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);

      currentDate.setDate(
        today.getDate() + dateOffset + i
      );

      options.push({
        value: formatDateValue(currentDate),

        dayName: currentDate.toLocaleDateString(
          "de-DE",
          {
            weekday: "short"
          }
        ),

        dayNumber: currentDate.getDate(),

        monthName: currentDate.toLocaleDateString(
          "de-DE",
          {
            month: "long"
          }
        ),

        isSunday: currentDate.getDay() === 0
      });
    }

    return options;
  };

  const dateOptions = getDateOptions();

  const selectedService = services.find(
    (service) => service._id === formData.service
  );

  return (
    <main className="booking-page">
     {user?.role === "admin" && (
        <AdminBooking refreshKey={adminBookingsRefresh} />
      )}
      <section className="booking-form-container">
        <p className="booking-small-title">
          Terminvereinbarung
        </p>

        <h1>Termin buchen</h1>

        <p className="booking-description">
          Wählen Sie eine Behandlung, ein Datum
          und eine passende Uhrzeit.
        </p>

        <form onSubmit={handleSubmit}>
          {/* ===== BEHANDLUNG ===== */}

          <div className="booking-form-group">
            <div className="booking-section-title">
              <HiOutlineSparkles className="section-icon" />

              <span>Behandlung</span>
            </div>

            <div className="custom-select">
              <button
                type="button"
                className="custom-select-button"
                onClick={() =>
                  setServiceMenuOpen(!serviceMenuOpen)
                }
              >
                <span>
                  {selectedService
                    ? `${selectedService.title} - ${selectedService.price} €`
                    : "Behandlung auswählen"}
                </span>

                <span className="custom-select-arrow">
                  {serviceMenuOpen ? "▲" : "▼"}
                </span>
              </button>

              {serviceMenuOpen && (
                <div className="custom-select-menu">
                  {services.map((service) => (
                    <button
                      type="button"
                      key={service._id}
                      className={`custom-select-option ${
                        formData.service === service._id
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          service: service._id
                        });

                        setServiceMenuOpen(false);
                      }}
                    >
                      <span>{service.title}</span>

                      <strong>
                        {service.price} €
                      </strong>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ===== DATUM ===== */}

          <div className="booking-form-group">
            <div className="booking-section-title">
              <FiCalendar className="section-icon" />

              <span>Datum auswählen</span>
            </div>

            <div className="booking-date-nav">
              <button
                type="button"
                className="date-nav-button"
                onClick={() =>
                  setDateOffset(
                    Math.max(0, dateOffset - 7)
                  )
                }
                disabled={dateOffset === 0}
              >
                ‹
              </button>

              <span className="booking-date-month">
                {dateOptions[0]?.monthName}
              </span>

              <button
                type="button"
                className="date-nav-button"
                onClick={() =>
                  setDateOffset(dateOffset + 7)
                }
              >
                ›
              </button>
            </div>

            <div className="booking-date-list">
              {dateOptions.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  disabled={item.isSunday}
                  className={`date-button ${
                    formData.date === item.value
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      date: item.value,
                      time: ""
                    })
                  }
                >
                  <span>{item.dayName}</span>

                  <strong>
                    {item.dayNumber}
                  </strong>
                </button>
              ))}
            </div>
          </div>

          {/* ===== UHRZEIT ===== */}

          <div className="booking-form-group">
            <div className="booking-section-title">
              <FiClock className="section-icon" />

              <span>Uhrzeit auswählen</span>
            </div>

            <div className="booking-times">
              {availableTimes.map((time) => {
                const isBooked =
                  bookedTimes.includes(time);

                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isBooked}
                    className={
                      formData.time === time
                        ? "time-button active"
                        : "time-button"
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,
                        time
                      })
                    }
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== ADMIN CUSTOMER DATA ===== */}

          {user.role === "admin" && (
            <div className="customer-data-section">
              <div className="booking-section-title">
                <FiUser className="section-icon" />

                <span>Kundendaten</span>
              </div>

              <div className="booking-form-group">
                <label
                  htmlFor="customerName"
                  className="icon-label"
                >
                  <FiUser className="label-icon" />

                  <span>Kundenname</span>
                </label>

                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="customer-contact-row">
                <div className="booking-form-group">
                  <label
                    htmlFor="customerPhone"
                    className="icon-label"
                  >
                    <FiPhone className="label-icon" />

                    <span>Telefonnummer</span>
                  </label>

                  <input
                    type="text"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="booking-form-group">
                  <label
                    htmlFor="customerEmail"
                    className="icon-label"
                  >
                    <FiMail className="label-icon" />

                    <span>E-Mail</span>
                  </label>

                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="booking-button"
          >
            Termin buchen
          </button>
        </form>
      </section>

      {/* ===== MY BOOKINGS ===== */}

      {user.role !== "admin" && (
        <section className="my-bookings">
          <div className="termine-bar">
            <h1>Meine Termine</h1>
          </div>

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

          {bookings.length === 0 ? (
            <p className="no-bookings">
              Sie haben noch keine Termine.
            </p>
          ) : (
            <>
              <div className="booking-filter-bar">
                <button
                  type="button"
                  className={
                    bookingFilter === "all"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setBookingFilter("all")
                  }
                >
                  Alle
                </button>

                <button
                  type="button"
                  className={
                    bookingFilter === "pending"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setBookingFilter("pending")
                  }
                >
                  Ausstehend
                </button>

                <button
                  type="button"
                  className={
                    bookingFilter === "confirmed"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setBookingFilter("confirmed")
                  }
                >
                  Bestätigt
                </button>

                <button
                  type="button"
                  className={
                    bookingFilter === "completed"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setBookingFilter("completed")
                  }
                >
                  Abgeschlossen
                </button>

                <button
                  type="button"
                  className={
                    bookingFilter === "cancelled"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setBookingFilter("cancelled")
                  }
                >
                  Storniert
                </button>
              </div>

              <div className="bookings-list">
                {filteredBookings.map((booking) => (
                  <div
                    className="booking-card"
                    key={booking._id}
                  >
                    <h3>
                      {booking.service?.title ||
                        "Behandlung"}
                    </h3>

                    <p>
                      <strong>Datum:</strong>{" "}
                      {new Date(
                        booking.date
                      ).toLocaleDateString("de-DE")}
                    </p>

                    <p>
                      <strong>Uhrzeit:</strong>{" "}
                      {booking.time}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {getStatusText(
                        booking.status
                      )}
                    </p>

                    {booking.status !== "cancelled" &&
                      booking.status !== "completed" && (
                        <button
                          className="cancel-button"
                          onClick={() =>
                            handleCancel(
                              booking._id
                            )
                          }
                        >
                          Termin stornieren
                        </button>
                      )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default Booking;