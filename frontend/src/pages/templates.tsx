import { useNavigate } from "react-router-dom";
import "./templates.css";

function Templates() {
  const navigate = useNavigate();

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description:
        "A polished and creative portfolio for students and modern developers.",
    },
    {
      id: "developer",
      name: "Developer",
      description:
        "A technical portfolio designed for developers and software engineers.",
    },
    {
      id: "minimal",
      name: "Minimal",
      description:
        "A clean editorial-style portfolio focused on simplicity and content.",
    },
  ];

  return (
    <div className="templates-page">
      <div className="templates-header">
        <p className="templates-eyebrow">CHOOSE YOUR STYLE</p>

        <h1>Choose Your Template</h1>

        <p>
          Select a portfolio design that matches your personality and
          professional style.
        </p>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div className="template-card" key={template.id}>
            <div className={`template-preview ${template.id}`}>
              <span>{template.name}</span>
            </div>

            <div className="template-card-content">
              <h2>{template.name}</h2>

              <p>{template.description}</p>

              <button
                onClick={() => navigate(`/create?template=${template.id}`)}
              >
                Use This Template →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;