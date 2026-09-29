import "./modern.css";
import type { PortfolioData } from "../../types/portfolio";

interface Props {
  data: PortfolioData;
}

export default function ModernTemplate({ data }: Props) {
  return (
    <div className="modern-page">

      {/* NAVBAR */}
      <header className="modern-nav">
        <a href="#modern-home" className="modern-logo">
          {data.name || "Portfolio"}
        </a>

        <nav className="modern-nav-links">
          <a href="#modern-home">Home</a>
          <a href="#modern-about">About</a>
          <a href="#modern-projects">Projects</a>
          <a href="#modern-experience">Experience</a>
          <a href="#modern-contact">Contact</a>
        </nav>

        <a href="#modern-contact" className="modern-nav-button">
          Let's Talk
        </a>
      </header>

      <main>

        {/* HERO */}
        <section className="modern-hero" id="modern-home">
          <div className="modern-hero-content">

            <div className="modern-availability">
              <span className="modern-status-dot"></span>
              Available for opportunities
            </div>

            <p className="modern-eyebrow">
              HELLO, I'M
            </p>

            <h1>
              {data.name || "Your Name"}
            </h1>

            <h2>
              {data.role || "Your Role"}
            </h2>

            <p className="modern-hero-description">
              {data.bio ||
                "I build modern digital experiences and practical solutions with clean, thoughtful design."}
            </p>

            <div className="modern-hero-actions">
              <a href="#modern-projects" className="modern-primary-button">
                View My Work
              </a>

              {data.social.email && (
                <a
                  href={`mailto:${data.social.email}`}
                  className="modern-secondary-button"
                >
                  Contact Me
                </a>
              )}
            </div>

            <div className="modern-social-links">
              {data.social.github && (
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              )}

              {data.social.linkedin && (
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              )}

              {data.social.email && (
                <a href={`mailto:${data.social.email}`}>
                  Email ↗
                </a>
              )}
            </div>
          </div>

          <div className="modern-hero-visual">
            {data.profileImage ? (
              <div className="modern-image-frame">
                <img
                  src={data.profileImage}
                  alt={data.name}
                />
              </div>
            ) : (
              <div className="modern-image-placeholder">
                <span>
                  {(data.name || "YN")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
            )}

            <div className="modern-floating-card">
              <span>01</span>
              <p>Creative<br />Developer</p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          className="modern-section modern-about"
          id="modern-about"
        >
          <div className="modern-section-heading">
            <span>01</span>
            <p>ABOUT ME</p>
          </div>

          <div className="modern-about-content">

            <div className="modern-about-title">
              <h2>
                Building digital
                <span>experiences that matter.</span>
              </h2>
            </div>

            <div className="modern-about-text">
              <p>
                {data.bio ||
                  "Tell visitors about yourself, your interests and the type of work you enjoy creating."}
              </p>

              <div className="modern-skills">
                {data.skills.map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS */}
        <section
          className="modern-section modern-projects"
          id="modern-projects"
        >
          <div className="modern-section-heading">
            <span>02</span>
            <p>SELECTED PROJECTS</p>
          </div>

          <div className="modern-project-grid">

            {data.projects.length > 0 ? (
              data.projects.map((project, index) => (
                <article
                  className="modern-project-card"
                  key={`${project.title}-${index}`}
                >

                  <div className="modern-project-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="modern-project-content">

                    <div className="modern-project-top">
                      <span>PROJECT</span>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View ↗
                        </a>
                      )}
                    </div>

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {project.description}
                    </p>

                    <div className="modern-project-tech">
                      {project.technologies.map((technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>

                  </div>
                </article>
              ))
            ) : (
              <p className="modern-empty">
                Projects will appear here.
              </p>
            )}

          </div>
        </section>

        {/* EXPERIENCE */}
        {data.experience.length > 0 && (
          <section
            className="modern-section modern-experience"
            id="modern-experience"
          >
            <div className="modern-section-heading">
              <span>03</span>
              <p>EXPERIENCE</p>
            </div>

            <div className="modern-experience-list">

              {data.experience.map((item, index) => (
                <article
                  className="modern-experience-item"
                  key={`${item.company}-${index}`}
                >

                  <div className="modern-experience-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="modern-experience-main">
                    <div>
                      <h3>{item.position}</h3>
                      <p className="modern-company">
                        {item.company}
                      </p>
                    </div>

                    <span className="modern-duration">
                      {item.duration}
                    </span>

                    <p className="modern-experience-description">
                      {item.description}
                    </p>
                  </div>

                </article>
              ))}

            </div>
          </section>
        )}

        {/* EDUCATION */}
        {data.education.length > 0 && (
          <section className="modern-section modern-education">

            <div className="modern-section-heading">
              <span>04</span>
              <p>EDUCATION</p>
            </div>

            <div className="modern-education-list">

              {data.education.map((item, index) => (
                <article
                  className="modern-education-item"
                  key={`${item.institution}-${index}`}
                >

                  <div>
                    <h3>{item.degree}</h3>
                    <p>{item.institution}</p>
                  </div>

                  <span>{item.year}</span>

                </article>
              ))}

            </div>
          </section>
        )}

        {/* CONTACT */}
        <section
          className="modern-contact"
          id="modern-contact"
        >
          <div className="modern-contact-inner">

            <p className="modern-eyebrow">
              LET'S CONNECT
            </p>

            <h2>
              Have an idea?
              <span>Let's build it.</span>
            </h2>

            {data.social.email && (
              <a
                href={`mailto:${data.social.email}`}
                className="modern-contact-email"
              >
                {data.social.email} ↗
              </a>
            )}

            <div className="modern-contact-socials">

              {data.social.github && (
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {data.social.linkedin && (
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="modern-footer">

        <span>
          © {new Date().getFullYear()}{" "}
          {data.name || "Portfolio"}
        </span>

        <span>
          Built with FolioBuilder
        </span>

      </footer>

    </div>
  );
}