
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../services/userService";
import { getMyContactMessages } from "../services/contactService";
import { loginSuccess } from "../store/authSlice";
import "./Profile.css";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,  FaCommentDots
} from "react-icons/fa";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dataofBirth: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [contactMessages, setContactMessages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          dataofBirth: response.data.dataofBirth
            ? response.data.dataofBirth.split("T")[0]
            : ""
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
          "Profil konnte nicht geladen werden"
        );
      } finally {
        setLoading(false);
      }
    };
    const fetchContactMessages = async () => {
   try {
    const response = await getMyContactMessages();

    setContactMessages(response.contactMessages);
   } catch (error) {
    console.error("Fehler beim Laden der Nachrichten:", error);
   }
   };

    fetchProfile();
    fetchContactMessages();
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
      const response = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        dataofBirth: formData.dataofBirth
      });

      const token = localStorage.getItem("token");

      dispatch(
        loginSuccess({
          user: response.data.user,
          token
        })
      );

      setMessage("Profil erfolgreich aktualisiert");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Profil konnte nicht aktualisiert werden"
      );
    }
  };

  if (loading) {
    return (
      <p className="profile-message">
        Profil wird geladen...
      </p>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-section-bar profile-bar">
        <h1>Mein Profil</h1>
      </div>

      <div className="profile-container">
        <p className="profile-small-title">
         Persönliche Daten
       </p>

        {message && (
          <p className="profile-success">
            {message}
          </p>
        )}

        {error && (
          <p className="profile-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name"  >
              <FaUser />
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope />
              E-Mail-Adresse
            </label>

            <input
              type="email"
              id="email"
              value={formData.email}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <FaPhoneAlt />
              Telefonnummer
            </label>

            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataofBirth">
              <FaCalendarAlt />
              Geburtsdatum
            </label>

            <input
              type="date"
              id="dataofBirth"
              name="dataofBirth"
              value={formData.dataofBirth}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="profile-button"
          >
            Speichern
          </button>

        </form>


      </div>
      
        <div className="profile-messages">
          <div className="profile-section-bar">
            <h2>Meine Nachrichten</h2>
          </div>

         


          {contactMessages.length === 0 ? (
            <p className="profile-no-messages">
              Sie haben noch keine Nachrichten.
            </p>
          ) : (
            contactMessages.map((contactMessage) => (
              <div
                className="profile-message-card"
                key={contactMessage._id}
              >
                <h3>  <FaCommentDots />  {contactMessage.subject}</h3>
                <p>
                  <strong>Gesendet am: </strong>
                  {new Date(contactMessage.createdAt).toLocaleDateString("de-DE")}
                </p>

                <p>
                  <strong>Meine Nachricht:</strong>
                </p>

                <p>{contactMessage.message}</p>

                <p>
                  <strong>Status: </strong>
                  <span
                    className={
                      contactMessage.reply
                        ? "message-status answered"
                        : "message-status waiting"
                    }
                  >
                    {contactMessage.reply
                      ? "✓ Beantwortet"
                      : "Noch keine Antwort"}
                  </span>
                </p>

                {contactMessage.reply && (
                  <div className="profile-admin-reply">
                    <strong>Antwort vom Lamis Beauty Center:</strong>
                    <p>{contactMessage.reply}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
    </main>
  );
};

export default Profile;