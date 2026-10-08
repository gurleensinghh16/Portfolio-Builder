import { useEffect, useState } from "react";
import { scrollToId } from "../utils/scroll";
const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "templates", label: "Templates" },
  { id: "how-it-works", label: "How It Works" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [active, setActive] = useState("home");

  // Scroll position: navbar style + progress line
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      setProgress(max > 0 ? y / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        Folio<span>Builder</span>
      </div>

      <div className="nav-links">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={active === l.id ? "active" : ""}
          >
            {l.label}
          </a>
        ))}
      </div>

      <button className="nav-button" onClick={() => scrollToId("templates")}>
  Get Started
</button>

      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />
    </nav>
  );
}

export default Navbar;