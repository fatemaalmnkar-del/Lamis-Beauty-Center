import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGalleryImages } from "../services/galleryService";
import "./Gallery.css";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const data = await getGalleryImages();
        setGalleryImages(data.galleryImages);
      } catch (error) {
        console.error("Fehler beim Laden der Galerie:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  if (loading) {
    return <p className="gallery-loading">Galerie wird geladen...</p>;
  }

  return (
    <main className="gallery-page">

      <section className="gallery-hero">
        <p className="gallery-label">ECHTE ERGEBNISSE</p>

        <h1>Vorher & Nachher</h1>

        <p className="gallery-intro">
          Schönheit zeigt sich in den Details.
          Entdecken Sie ausgewählte Ergebnisse unserer Behandlungen
          und lassen Sie sich von unserer Arbeit inspirieren.
        </p>

        <div className="gallery-divider"></div>
      </section>

      <section className="gallery-section">
        {galleryImages.length === 0 ? (
          <p className="gallery-empty">
            Derzeit sind noch keine Bilder verfügbar.
          </p>
        ) : (
          <div className="gallery-grid">
            {galleryImages.map((galleryImage) => (
              <div className="gallery-item" key={galleryImage._id}>
                <img
                  src={galleryImage.image}
                  alt="Vorher und Nachher Ergebnis"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="gallery-cta">
        <p className="gallery-label">LAMIS BEAUTY CENTER</p>

        <h2>Ihre Schönheit. Unsere Leidenschaft.</h2>

        <p>
          Sie möchten Ihr persönliches Ergebnis erleben?
          Entdecken Sie unsere Behandlungen und vereinbaren Sie Ihren Termin.
        </p>

        <div className="gallery-actions">
          <Link to="/services" className="gallery-button">
            Behandlungen entdecken
          </Link>

          <Link to="/booking" className="gallery-button gallery-button-outline">
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