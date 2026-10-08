import type { CSSProperties } from "react";
import { scrollToId } from "../utils/scroll";
import { useScrollReveal } from "../utils/useScrollReveal";

const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

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
            className="primary-button"
            onClick={() => scrollToId("templates")}
          >
            Explore Templates <span className="arrow">→</span>
          </button>

          <button
            className="secondary-button"
            onClick={() => scrollToId("how-it-works")}
          >
            How It Works
          </button>
        </div>
      </div>

      <div className="hero-preview fade-up" style={delay(0.45)}>
        <div className="preview-window">
          <div className="window-top">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="preview-content">
            <div className="preview-avatar"></div>
            <h2>Gurleen Singh</h2>
            <p>Full Stack Developer</p>
            <div className="preview-line"></div>
            <div className="preview-small-line"></div>
            <div className="preview-small-line"></div>
            <div className="preview-skills">
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;