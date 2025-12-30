import { Link } from "react-router-dom";
import "../styles/home.css";

export default function HomePage() {
  return (
    <div className="home-container">

      {/* HERO */}
      <header className="hero">
        <h1>🌍 Smart Research Assistant</h1>
        <p>
          Explore earthquakes and oceans — visualize patterns, detect anomalies,
          and uncover powerful insights instantly.
        </p>
      </header>

      {/* FEATURE CARDS */}
      <section className="cards">

        <div className="card fade-up">
          <h3>📊 Earthquake Dashboard</h3>
          <p>
            Analyze global earthquake records, visualize frequency & magnitude
            trends across years.
          </p>

          <Link to="/earthquake-dashboard" className="btn">
            Open Dashboard →
          </Link>
        </div>

        <div className="card fade-up">
          <h3>🌊 Ocean Dashboard</h3>
          <p>
            Monitor changing ocean temperatures and detect unusual variations.
          </p>

          <Link to="/ocean" className="btn">
            Explore Oceans →
          </Link>
        </div>

        <div className="card fade-up">
          <h3>🤖 AI Research Assistant</h3>
          <p>
            Ask questions — get AI-powered explanations from your datasets.
          </p>

          <Link to="/ai" className="btn">
            Chat with AI →
          </Link>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        Built for researchers, students and innovators 🚀
      </footer>
    </div>
  );
}