import { scrollToId } from "../utils/scroll";
import { useScrollReveal } from "../utils/useScrollReveal";
import { delay } from "../utils/animation";

function Home() {
  useScrollReveal();

  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <p className="hero-label fade-up" style={delay(0.1)}>
          BUILD YOUR PORTFOLIO
        </p>

        <h1 className="fade-up" style={delay(0.25)}>
          Create a portfolio
          <br />
          <span>without writing code.</span>
        </h1>

        <p className="hero-description fade-up" style={delay(0.4)}>
          Choose a beautiful template, add your details,
          preview your portfolio and download the complete
          source code — all in one place.
        </p>

        <div className="hero-buttons fade-up" style={delay(0.55)}>
          <button
            type="button"
            className="primary-button"
            onClick={() => scrollToId("templates")}
          >
            Explore Templates <span className="arrow">→</span>
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => scrollToId("how-it-works")}
          >
            How It Works
          </button>
        </div>
      </div>

      <div className="hero-preview fade-up" style={delay(0.45)} aria-hidden="true">
        {/* ...preview-window markup unchanged... */}
      </div>
    </section>
  );
}

export default Home;