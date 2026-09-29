import "./minimal.css";
import type { PortfolioData } from "../../types/portfolio";

interface Props {
  data: PortfolioData;
}

export default function MinimalTemplate({ data }: Props) {
  return (
    <div className="minimal-page">
      <header className="minimal-nav">
        <a className="minimal-logo" href="#top">{data.name || "Portfolio"}</a>
        <nav>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="minimal-hero">
  <div className="hero-copy">
    <p className="eyebrow">PORTFOLIO</p>
            <h1>
              {data.name || "Your Name"}
              <span>{data.role || "Your Role"}</span>
            </h1>
            <p className="hero-bio">
              {data.bio || "I create thoughtful digital experiences with a focus on simplicity, usability and clean code."}
            </p>
            <div className="hero-links">
              {data.social.github && <a href={data.social.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
              {data.social.linkedin && <a href={data.social.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
              {data.social.email && <a href={`mailto:${data.social.email}`}>Email ↗</a>}
            </div>
          </div>

          <div className="hero-image-wrap">
            {data.profileImage ? (
              <img src={data.profileImage} alt={data.name} />
            ) : (
              <div className="image-placeholder">
                {(data.name || "YN").slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </section>

        <section className="minimal-section" id="about">
          <div className="section-label">01 — ABOUT</div>
          <div className="section-content about-grid">
            <h2>A little about me.</h2>
            <div>
              <p>{data.bio || "Tell visitors a little about yourself."}</p>
              <div className="skill-list">
                {data.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="minimal-section" id="work">
          <div className="section-label">02 — SELECTED WORK</div>
          <div className="section-content project-list">
            {data.projects.length ? data.projects.map((project, index) => (
              <article className="project-row" key={`${project.title}-${index}`}>
                <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="project-main">
                  <div className="project-heading">
                    <h3>{project.title}</h3>
                    {project.link && <a href={project.link} target="_blank" rel="noreferrer">View project ↗</a>}
                  </div>
                  <p>{project.description}</p>
                  <div className="tech-list">
                    {project.technologies.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                </div>
              </article>
            )) : <p className="empty-state">Projects will appear here.</p>}
          </div>
        </section>

        {data.experience?.length ? (
          <section className="minimal-section">
            <div className="section-label">03 — EXPERIENCE</div>
            <div className="section-content experience-list">
              {data.experience.map((item, index) => (
                <article className="experience-row" key={`${item.company}-${index}`}>
                  <div>
                    <h3>{item.position}</h3>
                    <p>{item.company}</p>
                  </div>
                  <div>
                    <span className="duration">{item.duration}</span>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="minimal-contact" id="contact">
          <p className="eyebrow">LET'S CONNECT</p>
          <h2>Have a project<br />in mind?</h2>
          {data.social.email
            ? <a className="contact-email" href={`mailto:${data.social.email}`}>{data.social.email} ↗</a>
            : <span className="contact-email">Add your email</span>}
        </section>
      </main>

      <footer className="minimal-footer">
        <span>© {new Date().getFullYear()} {data.name || "Portfolio"}</span>
        <div>
          {data.social.github && <a href={data.social.github} target="_blank" rel="noreferrer">GitHub</a>}
          {data.social.linkedin && <a href={data.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
        </div>
      </footer>
    </div>
  );
}
