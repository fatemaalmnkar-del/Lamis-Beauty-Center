
import { useCallback, useEffect, useState } from "react";
import {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  deleteBookingsByStatus
} from "../services/bookingService";
import "./AdminBooking.css";

import useAutoDismiss from "../hooks/useAutoDismiss";

const AdminBooking = ({ refreshKey }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingFilter] = useState("all");

  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");

  useAutoDismiss(bookingMessage, setBookingMessage);
  useAutoDismiss(bookingError, setBookingError);

  const bookingStatusLabels = {
    pending: "Bestätigung erforderlich",
    confirmed: "Bestätigt",
    completed: "Abgeschlossen",
    cancelled: "Storniert"
  };

  const filteredBookings =
    bookingFilter === "all"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === bookingFilter
        );

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

  return (
    <section className="admin-booking">
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

      {bookingError && (
        <p className="admin-error">
          {bookingError}
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
  );
};

export default AdminBooking;