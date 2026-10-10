
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./Register.css";
import useAutoDismiss from "../hooks/useAutoDismiss";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiCalendar
} from "react-icons/fi";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dataofBirth: ""
  });

  const [error, setError] = useState("");
  useAutoDismiss(error, setError);

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

        <div className="auth-hint">
          <strong>Hinweis:</strong>

          <p>
            Merken Sie sich bitte Ihre E-Mail-Adresse und Ihr Passwort.
          </p>

          <p>
            Diese Daten benötigen Sie anschließend für die Anmeldung.
          </p>

          <p>
            Nach Ablauf Ihrer Anmeldung können Sie sich jederzeit erneut mit denselben Daten einloggen.
          </p>
        </div>

        {error && (
          <p className="register-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-row">
            <label htmlFor="name">
              <FiUser className="form-icon" />
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
             placeholder="Vor- und Nachname"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">
              <FiMail className="form-icon" />
              E-Mail-Adresse
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">
              <FiLock className="form-icon" />
              Passwort
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mindestens 6 Zeichen"
              minLength={6}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="phone">
              <FiPhone className="form-icon" />
              Telefonnummer
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+49 123 456789"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="dataofBirth">
              <FiCalendar className="form-icon" />
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