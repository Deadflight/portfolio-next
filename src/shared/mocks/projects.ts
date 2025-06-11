import { IProject } from "../types/project.types";

export const mockProjects: IProject[] = [
  {
    id: 1,
    title: "Project One",
    description: "Description for project one",
    image: "image1.jpg",
    challenge: "Challenges for project one",
    technologies: ["React", "Node.js"],
    company: "Company A",
    featured: true,
    githubUrl: "example.com/github/project-one",
    liveUrl: "example.com/live/project-one",
    period: "2023-01-01 to 2023-06-01",
    results: "Results for project one",
    role: "Developer",
    solution: "Solution for project one",
    teamSize: "1 person",
  },

  {
    id: 2,
    title: "Project Two",
    description: "Description for project two",
    image: "image2.jpg",
    challenge: "Challenges for project two",
    technologies: ["Vue.js", "Express"],
    company: "Company B",
    featured: false,
    githubUrl: null,
    liveUrl: null,
    period: "2023-02-01 to 2023-07-01",
    results: "Results for project two",
    role: "Frontend Developer",
    solution: "Solution for project two",
    teamSize: "3 people",
  },
];
