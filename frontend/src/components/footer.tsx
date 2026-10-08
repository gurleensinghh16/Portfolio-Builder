
import { Link } from "react-router-dom";
import { scrollToId } from "../utils/scroll";
import { delay } from "../utils/animation";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Call to action */}
      <div className="footer-cta reveal">
        <div>
          <h3>Ready to build your portfolio?</h3>
          <p>Pick a template and have it live in minutes.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => scrollToId("templates")}
        >
          Browse Templates <span className="arrow">→</span>
        </button>
      </div>

      {/* Main columns */}
      <div className="footer-main">
        <div className="footer-brand reveal" style={delay(0.1)}>
          <div className="logo">
            Folio<span>Builder</span>
          </div>

          <p>Build your portfolio without writing it from scratch.</p>

          <div className="footer-socials">
            <a href="https://github.com/your-username" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>

            <a href="https://linkedin.com/in/your-username" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>

            <a href="mailto:you@example.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col reveal" style={delay(0.2)}>
          <h4>Explore</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#templates">Templates</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="footer-col reveal" style={delay(0.3)}>
          <h4>Templates</h4>
          <Link to="/create?template=modern">Modern</Link>
          <Link to="/create?template=developer">Developer</Link>
          <Link to="/create?template=minimal">Minimal</Link>
        </div>

        <div className="footer-col reveal" style={delay(0.4)}>
          <h4>What you get</h4>
          <span>No coding needed</span>
          <span>Live preview</span>
          <span>Full source code</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {year} FolioBuilder. Built for students.</p>

        <button
          className="back-to-top"
          onClick={() => scrollToId("home")}
          aria-label="Back to top"
        >
          Back to top <span>↑</span>
        </button>
      </div>

      <div className="footer-watermark" aria-hidden="true">
        FolioBuilder
      </div>
    </footer>
  );
}

export default Footer;