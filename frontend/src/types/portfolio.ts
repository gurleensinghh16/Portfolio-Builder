export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  profileImage: string;

  skills: string[];

  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];

  education: {
    degree: string;
    institution: string;
    year: string;
  }[];

  experience: {
    position: string;
    company: string;
    duration: string;
    description: string;
  }[];

  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}