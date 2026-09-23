function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Folio<span>Builder</span>
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#templates">Templates</a>
        <a href="#how-it-works">How It Works</a>
      </div>

      <button className="nav-button">
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;