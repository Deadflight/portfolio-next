import {
  ISkillExperience,
  ISkillProficiencyLevels,
  SkillIconName,
  SkillProficiencyLevel,
} from "@/shared/types/skills.types";

export const proficiencyLevels: ISkillProficiencyLevels = {
  expert: {
    label: "Expert",
    description: "Deep expertise, capable of leading projects and mentoring",
    color: "text-text-main",
    bgColor: "bg-success",
    stars: 5,
  },
  advanced: {
    label: "Advanced",
    description: "Daily professional use, independent problem solving",
    color: "text-text-main",
    bgColor: "bg-text-main",
    stars: 4,
  },
  intermediate: {
    label: "Intermediate",
    description: "Practical experience, development with occasional supervision",
    color: "text-text-main",
    bgColor: "bg-primary-brand",
    stars: 3,
  },
  beginner: {
    label: "Beginner",
    description: "Basic knowledge, in learning process",
    color: "text-text-main",
    bgColor: "bg-accent",
    stars: 2,
  },
};

export const skillCategories: ISkillExperience[] = [
  {
    id: "languages",
    title: "Languages",
    iconName: SkillIconName.Code,
    skills: [
      {
        name: "JavaScript",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ years",
        context:
          "Daily development in enterprise projects, ES6+, functional programming",
      },
      {
        name: "TypeScript",
        level: SkillProficiencyLevel.Expert,
        experience: "2+ years",
        context:
          "Advanced typing, complex interfaces, integration in large projects",
      },
      {
        name: "C++",
        level: SkillProficiencyLevel.Beginner,
        experience: "6 months",
        context:
          "Basic knowledge, data structures, object-oriented programming",
      },
    ],
  },
  {
    id: "frontend-development",
    title: "Frontend Development",
    iconName: SkillIconName.Globe,
    skills: [
      {
        name: "React",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ years",
        context:
          "Daily development in enterprise projects, complex components, advanced hooks",
      },
      {
        name: "Next.js",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ years",
        context:
          "SSR, SSG, API routes, production performance optimization",
      },
      {
        name: "Tailwind CSS",
        level: SkillProficiencyLevel.Expert,
        experience: "2+ years",
        context:
          "Design systems, reusable components, responsive design",
      },
      {
        name: "Redux",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ years",
        context:
          "Complex state management, Redux Toolkit, custom middleware",
      },
      {
        name: "React Query",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ year",
        context:
          "Data caching, server-client synchronization, optimistic updates",
      },
      {
        name: "Angular",
        level: SkillProficiencyLevel.Intermediate,
        experience: "6 months",
        context: "Components, services, routing, reactive forms",
      },
    ],
  },
  {
    id: "backend-development",
    title: "Backend Development",
    iconName: SkillIconName.Server,
    skills: [
      {
        name: "Node.js",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ years",
        context:
          "REST APIs, microservices, real-time data processing",
      },
      {
        name: "Express.js",
        level: SkillProficiencyLevel.Advanced,
        experience: "3+ years",
        context:
          "Custom middleware, authentication, advanced error handling",
      },
      {
        name: "NestJS",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ year",
        context: "Modular architecture, decorators, dependency injection",
      },
      {
        name: "REST APIs",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ years",
        context: "Scalable API design, documentation, versioning",
      },
      {
        name: "GraphQL",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ year",
        context: "Resolvers, schemas, query optimization",
      },
      {
        name: "Apollo Server",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ year",
        context: "Database integration, caching, subscriptions",
      },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    iconName: SkillIconName.Database,
    skills: [
      {
        name: "MongoDB",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ years",
        context:
          "Data modeling, complex aggregations, indexes, replication",
      },
      {
        name: "PostgreSQL",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ year",
        context: "Complex queries, relationships, stored procedures",
      },
      {
        name: "DynamoDB",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ year",
        context: "NoSQL design, partitioning, AWS integration",
      },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    iconName: SkillIconName.Cloud,
    skills: [
      {
        name: "AWS",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ year",
        context: "EC2, S3, Lambda, API Gateway, CloudWatch, deployments",
      },
      {
        name: "Docker",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ year",
        context: "Containerization, docker-compose, image optimization",
      },
      {
        name: "CI/CD",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ year",
        context:
          "GitHub Actions, automated pipelines, automated testing",
      },
      {
        name: "Git",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ years",
        context:
          "Complex workflows, conflict resolution, Git Flow",
      },
    ],
  },
  {
    id: "project-management",
    title: "Project Management",
    iconName: SkillIconName.Settings,
    skills: [
      {
        name: "Agile/Scrum",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ years",
        context:
          "Sprints, retrospectives, estimations, distributed team work",
      },
      {
        name: "Kanban",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ years",
        context:
          "Continuous flow, performance metrics, process optimization",
      },
      {
        name: "Jira",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ years",
        context: "Project configuration, reports, automations",
      },
    ],
  },
];
