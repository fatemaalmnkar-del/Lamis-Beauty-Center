import "./Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getServices } from "../services/serviceService";
import {
  getAllReviews,
  createReview,
  deleteReview
} from "../services/reviewService";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth.user);

  /* =========================
     REVIEWS
  ========================= */

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data.reviews);
      } catch (error) {
        console.error("Fehler beim Laden der Bewertungen:", error);
      }
    };

    fetchReviews();
  }, []);

  /* =========================
     SERVICES
  ========================= */

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        console.error(
          "Fehler beim Laden der Dienstleistungen:",
          error
        );
      }
    };

    fetchServices();
  }, []);

  /* =========================
     CREATE REVIEW
  ========================= */

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const reviewData = {
        rating,
        comment
      };

      if (selectedService) {
        reviewData.service = selectedService;
      }

      const data = await createReview(reviewData);

      setReviews((prev) => [
        data.review,
        ...prev
      ]);

      setComment("");
      setRating(0);
      setSelectedService("");
      setShowReviewForm(false);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Die Bewertung konnte nicht gespeichert werden."
      );
    }
  };

  /* =========================
     DELETE REVIEW
  ========================= */

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);

      setReviews((prev) =>
        prev.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Die Bewertung konnte nicht gelöscht werden."
      );
    }
  };

  return (
    <main>
      {/* =========================
          HERO
      ========================= */}

      <section className="home-hero">
        <img
          src="/images/hero.png"
          alt="Natürliche Schönheit"
          className="home-hero-image"
        />

        <div className="home-hero-overlay"></div>

        <div className="home-hero-content">
          <p className="hero-label">
            LAMIS KOSMETIK AKADEMIE
          </p>

          <h1>
            Ihre natürliche Schönheit
            <br />
            im Mittelpunkt.
          </h1>

          <p className="hero-description">
            Professionelle Kosmetik, moderne Behandlungen und persönliche
            Betreuung.
          </p>

          <div className="hero-actions">
            <Link
              to="/services"
              className="hero-btn hero-btn-primary"
            >
              Behandlungen entdecken
            </Link>

            <Link
              to="/booking"
              className="hero-btn hero-btn-secondary"
            >
              Termin buchen
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          WELCOME
      ========================= */}

      <section className="welcome-section">
        <div className="welcome-content">
          <p className="section-label">
            WILLKOMMEN BEI LAMIS KOSMETIK AKADEMIE
          </p>

          <h2>
            Schönheit trifft auf <span>Fachwissen.</span>
          </h2>

          <p className="welcome-description">
            Bei uns stehen Ihre Haut, Ihre Wünsche und Ihr Wohlbefinden im Mittelpunkt.
            Mit moderner Kosmetik und persönlicher Beratung schaffen wir Ergebnisse,
            die natürlich wirken und zu Ihnen passen.
          </p>

          <div className="welcome-features">
            <span>Persönliche Beratung</span>
            <span>Moderne Behandlungen</span>
            <span>Qualität & Vertrauen</span>
          </div>

          <a href="/about" className="welcome-link">
            Mehr über uns →
          </a>
        </div>
      </section>

      {/* =========================
          TREATMENTS
      ========================= */}

      <section className="treatments-section">
        <div className="treatments-header">
          <p className="section-label">
            UNSERE BEHANDLUNGEN
          </p>

          <h2>
            Moderne Pflege. <span>Sichtbare Ergebnisse.</span>
          </h2>

          <p>
            Entdecken Sie ausgewählte Behandlungen für gepflegte, gesunde und
            strahlende Haut.
          </p>
        </div>

        <div className="treatments-grid">
          <div className="treatment-card">
            <img
              src="/images/hydrafacial.jpg"
              alt="Hydrafacial"
            />

            <div className="treatment-card-content">
              <h3>Hydrafacial</h3>

              <p>
                Intensive Reinigung, Pflege und Feuchtigkeit für ein frisches
                Hautbild.
              </p>

              <a href="/services">
                Mehr erfahren →
              </a>
            </div>
          </div>

          <div className="treatment-card">
            <img
              src="/images/microneedling.jpg"
              alt="Microneedling"
            />

            <div className="treatment-card-content">
              <h3>Microneedling</h3>

              <p>
                Unterstützt die Hautregeneration und fördert ein ebenmäßiges
                Erscheinungsbild.
              </p>

              <a href="/services">
                Mehr erfahren →
              </a>
            </div>
          </div>

          <div className="treatment-card">
            <img
              src="/images/laser.jpg"
              alt="Laserbehandlung"
            />

            <div className="treatment-card-content">
              <h3>Laserbehandlungen</h3>

              <p>
                Moderne Technologie für gezielte und professionelle
                Hautbehandlungen.
              </p>

              <a href="/services">
                Mehr erfahren →
              </a>
            </div>
          </div>

          <div className="treatment-card">
            <img
              src="/images/microdermabrasion.jpg"
              alt="Microdermabrasion"
            />

            <div className="treatment-card-content">
              <h3>Microdermabrasion</h3>

              <p>
                Sanfte Hauterneuerung für ein glatteres und gepflegtes Hautgefühl.
              </p>

              <a href="/services">
                Mehr erfahren →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          RESULTS
      ========================= */}

      <section className="results-section">
        <div className="results-header">
          <p className="section-label">
            ERGEBNISSE
          </p>

          <h2>
            Ergebnisse, die <span>für sich sprechen.</span>
          </h2>

          <p>
            Entdecken Sie ausgewählte Behandlungsergebnisse und überzeugen Sie sich
            selbst.
          </p>
        </div>

        <div className="results-grid">
          <div className="result-card">
            <div className="result-images">
              <div>
                <img
                  src="/images/vorher1.jpg"
                  alt="Vorher"
                />
                <span>Vorher</span>
              </div>

              <div>
                <img
                  src="/images/nachher1.jpg"
                  alt="Nachher"
                />
                <span>Nachher</span>
              </div>
            </div>
          </div>

          <div className="result-card">
            <div className="result-images">
              <div>
                <img
                  src="/images/vorher2.jpg"
                  alt="Vorher"
                />
                <span>Vorher</span>
              </div>

              <div>
                <img
                  src="/images/nachher2.jpg"
                  alt="Nachher"
                />
                <span>Nachher</span>
              </div>
            </div>
          </div>

          <div className="result-card">
            <div className="result-images">
              <div>
                <img
                  src="/images/vorher3.jpg"
                  alt="Vorher"
                />
                <span>Vorher</span>
              </div>

              <div>
                <img
                  src="/images/nachher3.jpg"
                  alt="Nachher"
                />
                <span>Nachher</span>
              </div>
            </div>
          </div>
        </div>

        <a
          href="/gallery"
          className="results-link"
        >
          Mehr Ergebnisse ansehen →
        </a>
      </section>

      {/* =========================
          REVIEWS
      ========================= */}

      <section className="reviews-section">
        <div className="reviews-header">
          <p className="section-label">
            KUNDENSTIMMEN
          </p>

          <h2>
            Was unsere Kundinnen <span>sagen.</span>
          </h2>

          <p>
            Echte Erfahrungen und Bewertungen unserer Kundinnen.
          </p>
        </div>

        {token ? (
          <button
            className="review-button"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            Bewertung schreiben
          </button>
        ) : (
          <p className="review-login-info">
            Melden Sie sich an, um eine Bewertung zu schreiben.
          </p>
        )}

        {showReviewForm && (
          <form
            className="review-form"
            onSubmit={handleReviewSubmit}
          >
            <div className="rating-select">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating
                      ? "star active"
                      : "star"
                  }
                >
                  ★
                </button>
              ))}
            </div>

            <select
              value={selectedService}
              onChange={(e) =>
                setSelectedService(e.target.value)
              }
              className="review-service-select"
            >
              <option value="">
                Allgemeine Bewertung
              </option>

              {services.map((service) => (
                <option
                  key={service._id}
                  value={service._id}
                >
                  {service.title}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Schreiben Sie Ihre Erfahrung..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              required
            />

            <button
              type="submit"
              className="review-submit"
            >
              Bewertung senden
            </button>
          </form>
        )}

        <div className="reviews-grid">
          {reviews.length > 0 ? (
            reviews
              .slice(0, 3)
              .map((review) => (
                <div
                  className="review-card"
                  key={review._id}
                >
                  <h4 className="review-user">
                    {review.user?.name || "Kundin"}
                  </h4>

                  <p className="review-service">
                    {review.service?.title ||
                      "Allgemeine Bewertung"}
                  </p>

                  <p className="review-comment">
                    „{review.comment}“
                  </p>

                  <div className="review-stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>

                  {user &&
                    (
                      user._id === review.user?._id ||
                      user.id === review.user?._id ||
                      user.role === "admin"
                    ) && (
                      <button
                        className="delete-review-btn"
                        onClick={() =>
                          handleDeleteReview(review._id)
                        }
                      >
                        Löschen
                      </button>
                    )}
                </div>
              ))
          ) : (
            <p className="no-reviews">
              Noch keine Bewertungen vorhanden.
            </p>
          )}

          <a
            href="/reviews"
            className="all-reviews-link"
          >
            Alle Bewertungen ansehen →
          </a>
        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}

      <section className="home-cta">
        <div className="home-cta-content">
          <p className="section-label">
            IHR TERMIN
          </p>

          <h2>
            Bereit für Ihre <span>Behandlung?</span>
          </h2>

          <p>
            Vereinbaren Sie jetzt Ihren persönlichen Termin und lassen Sie sich
            individuell beraten.
          </p>

          <div className="home-cta-buttons">
            <a
              href="/booking"
              className="cta-primary"
            >
              Termin buchen
            </a>

            <a
              href="/Kontakt"
              className="cta-secondary"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;