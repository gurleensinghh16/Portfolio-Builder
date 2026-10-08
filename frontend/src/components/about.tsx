import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const paragraphs = [
  "Portfolio Builder is designed to help students create professional portfolios without building a website from scratch.",
  "Choose a design, add your information, preview the result, and get the complete source code ready to use.",
];

function About() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      className={`about-section ${inView ? "in-view" : ""}`}
      id="about"
    >
      <div className="section-heading">
        <p className="hero-label">ABOUT THE PROJECT</p>

        <h2>
          <span className="line">
            <span className="line-inner">Build your portfolio.</span>
          </span>
          <span className="line">
            <span
              className="line-inner accent"
              style={{ transitionDelay: "0.18s" }}
            >
              Your way.
            </span>
          </span>
        </h2>
      </div>

      <div className="about-content">
        {paragraphs.map((text, p) => (
          <p key={p} aria-label={text}>
            {text.split(" ").map((word, i) => (
              <Fragment key={i}>
                <span
                  className="word"
                  aria-hidden="true"
                  style={{ "--i": wordIndex++ } as CSSProperties}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}

export default About;