import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="/" className="logo">
            Tech<span>Pickr</span>
          </a>
          <p>
            A beginner-friendly PC and laptop advisor. Built for a school
            hackathon. All builds and prices shown are sample data.
          </p>
        </div>

        <nav className="footer-links">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#explore">Explore Builds</a>
          <a href="#build">Build My PC</a>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 TechPickr. Student project.</p>
      </div>
    </footer>
  );
}

export default Footer;