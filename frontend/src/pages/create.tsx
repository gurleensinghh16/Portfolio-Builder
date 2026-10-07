import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";
import { supabase } from '../lib/supabase'

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
}

function Create() {
    const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedTemplate =
    searchParams.get("template") || "modern";

  // -------------------------
  // PERSONAL INFORMATION
  // -------------------------

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // -------------------------
  // SKILLS
  // -------------------------

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // -------------------------
  // PROJECTS
  // -------------------------

  const [projects, setProjects] = useState<Project[]>([
    {
      title: "",
      description: "",
      technologies: [],
      link: "",
    },
  ]);

  // -------------------------
  // EDUCATION
  // -------------------------

  const [education, setEducation] = useState<Education[]>([
    {
      degree: "",
      institution: "",
      year: "",
    },
  ]);

  // -------------------------
  // EXPERIENCE
  // -------------------------

  const [experience, setExperience] = useState<Experience[]>([]);

  // -------------------------
  // SOCIAL / CONTACT
  // -------------------------

  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");

  // -------------------------
  // PROFILE IMAGE
  // -------------------------

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setProfileImage(reader.result as string); // base64 string — persists in Supabase
  };
  reader.readAsDataURL(file);
};

  // -------------------------
  // SKILLS
  // -------------------------

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (skills.includes(skill)) {
      setSkillInput("");
      return;
    }

    setSkills([...skills, skill]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  // -------------------------
  // PROJECTS
  // -------------------------

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        technologies: [],
        link: "",
      },
    ]);
  };

  const removeProject = (index: number) => {
    if (projects.length === 1) return;

    setProjects(
      projects.filter((_, projectIndex) => projectIndex !== index)
    );
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    const updatedProjects = [...projects];

    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };

    setProjects(updatedProjects);
  };

  // -------------------------
  // EDUCATION
  // -------------------------

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: "",
        institution: "",
        year: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    if (education.length === 1) return;

    setEducation(
      education.filter(
        (_, educationIndex) => educationIndex !== index
      )
    );
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedEducation = [...education];

    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };

    setEducation(updatedEducation);
  };

  // -------------------------
  // EXPERIENCE
  // -------------------------

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        position: "",
        company: "",
        duration: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperience(
      experience.filter(
        (_, experienceIndex) => experienceIndex !== index
      )
    );
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updatedExperience = [...experience];

    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };

    setExperience(updatedExperience);
  };

  // -------------------------
  // COMPLETE PORTFOLIO DATA
  // -------------------------
  // -------------------------
  // CREATE PORTFOLIO
  // -------------------------

  const handleCreatePortfolio = async () => {
  const builtData = {
    name,
    role,
    bio,
    profileImage,
    skills,
    projects: projects.map((project) => ({
      ...project,
      technologies: project.technologies
        .flatMap((t) => t.split(',').map((i) => i.trim()).filter(Boolean))
    })),
    education,
    experience,
    social: { github, linkedin, email }
  }

  // Keep existing localStorage behaviour (preview page reads from here)
  localStorage.setItem('portfolioData', JSON.stringify(builtData))
  localStorage.setItem('selectedTemplate', selectedTemplate)

  // Save to Supabase if user is logged in
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { error } = await supabase
      .from('portfolios')
      .upsert({
        user_id:           user.id,
        name,
        role,
        bio,
        profile_image:     profileImage,
        selected_template: selectedTemplate,
        skills,
        projects:          builtData.projects,
        education,
        experience,
        social:            { github, linkedin, email },
        updated_at:        new Date().toISOString()
      }, { onConflict: 'user_id' })

    if (error) console.error('Supabase save failed:', error.message)
  }

  navigate('/preview')
}

  return (
    <div className="create-page">

      {/* ================= HEADER ================= */}

      <header className="create-header">

        <div>
          <p>FOLIOBUILDER</p>

          <h1>Create Your Portfolio</h1>
        </div>

        <div className="selected-template">
          Template:{" "}
          <strong>{selectedTemplate}</strong>
        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="create-container">

        <section className="form-section">

          {/* ================= PERSONAL INFORMATION ================= */}

          <div className="form-section-heading">
            <span>01</span>

            <div>
              <h2>Personal Information</h2>

              <p>
                Tell visitors a little about yourself.
              </p>
            </div>
          </div>


          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="e.g. Gurleen Singh"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label htmlFor="role">
              Professional Role
            </label>

            <input
              id="role"
              type="text"
              placeholder="e.g. Full Stack Developer"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label htmlFor="bio">
              About You
            </label>

            <textarea
              id="bio"
              rows={5}
              placeholder="Write a short introduction about yourself..."
              value={bio}
              onChange={(event) =>
                setBio(event.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label htmlFor="profileImage">
              Profile Photo
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {profileImage && (
              <div className="image-preview">

                <img
                  src={profileImage}
                  alt="Profile preview"
                />

              </div>
            )}

          </div>


          {/* ================= SKILLS ================= */}

          <div className="form-section-heading">

            <span>02</span>

            <div>
              <h2>Skills</h2>

              <p>
                Add the technologies and skills you know.
              </p>
            </div>

          </div>


          <div className="form-group">

            <label htmlFor="skill">
              Add Skill
            </label>

            <div className="input-with-button">

              <input
                id="skill"
                type="text"
                placeholder="e.g. React"
                value={skillInput}
                onChange={(event) =>
                  setSkillInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
              />

              <button
                type="button"
                onClick={addSkill}
              >
                Add
              </button>

            </div>

          </div>


          {skills.length > 0 && (
            <div className="tag-list">

              {skills.map((skill) => (

                <div
                  className="input-tag"
                  key={skill}
                >
                  <span>{skill}</span>

                  <button
                    type="button"
                    onClick={() =>
                      removeSkill(skill)
                    }
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>
          )}


          {/* ================= PROJECTS ================= */}

          <div className="form-section-heading">

            <span>03</span>

            <div>
              <h2>Projects</h2>

              <p>
                Add the projects you want to showcase.
              </p>
            </div>

          </div>


          {projects.map((project, index) => (

            <div
              className="dynamic-card"
              key={index}
            >

              <div className="dynamic-card-header">

                <h3>
                  Project {index + 1}
                </h3>

                {projects.length > 1 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      removeProject(index)
                    }
                  >
                    Remove
                  </button>
                )}

              </div>


              <div className="form-group">

                <label>
                  Project Title
                </label>

                <input
                  type="text"
                  placeholder="e.g. Portfolio Builder"
                  value={project.title}
                  onChange={(event) =>
                    updateProject(
                      index,
                      "title",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  rows={4}
                  placeholder="Describe what you built..."
                  value={project.description}
                  onChange={(event) =>
                    updateProject(
                      index,
                      "description",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Technologies
                </label>

                <input
  type="text"
  placeholder="React, Node.js, MongoDB"
  value={project.technologies.join(", ")}
  onChange={(event) =>
    updateProject(
      index,
      "technologies",
      [event.target.value]
    )
  }
/>

                <small>
                  Separate technologies with commas.
                </small>

              </div>


              <div className="form-group">

                <label>
                  Project Link
                </label>

                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={project.link}
                  onChange={(event) =>
                    updateProject(
                      index,
                      "link",
                      event.target.value
                    )
                  }
                />

              </div>

            </div>

          ))}


          <button
            type="button"
            className="add-section-button"
            onClick={addProject}
          >
            + Add Another Project
          </button>


          {/* ================= EDUCATION ================= */}

          <div className="form-section-heading">

            <span>04</span>

            <div>
              <h2>Education</h2>

              <p>
                Add your educational background.
              </p>
            </div>

          </div>


          {education.map((item, index) => (

            <div
              className="dynamic-card"
              key={index}
            >

              <div className="dynamic-card-header">

                <h3>
                  Education {index + 1}
                </h3>

                {education.length > 1 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      removeEducation(index)
                    }
                  >
                    Remove
                  </button>
                )}

              </div>


              <div className="form-group">

                <label>
                  Degree
                </label>

                <input
                  type="text"
                  placeholder="e.g. B.Tech Computer Science"
                  value={item.degree}
                  onChange={(event) =>
                    updateEducation(
                      index,
                      "degree",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Institution
                </label>

                <input
                  type="text"
                  placeholder="e.g. Chandigarh Group of Colleges"
                  value={item.institution}
                  onChange={(event) =>
                    updateEducation(
                      index,
                      "institution",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Year
                </label>

                <input
                  type="text"
                  placeholder="e.g. 2024 — 2028"
                  value={item.year}
                  onChange={(event) =>
                    updateEducation(
                      index,
                      "year",
                      event.target.value
                    )
                  }
                />

              </div>

            </div>

          ))}


          <button
            type="button"
            className="add-section-button"
            onClick={addEducation}
          >
            + Add Another Education
          </button>


          {/* ================= EXPERIENCE ================= */}

          <div className="form-section-heading">

            <span>05</span>

            <div>
              <h2>Experience</h2>

              <p>
                Add internships, jobs or other experience.
                This section is optional.
              </p>
            </div>

          </div>


          {experience.map((item, index) => (

            <div
              className="dynamic-card"
              key={index}
            >

              <div className="dynamic-card-header">

                <h3>
                  Experience {index + 1}
                </h3>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() =>
                    removeExperience(index)
                  }
                >
                  Remove
                </button>

              </div>


              <div className="form-group">

                <label>
                  Position
                </label>

                <input
                  type="text"
                  placeholder="e.g. Full Stack Developer"
                  value={item.position}
                  onChange={(event) =>
                    updateExperience(
                      index,
                      "position",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Company
                </label>

                <input
                  type="text"
                  placeholder="e.g. ABC Technologies"
                  value={item.company}
                  onChange={(event) =>
                    updateExperience(
                      index,
                      "company",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Duration
                </label>

                <input
                  type="text"
                  placeholder="e.g. June 2025 — August 2025"
                  value={item.duration}
                  onChange={(event) =>
                    updateExperience(
                      index,
                      "duration",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  rows={4}
                  placeholder="Describe your work..."
                  value={item.description}
                  onChange={(event) =>
                    updateExperience(
                      index,
                      "description",
                      event.target.value
                    )
                  }
                />

              </div>

            </div>

          ))}


          <button
            type="button"
            className="add-section-button"
            onClick={addExperience}
          >
            + Add Experience
          </button>


          {/* ================= SOCIAL / CONTACT ================= */}

          <div className="form-section-heading">

            <span>06</span>

            <div>
              <h2>Contact & Social</h2>

              <p>
                Give visitors a way to connect with you.
              </p>
            </div>

          </div>


          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label htmlFor="github">
              GitHub
            </label>

            <input
              id="github"
              type="url"
              placeholder="https://github.com/username"
              value={github}
              onChange={(event) =>
                setGithub(event.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label htmlFor="linkedin">
              LinkedIn
            </label>

            <input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={linkedin}
              onChange={(event) =>
                setLinkedin(event.target.value)
              }
            />

          </div>


          {/* ================= FINAL ACTION ================= */}

          <div className="form-actions">

            <button
              type="button"
              className="continue-button"
              onClick={handleCreatePortfolio}
            >
              Create Portfolio →
            </button>

          </div>

        </section>


        {/* ================= CURRENT PREVIEW ================= */}

        <aside className="create-preview">

          <p>FORM DATA PREVIEW</p>

          <div className="preview-card">

            {profileImage && (
              <img
                src={profileImage}
                alt={name || "Profile"}
              />
            )}

            <h2>
              {name || "Your Name"}
            </h2>

            <h3>
              {role || "Your Role"}
            </h3>

            <p>
              {bio ||
                "Your introduction will appear here as you fill out the form."}
            </p>

            {skills.length > 0 && (
              <div className="preview-skills">

                {skills.map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))}

              </div>
            )}

            {projects.some(
              (project) => project.title
            ) && (
              <div className="preview-summary">

                <strong>
                  Projects
                </strong>

                <span>
                  {
                    projects.filter(
                      (project) => project.title
                    ).length
                  }
                </span>

              </div>
            )}

          </div>

        </aside>

      </main>

    </div>
  );
}

export default Create;