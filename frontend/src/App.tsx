import MinimalTemplate from "./templates/minimal/MinimalTemplate";

function App() {
  const portfolioData = {
    name: "Gurleen Singh",
    role: "Full Stack Developer",
    bio: "I build modern web applications with clean interfaces and practical solutions.",
    profileImage: "",
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "Git"],
    projects: [
      {
        title: "Portfolio Builder",
        description: "A platform that helps students create professional portfolios without building everything from scratch.",
        technologies: ["React", "TypeScript", "Vite"],
        link: "#",
      },
      {
        title: "NIRIKSHAK AI",
        description: "An AI-powered product inspection system for detecting declaration and compliance issues.",
        technologies: ["React", "Node.js", "Python"],
        link: "#",
      },
    ],
    experience: [],
    social: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      email: "gurleen@example.com",
    },
  };

  return <MinimalTemplate data={portfolioData} />;
}

export default App;