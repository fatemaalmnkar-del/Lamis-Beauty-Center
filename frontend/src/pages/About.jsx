import "./About.css";

import { Link } from "react-router-dom";
import {
  FiAward,
  FiSettings,
  FiBookOpen,
  FiUsers,
  FiMapPin,
  FiClock
} from "react-icons/fi";

const About = () => {
  return (
    <main className="about-page">
      {/* =========================
          HERO
      ========================= */}

      <section className="about-hero">
        <img
          src="/images/lamis.png"
          alt="Lamis - Fachkosmetikerin"
          className="about-hero-image"
        />

        <div className="about-hero-content">
          <p className="section-label">
            SCHÖNHEIT · EXPERTISE · AUSBILDUNG · VERTRAUEN
          </p>

          <h1>Über uns</h1>

          <h2>Lamis Kosmetik Akademie</h2>

          <p className="about-quote">
            Schönheit mit Wissen, Erfahrung und Leidenschaft.
          </p>

          <p className="about-intro">
            Professionelle Kosmetik und hochwertige Ausbildungen in
            Kaiserslautern.
          </p>

          <p className="about-owner">
            Geleitet von <strong>Lamis Almnkar </strong>
            Fachkosmetikerin und Fachdozentin mit Leidenschaft für Qualität
            und Ästhetik.
          </p>

          <br />

          <p className="about-description">
            Wir verbinden modernste Technologie mit fundiertem Fachwissen,
            um Ihre natürliche Schönheit zu unterstreichen und dabei auf
            höchste Qualität, Sicherheit und individuelle Beratung zu setzen.
          </p>
        </div>
      </section>

      {/* =========================
          ÜBER LAMIS
      ========================= */}

      <section className="about-lamis-info">
        <div className="about-lamis-text">
          <p className="section-label">
            ÜBER LAMIS
          </p>

          <h2>
            Fachwissen. Erfahrung. <span>Leidenschaft.</span>
          </h2>

          <p>
            Lamis ist Fachkosmetikerin mit über fünf Jahren Berufserfahrung
            im Bereich Kosmetik und Hautpflege.
          </p>

          <p>
            Sie arbeitet mit modernen Geräten, bildet sich regelmäßig weiter
            und verfügt über eine NiSV-Zertifizierung sowie ein
            PFD-Zertifikat. Außerdem ist sie als Fachdozentin tätig und bietet
            professionelle Schulungen im Bereich Kosmetik an.
          </p>
        </div>

        <div className="about-qualifications">
          <div className="qualification-card">
            <div className="qualification-icon">
              <FiAward />
            </div>

            <h3>5 Jahre Erfahrung</h3>

            <p>
              Fundiertes Fachwissen und praktische Erfahrung.
            </p>
          </div>

          <div className="qualification-card">
            <div className="qualification-icon">
              <FiSettings />
            </div>

            <h3>Moderne Geräte</h3>

            <p>
              Professionelle Technik für hochwertige Behandlungen.
            </p>
          </div>

          <div className="qualification-card">
            <div className="qualification-icon">
              <FiBookOpen />
            </div>

            <h3>NiSV-Zertifizierung</h3>

            <p>
              Zertifizierte Fachkenntnisse im Bereich NiSV.
            </p>
          </div>

          <div className="qualification-card">
            <div className="qualification-icon">
              <FiUsers />
            </div>

            <h3>Fachdozentin</h3>

            <p>
              Fachwissen, Schulungen und praxisnahe Weiterbildung.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          STUDIO
      ========================= */}

      <section className="about-studio">
        <div className="about-studio-header">
          <div>
            <p className="section-label">
              UNSERE RÄUMLICHKEITEN
            </p>

            <h2>
              Modern. Stilvoll. <span>Zum Wohlfühlen.</span>
            </h2>

            <p>
              Entdecken Sie unsere stilvoll eingerichteten Räumlichkeiten,
              moderne Behandlungsbereiche und eine angenehme Atmosphäre,
              in der Sie sich rundum wohlfühlen können.
            </p>
          </div>
        </div>

        <div className="studio-gallery">
          <div className="studio-item">
            <img
              src="/images/reception.jpg"
              alt="Empfangsbereich"
            />

            <p>Empfangsbereich</p>
          </div>

          <div className="studio-item">
            <img
              src="/images/treatment.jpg"
              alt="Behandlungsbereich"
            />

            <p>Behandlungsbereich</p>
          </div>

          <div className="studio-item">
            <img
              src="/images/Wartebereich.jpg"
              alt="Wartebereich"
            />

            <p>Wartebereich</p>
          </div>

          <div className="studio-item">
            <img
              src="/images/bebe.jpg"
              alt="Wartebereich"
            />

            <p>Behandlungsraum</p>
          </div>

          <div className="studio-item">
            <img
              src="/images/lll.jpg"
              alt="Wartebereich"
            />

            <p>Unser Studio</p>
          </div>

          <div className="studio-item">
            <img
              src="/images/behandlungsbereich.jpg"
              alt="Behandlungsraum"
            />

            <p>Behandlungsraum</p>
          </div>
        </div>
      </section>

      {/* =========================
          CERTIFICATES
      ========================= */}

      <section className="certificates-section">
        <div className="certificates-left">
          <img
            src="/images/certificates.jpg"
            alt="Zertifikate"
          />
        </div>

        <div
          className="certificates-right"
          style={{
            backgroundImage: "url('/images/certificat.jpg')"
          }}
        >
          <div className="certificates-text">
            <p className="certificates-label">
              ZERTIFIKATE & QUALIFIKATIONEN
            </p>

            <h2 className="certificates-title">
              Qualität durch <span>Wissen.</span>
            </h2>

            <p className="certificates-description">
              Kontinuierliche Weiterbildung und zahlreiche Zertifizierungen
              bilden die Grundlage für höchste Qualität und professionelle
              Behandlungen. Hier finden Sie eine Auswahl meiner wichtigsten
              Qualifikationen und Schwerpunkte.
            </p>

            <div className="certificates-list">
              <p>Fachkosmetik</p>
              <p>Fachdozentin</p>
              <p>Hydrafacial</p>
              <p>Microneedling</p>
              <p>Microdermabrasion</p>
              <p>Laserbehandlungen</p>
              <p>Mesotherapie im Augenbereich</p>
              <p>Haarmesotherapie</p>
              <p>Kollagen-Faden-Lifting</p>
              <p>Chemisches Peeling</p>
              <p>DÉCAAR – CO₂ Revelation / Algenpeeling & Deep Phyto</p>
              <p>Lashlifting & Browlifting</p>
              <p>Microblading</p>
              <p>Powder Brows</p>
              <p>Plasma Pen</p>
              <p>International Certificate / IAPC</p>
            </div>

            <p className="certificates-more">
              Weitere Zertifikate und Fortbildungen vorhanden.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          MISSION
      ========================= */}

      <section className="about-mission">
        <p className="section-label">
          UNSERE MISSION
        </p>

        <h2>
          Schönheit. Wissen. <span>Qualität.</span>
        </h2>

        <p className="mission-description">
          Unser Ziel ist es, moderne Kosmetik, fundiertes Fachwissen und
          individuelle Betreuung miteinander zu verbinden. Dabei stehen
          Qualität, Sicherheit und kontinuierliche Weiterbildung im
          Mittelpunkt.
        </p>

        <div className="mission-points">
          <div className="mission-card">
            <div className="mission-icon">
              ✦
            </div>

            <h3>Persönliche Beratung</h3>

            <p>
              Individuelle Betreuung und persönliche Beratung für jede Kundin.
            </p>
          </div>

          <div className="mission-card">
            <div className="mission-icon">
              ✧
            </div>

            <h3>Moderne Technologien</h3>

            <p>
              Hochwertige Geräte und moderne Methoden für professionelle
              Behandlungen.
            </p>
          </div>

          <div className="mission-card">
            <div className="mission-icon">
              ✦
            </div>

            <h3>Kontinuierliche Weiterbildung</h3>

            <p>
              Regelmäßige Schulungen und aktuelles Fachwissen auf hohem
              Niveau.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          VISIT
      ========================= */}

      <section className="visit-section">
        <div className="visit-content">
          <p className="section-label">
            BESUCHEN SIE UNS
          </p>

          <h2>
            Besuchen Sie <span>uns.</span>
          </h2>

          <p className="visit-description">
            Die Lamis Kosmetik Akademie ist bequem erreichbar. Wir freuen uns
            darauf, Sie persönlich bei uns begrüßen zu dürfen.
          </p>

          <div className="visit-details">
            <div className="visit-detail">
              <span className="visit-icon">
                <FiMapPin />
              </span>

              <div>
                <strong>
                  Lamis Kosmetik Akademie
                </strong>

                <p>
                  <span style={{ color: "#8B6F47" }}>
                    Pirmasenser Str. 24 - 26, 67655 Kaiserslautern
                  </span>
                </p>
              </div>
            </div>

            <div className="visit-detail">
              <span className="visit-icon">
                <FiClock />
              </span>

              <div>
                <strong>
                  Öffnungszeiten
                </strong>

                <p style={{ color: "#8B6F47" }}>
                  Mo – Sa: 10:30 – 18:00 Uhr
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/booking"
            className="visit-button"
          >
            Termin buchen
          </Link>
        </div>

        <div className="visit-image">
          <img
            src="/images/studio.jpg"
            alt="Lamis Kosmetik Akademie"
          />
        </div>
      </section>
    </main>
  );
};

export default About;