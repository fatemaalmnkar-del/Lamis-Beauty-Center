
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {getServices,createService,updateService,deleteService} from "../services/serviceService";
import { getAllBookings ,  updateBookingStatus} from "../services/bookingService";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: ""
  });
 const [imageFile, setImageFile] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error(error);
      setError("Behandlungen konnten nicht geladen werden.");
    }
  };

  
useEffect(() => {
  const loadInitialData = async () => {
    try {
      const servicesResponse = await getServices();
      const bookingsResponse = await getAllBookings();

      setServices(servicesResponse.data);
      setBookings(bookingsResponse.data.bookings);
    } catch (error) {
      console.error(error);
    }
  };

  loadInitialData();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("duration", formData.duration);
    if (imageFile) {
      data.append("image", imageFile);
    }
    try {
      if (editingId) {
        await updateService(editingId, data);

        setMessage("Behandlung erfolgreich aktualisiert.");
      } else {
        await createService(data);

        setMessage("Behandlung erfolgreich hinzugefügt.");
      }

      setFormData({
        title: "",
        description: "",
        price: "",
        duration: ""
      });
      setImageFile(null);

      setEditingId(null);

      await fetchServices();

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Aktion konnte nicht durchgeführt werden."
      );
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title || "",
      description: service.description || "",
      price: service.price || "",
      duration: service.duration || ""
    });

    setEditingId(service._id);
    setImageFile(null);
    setMessage("");
    setError("");
  };

  const handleDelete = async (serviceId) => {
    const confirmed = window.confirm(
      "Möchten Sie diese Behandlung wirklich löschen?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteService(serviceId);

      setMessage("Behandlung erfolgreich gelöscht.");
      setError("");

      await fetchServices();

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Behandlung konnte nicht gelöscht werden."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      price: "",
      duration: ""
    });
    setImageFile(null);
  };
  const handleStatusChange = async (bookingId, status) => {
  try {
    await updateBookingStatus(bookingId, status);

    const response = await getAllBookings();
    setBookings(response.data.bookings);

    setMessage("Terminstatus erfolgreich aktualisiert.");
    setError("");

  } catch (error) {
    console.error(error);

    setError(
      error.response?.data?.message ||
      "Terminstatus konnte nicht aktualisiert werden."
    );
  }
};

  if (!user || user.role !== "admin") {
    return (
      <main className="admin-page">
        <p className="admin-access">
          Sie haben keinen Zugriff auf den Admin-Bereich.
        </p>
      </main>
    );
  }

  return (
    <main className="admin-page">

      <section className="admin-header">
        <p>Verwaltung</p>
        <h1>Admin-Dashboard</h1>
        <p>
          Verwalten Sie die Behandlungen des Beauty Centers.
        </p>
      </section>

      <section className="admin-form-container">

        <h2>
          {editingId
            ? "Behandlung bearbeiten"
            : "Neue Behandlung hinzufügen"}
        </h2>

        {message && (
          <p className="admin-success">
            {message}
          </p>
        )}

        {error && (
          <p className="admin-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="admin-form-group">
            <label htmlFor="title">
              Titel
            </label>

            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="description">
              Beschreibung
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="price">
              Preis (€)
            </label>

            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="duration">
              Dauer
            </label>

            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="z. B. 60"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="image">
              Bild
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            /> 
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="admin-image-preview"
              />
            )}
          </div>

          <button
            type="submit"
            className="admin-save-button"
          >
            {editingId
              ? "Änderungen speichern"
              : "Behandlung hinzufügen"}
          </button>

          {editingId && (
            <button
              type="button"
              className="admin-cancel-button"
              onClick={handleCancelEdit}
            >
              Abbrechen
            </button>
          )}

        </form>
      </section>

      <section className="admin-services">
           <div className="behandlung-termine-bar">
             <h2>Behandlungen</h2>
           </div>
        

         <div className="admin-services-grid">

          {services.map((service) => (
            <div
              className="admin-service-card"
              key={service._id}>
              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="admin-service-image"
                />
              )}
              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <p className="admin-price">
                {service.price} €
              </p>

              {service.duration && (
                <p>
                  Dauer: {service.duration}
                </p>
              )}

              <div className="admin-actions">

                <button
                  className="edit-button"
                  onClick={() => handleEdit(service)}
                >
                  Bearbeiten
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(service._id)
                  }
                >
                  Löschen
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>
      
      
      <section className="admin-services">
        <div className="behandlung-termine-bar">
          <h2>Alle Termine</h2>
        </div>
        

        <div className="admin-services-grid">

          {bookings.map((booking) => (
            <div className="admin-service-card" key={booking._id}>

              <h3>{booking.service?.title}</h3>
              <p><strong>Kunde:</strong>{" "}{booking.user?.name}</p>

              <p><strong>Datum:</strong>{" "}{new Date(booking.date).toLocaleDateString("de-DE")}</p>

              <p><strong>Uhrzeit:</strong>{" "}{booking.time}</p>

              <p><strong>Status:</strong>{" "} {booking.status}</p>
              <div className="admin-actions">

                {booking.status === "pending" && (
                  <button
                  className="edit-button"
                  onClick={() =>
                    handleStatusChange(booking._id, "confirmed")
                  }
                  >
                  Bestätigen
                  </button>
                )}

                {booking.status === "confirmed" && (
                  <button
                  className="edit-button"
                  onClick={() =>
                    handleStatusChange(booking._id, "completed")
                  }
                  >
                  Abschließen
                  </button>
                )}

                {booking.status !== "cancelled" &&
                  booking.status !== "completed" && (
                  <button
                    className="delete-button"
                    onClick={() =>
                    handleStatusChange(booking._id, "cancelled")
                    }>
                    Stornieren
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
};

export default AdminDashboard;