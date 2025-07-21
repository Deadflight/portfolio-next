import React from "react";
import { render, screen } from "@testing-library/react";
import { WorkExperienceShowcase } from "./WorkExperience";
import { IWorkExperience } from "@/shared/types/workExperience.types";
import { IWorkExperienceListProps } from "./WorkExperienceList/WorkExperienceList";
import { IIconProps } from "@/shared/types/icons.types";
import { workExperienceData } from "@/constants/workExperience";

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
    expect(
      screen.getByRole("heading", { name: /Experiencia Laboral/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Mi trayectoria profesional en el desarrollo de software/i
      )
    ).toBeInTheDocument();
  });

  it("renders the WorkExperienceList with all work experiences", () => {
    render(<WorkExperienceShowcase workExperienceData={workExperienceData} />);
    // There are 4 positions in the data
    expect(
      screen.getAllByText(/Desarrollador Full Stack/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Desarrollador Frontend/i).length
    ).toBeGreaterThan(1);
    expect(
      screen.getAllByText(/Desarrollador Frontend Freelance/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Desarrollador Frontend/i).length
    ).toBeGreaterThan(1);
  });

  it("renders the CV download card with correct text and link", () => {
    render(<WorkExperienceShowcase workExperienceData={workExperienceData} />);
    expect(
      screen.getByRole("heading", { name: /¿Buscas más detalles\?/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Mi CV completo incluye información adicional/i)
    ).toBeInTheDocument();
    const downloadLink = screen.getByRole("link", {
      name: /Descargar CV Completo/i,
    });
    expect(downloadLink).toHaveAttribute("href", "/cv-carlos-correa.pdf");
    expect(downloadLink).toHaveAttribute("download");
    expect(screen.getByTestId("icon")).toHaveTextContent("Download");
  });
});
