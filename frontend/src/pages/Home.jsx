
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
   <main className="home">
    <section className="hero">

        <div className="hero-content">
            <p className="welcome">Willkommen im</p>

            <h1>
                Schönheit, die
                <span> zu Ihnen passt.</span>
            </h1>

            <p className="subtitle">
                Lamis Beauty Center
            </p>

            <p className="description">
                Professionelle Beauty-Behandlungen in einer ruhigen
                und stilvollen Atmosphäre.
            </p>

            <div className="hero-buttons">
                <Link to="/services" className="primary-button">
                Behandlungen entdecken
                </Link>

                <Link to="/booking" className="secondary-button">
                Termin buchen
                </Link>
            </div>
        </div>

        <div className="hero-card">
          <p>Beauty & Aesthetics</p>
          <h2>Ihre Schönheit.<br />Unsere Leidenschaft.</h2>

          <div className="hero-line"></div>
          <span>Lamis Beauty Center</span>
        </div>

    </section>

    <section className="home-features">
        <div>
          <h3>Professionelle Behandlungen</h3>
          <p>Individuell auf Ihre Bedürfnisse abgestimmt.</p>
        </div>

        <div>
          <h3>Persönliche Beratung</h3>
          <p>Wir nehmen uns Zeit für Ihre Wünsche.</p>
        </div>

        <div>
         <h3>Entspannung & Pflege</h3>
         <p>Genießen Sie Ihre persönliche Beauty-Auszeit.</p>
        </div>
    </section>
</main>
  );
};

export default Home;


