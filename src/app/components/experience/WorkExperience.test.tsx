import React from "react";
import { renderWithI18n as render, screen } from "@/test/utils";
import { WorkExperienceShowcase } from "./WorkExperience";
import { IWorkExperience } from "@/shared/types/workExperience.types";
import { IWorkExperienceListProps } from "./WorkExperienceList/WorkExperienceList";
import { IIconProps } from "@/shared/types/icons.types";
import { workExperienceData } from "@/constants/workExperience";
import "@testing-library/jest-dom";

// Mock child components and icons
jest.mock("./WorkExperienceList/WorkExperienceList", () => ({
  WorkExperienceList: ({ workExperiences }: IWorkExperienceListProps) => (
    <div data-testid="work-experience-list">
      {workExperiences.map((exp: IWorkExperience) => (
        <div key={exp.id}>{exp.position}</div>
      ))}
    </div>
  ),
}));
jest.mock("../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name }: IIconProps) => <span data-testid="icon">{name}</span>,
}));

describe("WorkExperienceShowcase", () => {
  it("renders the section with correct heading and description", () => {
    render(<WorkExperienceShowcase workExperienceData={workExperienceData} />);
    expect(screen.getByText("Experiencia")).toBeInTheDocument();
    expect(
      screen.getByText(/Trayectoria profesional/i)
    ).toBeInTheDocument();
  });

  it("renders the WorkExperienceList with all work experiences", () => {
    render(<WorkExperienceShowcase workExperienceData={workExperienceData} />);
    expect(screen.getAllByText(/Desarrollador Full Stack/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Desarrollador Frontend/i).length).toBeGreaterThan(1);
  });
});