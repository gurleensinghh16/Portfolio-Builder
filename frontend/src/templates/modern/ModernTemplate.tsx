import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import "./modern.css";
import type { PortfolioData } from "../../types/portfolio";

interface Props {
  data: PortfolioData;
}

/** CSSProperties plus the custom `--i` stagger-index variable. */
type StaggerStyle = CSSProperties & { "--i"?: number };

/** True once, read from the browser's reduced-motion preference. */
function usePrefersReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
}

/** Fires `inView` the first time the attached element crosses the viewport. */
function useReveal<T extends HTMLElement>(reduceMotion: boolean) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return { ref, inView };
}

/** Counts up to `value` once, respecting reduced motion. */
function CountUp({ value, reduceMotion }: { value: number; reduceMotion: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    let frame: number;
    const duration = 650;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, reduceMotion]);

  return <>{reduceMotion ? value : display}</>;
}

export default function ModernTemplate({ data }: Props) {
  const reduceMotion = usePrefersReducedMotion();

  const initials = (data.name || "YN")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const hasProjects = data.projects.length > 0;
  const [featuredProject, ...restProjects] = data.projects;
  const nameWords = (data.name || "Your Name").trim().split(/\s+/);
  const roleText = data.role || "Your Role";

  // ---- nav scroll state -------------------------------------------------
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 8
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- typewriter role ----------------------------------------------
  const [typedRole, setTypedRole] = useState("");

  useEffect(() => {
    if (reduceMotion) return;

    setTypedRole("");
    let i = 0;
    let interval: number;

    const startDelay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setTypedRole(roleText.slice(0, i));
        if (i >= roleText.length) window.clearInterval(interval);
      }, 32);
    }, 650);

    return () => {
      window.clearTimeout(startDelay);
      window.clearInterval(interval);
    };
  }, [roleText, reduceMotion]);

  const displayedRole = reduceMotion ? roleText : typedRole;

  // ---- scroll reveals -----------------------------------------------
  const { ref: aboutRef, inView: aboutInView } =
    useReveal<HTMLElement>(reduceMotion);
  const { ref: projectsRef, inView: projectsInView } =
    useReveal<HTMLElement>(reduceMotion);
  const { ref: experienceRef, inView: experienceInView } =
    useReveal<HTMLElement>(reduceMotion);
  const { ref: educationRef, inView: educationInView } =
    useReveal<HTMLElement>(reduceMotion);
  const { ref: contactRef, inView: contactInView } =
    useReveal<HTMLElement>(reduceMotion);

  // ---- smooth, offset-aware anchor scrolling -------------------------
  function scrollToSection(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const offset = 88;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }

  // ---- magnetic button hover ------------------------------------------
  function handleMagnetic(e: MouseEvent<HTMLAnchorElement>) {
    if (reduceMotion) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.16}px, ${y * 0.35}px)`;
  }

  function resetMagnetic(e: MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.transform = "";
  }

  return (
    <div className="modern-page">

      {/* NAVBAR */}
      <header className={`modern-nav${scrolled ? " is-scrolled" : ""}`}>
        <a href="#modern-home" className="modern-logo">
          {data.name || "Portfolio"}
        </a>

        <nav className="modern-nav-links">
          <a href="#modern-about" onClick={(e) => scrollToSection(e, "modern-about")}>
            About
          </a>
          <a href="#modern-projects" onClick={(e) => scrollToSection(e, "modern-projects")}>
            Work
          </a>
          <a href="#modern-experience" onClick={(e) => scrollToSection(e, "modern-experience")}>
            Experience
          </a>
          <a href="#modern-contact" onClick={(e) => scrollToSection(e, "modern-contact")}>
            Contact
          </a>
        </nav>

        <a
          href="#modern-contact"
          className="modern-nav-cta"
          onClick={(e) => scrollToSection(e, "modern-contact")}
          onMouseMove={handleMagnetic}
          onMouseLeave={resetMagnetic}
        >
          Get in touch
        </a>
      </header>

      <main>

        {/* HERO */}
        <section
          className="modern-hero modern-wrap"
          id="modern-home"
        >
          <div className="modern-hero-text">

            <p className="modern-hero-kicker">
              <span className="modern-status-dot"></span>
              Open to new projects
            </p>

            <h1 className="modern-hero-name">
              {nameWords.map((word, i) => (
                <span
                  className="modern-word-mask"
                  key={`${word}-${i}`}
                  style={{ "--i": i } as StaggerStyle}
                >
                  <span className="modern-word">{word}</span>
                </span>
              ))}
            </h1>

            <p className="modern-hero-role">
              {displayedRole}
              <span className="modern-caret"></span>
            </p>

            <p className="modern-hero-bio">
              {data.bio ||
                "Write a short bio introducing who you are, what you build, and the kind of work you're looking for."}
            </p>

            <div className="modern-hero-actions">
              <a
                href="#modern-projects"
                className="modern-btn-primary"
                onClick={(e) => scrollToSection(e, "modern-projects")}
                onMouseMove={handleMagnetic}
                onMouseLeave={resetMagnetic}
              >
                See the work
              </a>

              {data.social.email && (
                <a
                  href={`mailto:${data.social.email}`}
                  className="modern-btn-ghost"
                  onMouseMove={handleMagnetic}
                  onMouseLeave={resetMagnetic}
                >
                  Start a conversation
                </a>
              )}
            </div>

            {(data.projects.length > 0 || data.skills.length > 0) && (
              <div className="modern-hero-meta">
                {data.projects.length > 0 && (
                  <div className="modern-stat">
                    <b>
                      <CountUp value={data.projects.length} reduceMotion={reduceMotion} />
                    </b>
                    <span>
                      {data.projects.length === 1 ? "Project" : "Projects"}
                    </span>
                  </div>
                )}

                {data.skills.length > 0 && (
                  <div className="modern-stat">
                    <b>
                      <CountUp value={data.skills.length} reduceMotion={reduceMotion} />
                    </b>
                    <span>Core skills</span>
                  </div>
                )}

                {data.experience.length > 0 && (
                  <div className="modern-stat">
                    <b>
                      <CountUp value={data.experience.length} reduceMotion={reduceMotion} />
                    </b>
                    <span>
                      {data.experience.length === 1 ? "Role" : "Roles"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="modern-hero-visual">
            <div className="modern-portrait-backdrop"></div>

            <div className="modern-portrait">
              {data.profileImage ? (
                <img src={data.profileImage} alt={data.name} />
              ) : (
                <div className="modern-portrait-fallback">
                  <span>{initials}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          ref={aboutRef}
          className={`modern-about modern-wrap${aboutInView ? " is-in" : ""}`}
          id="modern-about"
        >
          <div className="modern-about-grid">
            <p className="modern-label">About</p>

            <p className="modern-about-bio">
              {data.bio ||
                "Tell visitors who you are, what you've built, and what you're looking for next."}
            </p>
          </div>

          {data.skills.length > 0 && (
            <div className="modern-skills-block">
              <p className="modern-label">Skills</p>

              <div className="modern-skills">
                {data.skills.map((skill, i) => (
                  <span key={skill} style={{ "--i": i } as StaggerStyle}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* PROJECTS */}
        <section
          ref={projectsRef}
          className={`modern-projects modern-wrap${projectsInView ? " is-in" : ""}`}
          id="modern-projects"
        >
          <div className="modern-section-head">
            <h2>Selected work</h2>
            <p className="modern-label">
              {hasProjects
                ? `${data.projects.length} total`
                : ""}
            </p>
          </div>

          {hasProjects && featuredProject ? (
            <>
              <article className="modern-featured-project">
                <div>
                  <span className="modern-featured-tag">
                    Featured
                  </span>

                  <h3>{featuredProject.title}</h3>

                  <p>{featuredProject.description}</p>

                  {featuredProject.technologies.length > 0 && (
                    <div className="modern-project-tech">
                      {featuredProject.technologies.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  )}

                  {featuredProject.link && (
                    <a
                      href={featuredProject.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View project ↗
                    </a>
                  )}
                </div>
              </article>

              {restProjects.length > 0 && (
                <div className="modern-project-list">
                  {restProjects.map((project, index) => (
                    <article
                      className="modern-project-row"
                      key={`${project.title}-${index}`}
                      style={{ "--i": index + 1 } as StaggerStyle}
                    >
                      <h3>{project.title}</h3>

                      <div>
                        <p>{project.description}</p>

                        {project.technologies.length > 0 && (
                          <div className="modern-project-tech">
                            {project.technologies.map((tech) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View ↗
                        </a>
                      ) : (
                        <span></span>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="modern-empty">
              Add a project to feature your work here.
            </p>
          )}
        </section>

        {/* EXPERIENCE */}
        {data.experience.length > 0 && (
          <section
            ref={experienceRef}
            className={`modern-experience modern-wrap${experienceInView ? " is-in" : ""}`}
            id="modern-experience"
          >
            <div className="modern-section-head">
              <h2>Experience</h2>
            </div>

            <div className="modern-timeline">
              {data.experience.map((item, index) => (
                <article
                  className="modern-timeline-item"
                  key={`${item.company}-${index}`}
                  style={{ "--i": index } as StaggerStyle}
                >
                  <span className="modern-timeline-dot"></span>

                  <div className="modern-timeline-head">
                    <div>
                      <h3>{item.position}</h3>
                      <p className="modern-company">{item.company}</p>
                    </div>

                    <span className="modern-timeline-duration">
                      {item.duration}
                    </span>
                  </div>

                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {data.education.length > 0 && (
          <section
            ref={educationRef}
            className={`modern-education modern-wrap${educationInView ? " is-in" : ""}`}
            id="modern-education"
          >
            <div className="modern-section-head">
              <h2>Education</h2>
            </div>

            <div className="modern-education-list">
              {data.education.map((item, index) => (
                <article
                  className="modern-education-row"
                  key={`${item.institution}-${index}`}
                  style={{ "--i": index } as StaggerStyle}
                >
                  <div>
                    <h3>{item.degree}</h3>
                    <p>{item.institution}</p>
                  </div>

                  <span className="modern-education-year">
                    {item.year}
                  </span>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section
          ref={contactRef}
          className={`modern-contact${contactInView ? " is-in" : ""}`}
          id="modern-contact"
        >
          <div className="modern-wrap modern-contact-inner">
            <p className="modern-label">Get in touch</p>

            <h2>Let's build something worth shipping.</h2>

            {data.social.email && (
              <a
                href={`mailto:${data.social.email}`}
                className="modern-contact-email"
              >
                {data.social.email}
              </a>
            )}

            {(data.social.github || data.social.linkedin) && (
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
            )}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="modern-footer">
        <span>
          © {new Date().getFullYear()} {data.name || "Portfolio"}
        </span>

        <span>Built with FolioBuilder</span>
      </footer>

    </div>
  );
}