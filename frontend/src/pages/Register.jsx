
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dataofBirth: ""
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await registerUser(formData);

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registrierung fehlgeschlagen"
      );
    }
  };

  return (
    <main className="register-page">
      <div className="register-container">

        <p className="register-small-title">
          Willkommen
        </p>

        <h1>Konto erstellen</h1>

        <p className="register-description">
          Erstellen Sie ein Konto, um Termine zu buchen
          und Ihre persönlichen Daten zu verwalten.
        </p>

        {error && (
          <p className="register-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              E-Mail-Adresse
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-Mail-Adresse"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Passwort
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Passwort"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Telefonnummer
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+49123456789"
              required
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
            className="register-button"
          >
            Konto erstellen
          </button>

        </form>

        <p className="login-link">
          Sie haben bereits ein Konto?{" "}
          <Link to="/login">
            Anmelden
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Register;