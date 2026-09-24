function Home() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <p className="hero-label">
          BUILD YOUR PORTFOLIO
        </p>

        <h1>
          Create a portfolio
          <br />
          <span>without writing code.</span>
        </h1>

        <p className="hero-description">
          Choose a beautiful template, add your details,
          preview your portfolio and download the complete
          source code — all in one place.
        </p>

        <div className="hero-buttons">
          <button className="primary-button">
            Explore Templates
          </button>

          <button className="secondary-button">
            How It Works
          </button>
        </div>
      </div>

      <div className="hero-preview">
        <div className="preview-window">
          <div className="window-top">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="preview-content">
            <div className="preview-avatar"></div>

            <h2>Gurleen Singh</h2>

            <p>Full Stack Developer</p>

            <div className="preview-line"></div>

            <div className="preview-small-line"></div>
            <div className="preview-small-line"></div>

            <div className="preview-skills">
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;