import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";
import useAutoDismiss from "../hooks/useAutoDismiss";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useAutoDismiss(error, setError);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await loginUser({
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
       dispatch(
       loginSuccess({
      user: response.data.user,
      token: response.data.token
      })
     );

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Anmeldung fehlgeschlagen"
      );
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <p className="login-small-title">
        Willkommen zurück</p>

        <h1>Anmelden</h1>

        <p className="login-description">
        Melden Sie sich an, um Ihre Termine und
        persönlichen Daten zu verwalten.
        </p>
        <div className="auth-hint">
          <strong>Hinweis:</strong>

          <p>
            Falls Sie noch kein Konto haben, registrieren Sie sich bitte zuerst.
          </p>

          <p>
            Verwenden Sie danach dieselbe E-Mail-Adresse und dasselbe Passwort für die Anmeldung.
          </p>

          <p>
            Aus Sicherheitsgründen kann Ihre Anmeldung nach einiger Zeit ablaufen.
            Melden Sie sich dann einfach erneut an, um Ihre Termine und Ihr Profil weiterhin sehen zu können.
          </p>
        </div>

        {error && (
        <p className="login-error">
            {error}
        </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-row">
            <label htmlFor="email">
              <FiMail className="form-icon" />
              E-Mail-Adresse
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">
              <FiLock className="form-icon" />
              Passwort
            </label>

            <input type="password" id="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort" required />
          </div>

         <button type="submit" className="login-button"> Anmelden</button>

        </form>

        <p className="register-link">
        Noch kein Konto?{" "}
        <Link to="/register">
          Jetzt registrieren
        </Link>
        </p>
      </div>

    </main>
  );
};

export default Login;