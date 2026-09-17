
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../services/userService";
import { loginSuccess } from "../store/authSlice";
import "./Profile.css";

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

    fetchProfile();
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
      <div className="profile-container">

        <p className="profile-small-title">
          Persönliche Daten
        </p>

        <h1>Mein Profil</h1>

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
            <label htmlFor="name">
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
    </main>
  );
};

export default Profile;