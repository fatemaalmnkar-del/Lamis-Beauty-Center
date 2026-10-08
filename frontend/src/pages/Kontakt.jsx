import {  useState } from "react";
import { useSelector } from "react-redux";
import './kontakt.css';
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";




function Kontakt() {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const name = user?.name || formData.name;
  const email = user?.email || formData.email;

  const whatsappMessage = `
Hallo Lamis Beauty Center,

Name: ${name}
E-Mail: ${email}
Telefon: ${formData.phone || "-"}
Betreff: ${formData.subject}

Nachricht:
${formData.message}
  `.trim();

  const whatsappNumber = "491629342752";

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  window.open(whatsappUrl, "_blank");
};

  return (
    <main className="kontakt-page">

      {/* HERO */}
      <section className="kontakt-hero">
        <p className="kontakt-label">LAMIS BEAUTY CENTER</p>
        <h1>Kontakt</h1>
        <p>
           Schönheit beginnt mit einem persönlichen Gespräch.
           Haben Sie Fragen zu unseren Behandlungen oder wünschen Sie eine persönliche Beratung?
           Wir sind gerne für Sie da und freuen uns auf Ihre Nachricht.
        </p>
        <div className="kontakt-divider"></div>
      </section>

      {/* KONTAKTINFORMATIONEN */}
      <section className="kontakt-info-section">
        <div className="kontakt-info-card">
          <FaMapMarkerAlt className="kontakt-icon" />
          <h3>Adresse</h3>
          <p>
            Pirmasenser Straße 24–26
            <br />
            67655 Kaiserslautern
          </p>
        </div>

        <div className="kontakt-info-card">
          <FaPhoneAlt className="kontakt-icon" />
          <h3>Telefon</h3>
          <a href="tel:+491629342752">
            0162 9342752
          </a>
        </div>

        <div className="kontakt-info-card">
          <FaEnvelope className="kontakt-icon" />
          <h3>E-Mail</h3>
          <a href="mailto:lamis25.01.1999@icloud.com">
            lamis25.01.1999@icloud.com
          </a>
        </div>

        <div className="kontakt-info-card">
          <FaClock className="kontakt-icon" />
          <h3>Öffnungszeiten</h3>
            <p>
              Montag – Samstag: 10:00 – 18:00
              <br />
              Sonntag: Geschlossen
           </p>
        </div>
      </section>

      {/* KONTAKTFORMULAR */}
      <section className="kontakt-form-section">

        <div className="kontakt-form-intro">
          <p className="kontakt-label">SCHREIBEN SIE UNS</p>
          <h2>Wie können wir Ihnen helfen?</h2>

          <p>
           Schreiben Sie uns Ihr Anliegen – wir nehmen uns gerne Zeit für Sie
           und melden uns so schnell wie möglich zurück.
          </p>
        </div>

        <form className="kontakt-form" onSubmit={handleSubmit}>

          <div className="kontakt-form-row">

            <div className="kontakt-form-group">
              <label htmlFor="name">Name </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user ? user.name || "" : formData.name}
                onChange={handleChange}
                placeholder="Ihr Name"
                readOnly={!!user}
                required
              />
            </div>

            <div className="kontakt-form-group">
              <label htmlFor="email">E-Mail </label>
              <input
                type="email"
                id="email"
                name="email"
                 value={user ? user.email || "" : formData.email}
                onChange={handleChange}
                placeholder="Ihre E-Mail-Adresse"
                readOnly={!!user}
                required
              />
            </div>

          </div>

          <div className="kontakt-form-row">

            <div className="kontakt-form-group">
              <label htmlFor="phone">Telefon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ihre Telefonnummer"
              />
            </div>

            <div className="kontakt-form-group">
              <label htmlFor="subject">Betreff </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Worum geht es?"
                required
              />
            </div>

          </div>

          <div className="kontakt-form-group">
            <label htmlFor="message">Nachricht </label>

            <textarea
              id="message"
              name="message"
              rows="7"
              value={formData.message}
              onChange={handleChange}
              placeholder="Schreiben Sie hier Ihre Nachricht..."
              required
            ></textarea>
          </div>

    
          <button
            type="submit"
            className="kontakt-submit-button"
          >
              Nachricht über WhatsApp senden
          </button>

        </form>
      </section>

      {/* STANDORT */}
      <section className="kontakt-location">

        <div className="kontakt-location-heading">
          <p className="kontakt-label">UNSER STANDORT</p>
          <h2>Besuchen Sie uns</h2>

          <p>
             Wir freuen uns darauf, Sie persönlich bei uns im
             Lamis Beauty Center begrüßen zu dürfen.
          </p>
        </div>

        <div className="kontakt-map">
          <iframe
            title="Lamis Beauty Center Standort"
            src="https://www.google.com/maps?q=Pirmasenser+Straße+24-26,+67655+Kaiserslautern&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </section>

      {/* TERMIN CTA */}
      <section className="kontakt-booking">

        <p className="kontakt-label">IHR BEAUTY-MOMENT</p>

        <h2>Bereit für Ihre persönliche Auszeit?</h2>

        <p>
          Entdecken Sie unsere Behandlungen und gönnen Sie sich
          Ihren persönlichen Beauty-Moment.
        </p>

        <Link
          to="/booking"
          className="kontakt-booking-button"
        >
          Termin buchen
        </Link>

      </section>

    </main>
  );
}

export default Kontakt;