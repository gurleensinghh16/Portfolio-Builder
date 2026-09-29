import "./developer.css";
import type { PortfolioData } from "../../types/portfolio";

interface Props {
  data: PortfolioData;
}

export default function DeveloperTemplate({ data }: Props) {
  return (
    <div className="developer-page">

      {/* NAVBAR */}
      <header className="developer-nav">

        <a href="#dev-home" className="developer-logo">
          <span>&lt;</span>
          {data.name || "developer"}
          <span>/&gt;</span>
        </a>

        <nav>
          <a href="#dev-about">About</a>
          <a href="#dev-projects">Projects</a>
          <a href="#dev-experience">Experience</a>
          <a href="#dev-contact">Contact</a>
        </nav>

        <a
          href={data.social.github || "#"}
          target="_blank"
          rel="noreferrer"
          className="developer-github"
        >
          GitHub ↗
        </a>

      </header>

      <main>

        {/* TERMINAL HERO */}
        <section
          className="developer-hero"
          id="dev-home"
        >

          <div className="developer-terminal">

            <div className="terminal-header">
              <div className="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span className="terminal-title">
                ~/portfolio
              </span>
            </div>

            <div className="terminal-body">

              <p className="terminal-line">
                <span className="terminal-symbol">$</span>{" "}
                whoami
              </p>

              <h1>
                {data.name || "Your Name"}
              </h1>

              <p className="terminal-role">
                <span>&gt;</span>{" "}
                {data.role || "Developer"}
              </p>

              <p className="terminal-command">
                <span className="terminal-symbol">$</span>{" "}
                cat about.txt
              </p>

              <p className="terminal-description">
                {data.bio ||
                  "Developer building useful digital products."}
              </p>

              <div className="terminal-actions">

                <a href="#dev-projects">
                  ./view-projects
                </a>

                {data.social.email && (
                  <a href={`mailto:${data.social.email}`}>
                    ./contact
                  </a>
                )}

              </div>

            </div>

          </div>

          <div className="developer-code-preview">

            <div className="code-line">
              <span>01</span>
              <span>
                <b>const</b> developer = {"{"}
              </span>
            </div>

            <div className="code-line indent">
              <span>02</span>
              <span>
                name: <em>"{data.name || "Your Name"}"</em>,
              </span>
            </div>

            <div className="code-line indent">
              <span>03</span>
              <span>
                role: <em>"{data.role || "Developer"}"</em>,
              </span>
            </div>

            <div className="code-line indent">
              <span>04</span>
              <span>
                skills: [
              </span>
            </div>

            {data.skills.slice(0, 5).map((skill, index) => (
              <div
                className="code-line double-indent"
                key={skill}
              >
                <span>{String(index + 5).padStart(2, "0")}</span>
                <span>
                  <em>"{skill}"</em>
                  {index < Math.min(data.skills.length, 5) - 1
                    ? ","
                    : ""}
                </span>
              </div>
            ))}

            <div className="code-line indent">
              <span>10</span>
              <span>]</span>
            </div>

            <div className="code-line">
              <span>11</span>
              <span>{"}"}</span>
            </div>

          </div>

        </section>

        {/* ABOUT */}
        <section
          className="developer-section"
          id="dev-about"
        >

          <div className="developer-section-title">
            <span>01.</span>
            <h2>about_me()</h2>
          </div>

          <div className="developer-about-grid">

            <div className="developer-about-text">

              <p className="developer-comment">
                // A little about me
              </p>

              <p>
                {data.bio ||
                  "Write something about yourself."}
              </p>

            </div>

            <div className="developer-skills">

              <p className="developer-comment">
                // tech_stack
              </p>

              <div className="developer-skill-grid">

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
          className="developer-section"
          id="dev-projects"
        >

          <div className="developer-section-title">
            <span>02.</span>
            <h2>projects()</h2>
          </div>

          <div className="developer-projects">

            {data.projects.length > 0 ? (
              data.projects.map((project, index) => (
                <article
                  className="developer-project"
                  key={`${project.title}-${index}`}
                >

                  <div className="developer-project-header">

                    <span>
                      project_{String(index + 1).padStart(2, "0")}
                    </span>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        [ open ↗ ]
                      </a>
                    )}

                  </div>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  <div className="developer-tech">

                    {project.technologies.map((technology) => (
                      <span key={technology}>
                        {technology}
                      </span>
                    ))}

                  </div>

                </article>
              ))
            ) : (
              <p className="developer-empty">
                // no_projects_found
              </p>
            )}

          </div>

        </section>

        {/* EXPERIENCE */}
        {data.experience.length > 0 && (
          <section
            className="developer-section"
            id="dev-experience"
          >

            <div className="developer-section-title">
              <span>03.</span>
              <h2>experience()</h2>
            </div>

            <div className="developer-experience">

              {data.experience.map((item, index) => (
                <article
                  className="developer-experience-item"
                  key={`${item.company}-${index}`}
                >

                  <div className="developer-experience-meta">
                    <span>
                      0{index + 1}
                    </span>

                    <span>
                      {item.duration}
                    </span>
                  </div>

                  <div>
                    <h3>
                      {item.position}
                    </h3>

                    <p className="developer-company">
                      @ {item.company}
                    </p>

                    <p>
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
          <section className="developer-section">

            <div className="developer-section-title">
              <span>04.</span>
              <h2>education()</h2>
            </div>

            <div className="developer-education">

              {data.education.map((item, index) => (
                <article
                  key={`${item.institution}-${index}`}
                  className="developer-education-item"
                >

                  <span>
                    0{index + 1}
                  </span>

                  <div>
                    <h3>{item.degree}</h3>
                    <p>{item.institution}</p>
                  </div>

                  <strong>
                    {item.year}
                  </strong>

                </article>
              ))}

            </div>

          </section>
        )}

        {/* CONTACT */}
        <section
          className="developer-contact"
          id="dev-contact"
        >

          <p className="developer-comment">
            // let's_connect
          </p>

          <h2>
            Let's build
            <span>something.</span>
          </h2>

          {data.social.email && (
            <a
              href={`mailto:${data.social.email}`}
              className="developer-email"
            >
              {data.social.email}
              <span>↗</span>
            </a>
          )}

          <div className="developer-contact-links">

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

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="developer-footer">

        <span>
          {`< ${data.name || "developer"} />`}
        </span>

        <span>
          © {new Date().getFullYear()}
        </span>

        <span>
          Built with FolioBuilder
        </span>

      </footer>

    </div>
  );
}