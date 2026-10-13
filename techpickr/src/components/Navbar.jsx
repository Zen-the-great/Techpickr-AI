import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RollLink from "./RollLink";
import "./Navbar.css";

// The ids must match the id="..." of the sections on your Home page.
const sectionLinks = [
  { label: "How it works", id: "how-it-works" },
  { label: "Features", id: "features" },
  { label: "Explore Builds", id: "build" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // slightly stronger background after the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu when the page changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // close the mobile menu with the Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // scroll to a section on the Home page (go Home first if needed)
  const goToSection = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.pathname === "/") {
      scroll();
    } else {
      navigate("/");
      setTimeout(scroll, 150);
    }
  };

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""} ${open ? "nav-open" : ""}`}>
      <Link to="/" className="nav-logo" aria-label="TechPickr home">
        <span className="nav-logo-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          </svg>
        </span>
        <span className="nav-logo-text">
          Tech<span>Pickr</span>
        </span>
      </Link>

      <nav className="nav-links" id="nav-menu" aria-label="Main">
        <RollLink to="/why-us">Why us</RollLink>
        {sectionLinks.map((s) => (
          <RollLink key={s.id} href={`/#${s.id}`} onClick={goToSection(s.id)}>
            {s.label}
          </RollLink>
        ))}
        <Link to="/build" className="nav-cta nav-cta-mobile">
          Build My PC <span aria-hidden="true">→</span>
        </Link>
      </nav>

      <Link to="/build" className="nav-cta nav-cta-desktop">
        Build My PC <span aria-hidden="true">→</span>
      </Link>

      <button
        type="button"
        className="nav-burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

export default Navbar;
