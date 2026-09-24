function TemplateShowcase() {
  return (
    <section className="templates-section" id="templates">
      <div className="section-heading center">
        <p className="hero-label">PORTFOLIO TEMPLATES</p>

        <h2>
          Choose a design
          <br />
          <span>that fits you.</span>
        </h2>

        <p className="section-description">
          Start with a professionally designed template and
          customize it with your own information.
        </p>
      </div>

      <div className="template-grid">

        {/* Template 1 */}
        <div className="template-card">
          <div className="template-preview modern-preview">
            <div className="mini-navbar"></div>

            <div className="mini-content">
              <div className="mini-avatar"></div>

              <div className="mini-title"></div>
              <div className="mini-subtitle"></div>

              <div className="mini-line"></div>
              <div className="mini-line short"></div>

              <div className="mini-tags">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <div className="template-info">
            <div>
              <h3>Modern</h3>
              <p>Clean & professional</p>
            </div>

            <button>Get Started</button>
          </div>
        </div>


        {/* Template 2 */}
        <div className="template-card">
          <div className="template-preview developer-preview">
            <div className="terminal-top">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="terminal-content">
              <p>&gt; Hello, I'm Alex</p>
              <p className="terminal-purple">
                Full Stack Developer
              </p>

              <div className="terminal-line"></div>

              <p>&gt; Skills</p>

              <p className="terminal-gray">
                React • Node • MongoDB
              </p>
            </div>
          </div>

          <div className="template-info">
            <div>
              <h3>Developer</h3>
              <p>Modern developer style</p>
            </div>

            <button>Get Started</button>
          </div>
        </div>


        {/* Template 3 */}
        <div className="template-card">
          <div className="template-preview minimal-preview">
            <div className="minimal-content">
              <h4>Alex Johnson</h4>

              <p>Designer & Developer</p>

              <div className="minimal-line"></div>

              <div className="minimal-sections">
                <span>ABOUT</span>
                <span>PROJECTS</span>
                <span>CONTACT</span>
              </div>
            </div>
          </div>

          <div className="template-info">
            <div>
              <h3>Minimal</h3>
              <p>Simple & elegant</p>
            </div>

            <button>Get Started</button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TemplateShowcase;