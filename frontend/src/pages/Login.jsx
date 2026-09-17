import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

        {error && (
        <p className="login-error">
            {error}
        </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">
              E-Mail-Adresse
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail-Adresse"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"> Passwort</label>

            <input type="password" id="password "value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort" required />
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