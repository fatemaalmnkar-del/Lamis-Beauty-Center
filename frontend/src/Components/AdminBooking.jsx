
import { useCallback, useEffect, useState } from "react";
import {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  deleteBookingsByStatus
} from "../services/bookingService";
import "./AdminBooking.css";


import useAutoDismiss from "../hooks/useAutoDismiss";

const AdminBooking = ({ refreshKey, onSelectSlot  }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingFilter] = useState("all")

  const [selectedDate, setSelectedDate] = useState("");
 const [dateView, setDateView] = useState("day");

  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");

  useAutoDismiss(bookingMessage, setBookingMessage);
  useAutoDismiss(bookingError, setBookingError);
   
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

const handleDateChange = (e) => {
  const value = e.target.value;

  if (!value) {
    setSelectedDate("");
    return;
  }

  const date = new Date(`${value}T12:00:00`);

  if (date.getDay() === 0) {
    setBookingError(
      "Sonntags sind keine Termine verfügbar."
    );
    return;
  }

  setBookingError("");
  setSelectedDate(value);
  setDateView("day");
};
  const bookingStatusLabels = {
    pending: "Bestätigung erforderlich",
    confirmed: "Bestätigt",
    completed: "Abgeschlossen",
    cancelled: "Storniert"
  };
const filteredBookings = bookings.filter((booking) => {
  return(
    bookingFilter === "all" ||
    booking.status === bookingFilter

  );
});

const dayBookings = selectedDate
  ? bookings.filter((booking) => {
      const bookingDate = new Date(booking.date)
        .toISOString()
        .split("T")[0];

      return bookingDate === selectedDate;
    })
  : [];


      
const fetchBookings = useCallback(async () => {
  try {
    const response = await getAllBookings();

    setBookings(response.data.bookings);
  } catch (error) {
    console.error(error);

    setBookingError(
      "Termine konnten nicht geladen werden."
    );
  }
}, []);

useEffect(() => {
  const loadBookings = async () => {
    await fetchBookings();
  };

  loadBookings();
}, [fetchBookings, refreshKey]);

  const handleStatusChange = async (
    bookingId,
    status
  ) => {
    try {
      await updateBookingStatus(
        bookingId,
        status
      );

      await fetchBookings();

      setBookingMessage(
        "Terminstatus erfolgreich aktualisiert."
      );

      setBookingError("");
    } catch (error) {
      console.error(error);

      setBookingError(
        error.response?.data?.message ||
          "Terminstatus konnte nicht aktualisiert werden."
      );
    }
  };

  const handleDeleteBooking = async (
    bookingId
  ) => {
    const confirmed = window.confirm(
      "Möchten Sie diesen Termin wirklich dauerhaft löschen?"
    );

    if (!confirmed) return;

    try {
      await deleteBooking(bookingId);

      await fetchBookings();

      setBookingMessage(
        "Termin erfolgreich gelöscht."
      );

      setBookingError("");
    } catch (error) {
      console.error(error);

      setBookingError(
        error.response?.data?.message ||
          "Der Termin konnte nicht gelöscht werden."
      );
    }
  };

  const handleDeleteBookingsByStatus = async (
    status
  ) => {
    const statusLabel =
      bookingStatusLabels[status] || status;

    const confirmed = window.confirm(
      `Möchten Sie wirklich alle Termine mit dem Status "${statusLabel}" löschen?`
    );

    if (!confirmed) return;

    try {
      const response =
        await deleteBookingsByStatus(status);

      await fetchBookings();

      setBookingMessage(
        response.data?.message ||
          "Termine erfolgreich gelöscht."
      );

      setBookingError("");
    } catch (error) {
      console.error(error);

      setBookingError(
        error.response?.data?.message ||
          "Die Termine konnten nicht gelöscht werden."
      );
    }
  };
  const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const handleToday = () => {
  const today = new Date();

  setSelectedDate(formatDateForInput(today));
  setDateView("day");
};

const handleTomorrow = () => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  // إذا بكرا أحد، ننتقل للاثنين
  if (tomorrow.getDay() === 0) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  }

  setSelectedDate(formatDateForInput(tomorrow));
  setDateView("day");
};

const handleThisWeek = () => {
  setDateView("thisWeek");
};

