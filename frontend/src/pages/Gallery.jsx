import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";

import { getGalleryImages } from "../services/galleryService";

import "react-image-gallery/styles/image-gallery.css";
import "./Gallery.css";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const data = await getGalleryImages();

        setGalleryImages(data.galleryImages || []);
      } catch (error) {
        console.error("Fehler beim Laden der Galerie:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  /*
    كل صورتين يصيروا زوج:
    الصورة الأولى = Vorher
    الصورة الثانية = Nachher
  */

  const imagePairs = [];

  for (let i = 0; i < galleryImages.length; i += 2) {
    imagePairs.push({
      before: galleryImages[i],
      after: galleryImages[i + 1] || null,
    });
  }

  const images = imagePairs.map((pair) => ({
    original: pair.before.image,
    thumbnail: pair.before.image,

    renderItem: () => (
      <div className="before-after-slide">

        <div className="before-after-image">
          <img
            src={pair.before.image}
            alt="Vorher"
          />

          <span className="before-after-label">
            Vorher
          </span>
        </div>

        {pair.after && (
          <div className="before-after-image">
            <img
              src={pair.after.image}
              alt="Nachher"
            />

            <span className="before-after-label">
              Nachher
            </span>
          </div>
        )}

      </div>
    ),
  }));

  if (loading) {
    return (
      <p className="gallery-loading">
        Galerie wird geladen...
      </p>
    );
  }

  return (
    <main className="gallery-page">

      {/* ===== Hero ===== */}

      <section className="gallery-hero">

        <p className="gallery-label">
          ECHTE ERGEBNISSE
        </p>

        <h1>
          Vorher & Nachher
        </h1>

        <p className="gallery-intro">
          Schönheit zeigt sich in den Details.
          Entdecken Sie ausgewählte Ergebnisse unserer Behandlungen
          und lassen Sie sich von unserer Arbeit inspirieren.
        </p>

        <div className="gallery-divider"></div>

      </section>


      {/* ===== Gallery ===== */}

      <section className="gallery-section">

        {galleryImages.length === 0 ? (

          <p className="gallery-empty">
            Derzeit sind noch keine Bilder verfügbar.
          </p>

        ) : (

          <div className="gallery-slider">

            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={true}
              showNav={true}
              slideDuration={400}
            />

          </div>

        )}

      </section>


      {/* ===== CTA ===== */}

      <section className="gallery-cta">

        <p className="gallery-label">
          LAMIS BEAUTY CENTER
        </p>

        <h2>
          Ihre Schönheit. Unsere Leidenschaft.
        </h2>

        <p>
          Sie möchten Ihr persönliches Ergebnis erleben?
          Entdecken Sie unsere Behandlungen und vereinbaren Sie Ihren Termin.
        </p>

        <div className="gallery-actions">

          <Link
            to="/services"
            className="gallery-button"
          >
            Behandlungen entdecken
          </Link>

          <Link
            to="/booking"
            className="gallery-button gallery-button-outline"
          >
            Termin buchen
          </Link>

        </div>

        <p className="gallery-note">
          Hinweis: Die dargestellten Ergebnisse sind individuell.
          Behandlungsergebnisse können von Person zu Person variieren.
        </p>

      </section>

    </main>
  );
}

export default Gallery;