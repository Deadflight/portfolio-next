export interface IProject {
  id: number;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  company: string;
  period: string;
  role: string;
  teamSize: string;
}