const handleNextWeek = () => {
  setDateView("nextWeek");
};
const getWeekDays = (nextWeek = false) => {
  const today = new Date();

  const day = today.getDay();

  const distanceToMonday =
    day === 0 ? -6 : 1 - day;

  const monday = new Date(today);

  monday.setDate(
    today.getDate() +
      distanceToMonday +
      (nextWeek ? 7 : 0)
  );

  const days = [];

  for (let i = 0; i < 6; i++) {
    const date = new Date(monday);

    date.setDate(monday.getDate() + i);

    days.push(date);
  }

  return days;
};
const weekDays =
  dateView === "thisWeek"
    ? getWeekDays(false)
    : dateView === "nextWeek"
      ? getWeekDays(true)
      : [];

  return (
    <>
      <nav className="termine-page-nav" id="nav">
        <a href="#alle-termine">
          Alle Termine
        </a>
        <a href="#termin-buchen">
          Termin buchen
        </a>

        <a href="#termin-uebersicht">
          Terminübersicht
        </a>
      </nav>
      <section className="admin-booking" id="alle-termine">

        <div className="behandlung-termine-bar">
          <h2 style={{color:" #b08a3c"}}>Alle Termine</h2>
        </div>
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
            Bestätigung erforderlich
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

        <div className="booking-delete-actions">
          <button
            type="button"
            className="delete-button"
            onClick={() =>
              handleDeleteBookingsByStatus(
                "cancelled"
              )
            }
          >
            Stornierte Termine löschen
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() =>
              handleDeleteBookingsByStatus(
                "completed"
              )
            }
          >
            Abgeschlossene Termine löschen
          </button>
        </div>

        {bookingMessage && (
          <p className="admin-success">
            {bookingMessage}
          </p>
        )}

        {filteredBookings.length === 0 && (
          <p className="no-bookings">
            Keine Termine vorhanden.
          </p>
        )}

        <div className="admin-services-grid">
          {filteredBookings.map((booking) => (
            <div
              className="admin-service-card"
              key={booking._id}
            >
              <h3>
                {booking.service?.title}
              </h3>

              <p>
                <strong>Kunde:</strong>{" "}
                {booking.user?.name ||
                  booking.customerName ||
                  "Kunde"}
              </p>

              {(booking.user?.phone ||
                booking.customerPhone) && (
                <p>
                  <strong>Telefon:</strong>{" "}
                  {booking.user?.phone ||
                    booking.customerPhone}
                </p>
              )}

              {(booking.user?.email ||
                booking.customerEmail) && (
                <p>
                  <strong>E-Mail:</strong>{" "}
                  {booking.user?.email ||
                    booking.customerEmail}
                </p>
              )}

              <p>
                <strong>Datum:</strong>{" "}
                {new Date(
                  booking.date
                ).toLocaleDateString(
                  "de-DE"
                )}
              </p>

              <p>
                <strong>Uhrzeit:</strong>{" "}
                {booking.time}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {bookingStatusLabels[
                  booking.status
                ] || booking.status}
              </p>

              <div className="admin-actions">
                {booking.status ===
                  "pending" && (
                  <button
                    className="edit-button"
                    onClick={() =>
                      handleStatusChange(
                        booking._id,
                        "confirmed"
                      )
                    }
                  >
                    Bestätigen
                  </button>
                )}

                {booking.status ===
                  "confirmed" && (
                  <button
                    className="edit-button"
                    onClick={() =>
                      handleStatusChange(
                        booking._id,
                        "completed"
                      )
                    }
                  >
                    Abschließen
                  </button>
                )}

                {booking.status !==
                  "cancelled" &&
                  booking.status !==
                    "completed" && (
                    <button
                      className="cancel-booking-button"
                      onClick={() =>
                        handleStatusChange(
                          booking._id,
                          "cancelled"
                        )
                      }
                    >
                      Stornieren
                    </button>
                  )}

                <button
                  type="button"
                  className="delete-button"
                  onClick={() =>
                    handleDeleteBooking(
                      booking._id
                    )
                  }
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="admin-day-section"  id="termin-uebersicht">
         <div className="behandlung-termine-bar">
            <h2 style={{color:" #b08a3c"}}>Terminübersicht</h2>
          </div>
          <div className="quick-date-row">
         
            <div className="quick-date-toolbar">
              <button
                type="button"
                onClick={handleToday}
                className={dateView === "day" ? "active" : ""}
              >
                Heute
              </button>

              <button
                type="button"
                onClick={handleTomorrow}
                className={dateView === "day" ? "active" : ""}
              >
                Morgen
              </button>

              <button
                type="button"
                onClick={handleThisWeek}
                className={dateView === "thisWeek" ? "active" : ""}
              >
                Diese Woche
              </button>

              <button
                type="button"
                onClick={handleNextWeek}
                className={dateView === "nextWeek" ? "active" : ""}
              >
                Nächste Woche
              </button>
            </div>
            <div className="admin-date-filter">
              <label htmlFor="admin-booking-date">
                Datum auswählen:
              </label>

              <input
                id="admin-booking-date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
              {bookingError && (
                <p className="booking-error">
                  {bookingError}
                </p>
              )}
            </div>
          </div>
          {(dateView === "thisWeek" || dateView === "nextWeek") &&
            weekDays.length > 0 && (
              <h3 className="selected-week-title">
                {dateView === "thisWeek"
                  ? "Diese Woche"
                  : "Nächste Woche"}
                :{" "}
                {weekDays[0].toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "long"
                })}
                {" – "}
                {weekDays[5].toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                })}
              </h3>
            )}
            {(dateView === "thisWeek" || dateView === "nextWeek") &&
              weekDays.length > 0 && (
                <div className="week-overview">
                  {weekDays.map((day) => {
                    const dayString = formatDateForInput(day);

                    const bookingsForDay = bookings.filter((booking) => {
                      const bookingDate = new Date(booking.date)
                        .toISOString()
                        .split("T")[0];

                      return (
                        bookingDate === dayString &&
                        booking.status !== "cancelled"
                      );
                    });

                    return (
                      <div
                        key={dayString}
                        className="week-day-column"
                      >
                        <h4>
                          {day.toLocaleDateString("de-DE", {
                            weekday: "long"
                          })}
                        </h4>

                        <p>
                          {day.toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "long"
                          })}
                        </p>

                        {availableTimes.map((time) => {
                          const booking = bookingsForDay.find(
                            (item) => item.time === time
                          );

                          return (
                            <div
                              key={time}
                              className={`week-time-row ${
                                booking ? "booked" : "free"
                              }`}
                            >
                              <strong>{time}</strong>

                           {booking ? (
                              <div className="week-booking-info">
                                <span className="week-customer-name">
                                  {booking.user?.name ||
                                    booking.customerName ||
                                    "Kunde"}
                                </span>

                                <span className="week-service-name">
                                  {booking.service?.title}
                                </span>
                              </div>
                            ) : (
                              <div className="week-free-slot">
                                <span>Frei</span>

                                <button
                                  type="button"
                                  className="week-book-btn"
                                  onClick={() => {
                                    onSelectSlot(dayString, time);

                                    setTimeout(() => {
                                      document
                                        .querySelector(".booking-form-container")
                                        ?.scrollIntoView({
                                          behavior: "smooth"
                                        });
                                    }, 0);
                                  }}
                                >
                                  Termin buchen
                                </button>
                              </div>
                            )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            
              
            {dateView === "day" && selectedDate && (
              <div className="day-overview">
                
                  <h3 className="selected-day-title">
                    {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                      "de-DE",
                      {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                      }
                    )}
                  </h3>
                

            {availableTimes.map((time) => {
              const booking = dayBookings.find(
                (item) =>
                  item.time === time &&
                  item.status !== "cancelled"
              );

              return (
                <div
                  key={time}
                  className={`time-overview-row ${booking ? "booked" : "free"}`}
                >
                  <strong className="time-hour">{time}</strong>
                  <span className="time-status">
                    {booking ? "Gebucht" : "Frei"}
                  </span>
                  {booking ? (
                  <div className="booking-info">
                    <span className="customer-name">
                      {booking.user?.name ||
                        booking.customerName ||
                        "Kunde"}
                    </span>

                    <span className="service-name">
                      {booking.service?.title}
                    </span>
                  </div>
                  ) : (
                  <div className="time-action">
                    <button
                      type="button"
                      className="time-book-btn"
                      onClick={() => {
                        onSelectSlot(selectedDate, time);

                        setTimeout(() => {
                          document
                            .querySelector(".booking-form-container")
                            ?.scrollIntoView({
                              behavior: "smooth"
                            });
                        }, 0);
                      }}
                    >
                      Termin buchen
                    </button>
                  </div>
                )}
                </div>
              );
            })}
          </div>
        )}
      </section>
      <a
        href="#nav"
        className="termine-back-top"
      >
        ↑ Nach oben
      </a>
   </>
  );
};

export default AdminBooking;