import React from "react";
import { render, screen } from "@testing-library/react";
import { WorkExperienceCard } from "./WorkExperienceCard";
import { IWorkExperience } from "@/shared/types/workExperience.types";
import "@testing-library/jest-dom";
import { workExperienceMockData } from "@/shared/mocks/workExperience";

// Mock dependencies
jest.mock("../../../../shared/components/Chip/Chip", () => ({
  Chip: ({ label }: { label: string }) => <div data-testid="chip">{label}</div>,
}));
jest.mock("../../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

const mockWorkExperience: IWorkExperience = workExperienceMockData[0];

describe("WorkExperienceCard", () => {
  it("renders position and company name", () => {
    render(<WorkExperienceCard workExperience={mockWorkExperience} />);
    expect(screen.getByText("Desarrollador Full Stack")).toBeInTheDocument();
    expect(screen.getByText("Farmaloop")).toBeInTheDocument();
  });

  it("renders industry and location", () => {
    render(<WorkExperienceCard workExperience={mockWorkExperience} />);
    expect(
      screen.getByText("Startup, E-commerce, Farmacia")
    ).toBeInTheDocument();
    expect(screen.getByText("Remoto")).toBeInTheDocument();
  });

  it("renders business period and duration", () => {
    render(<WorkExperienceCard workExperience={mockWorkExperience} />);
    expect(screen.getByText("Agosto 2023 - Marzo 2025")).toBeInTheDocument();
    expect(screen.getByText("1 año, 7 meses")).toBeInTheDocument();
  });

  it("renders business impact items", () => {
    render(<WorkExperienceCard workExperience={mockWorkExperience} />);
    expect(
      screen.getByText(
        "Implementé un sistema de punto de venta (POS) para ventas directas, reduciendo el tiempo promedio de venta a menos de 5 minutos."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Optimicé el módulo de pedidos en tiempo real, procesando hasta 100 pedidos/hora y aumentando la eficiencia operativa en un 30%."
      )
    ).toBeInTheDocument();
  });

  it("renders technology stack chips", () => {
    render(<WorkExperienceCard workExperience={mockWorkExperience} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
  });

  it("renders professional reference section", () => {
    render(<WorkExperienceCard workExperience={mockWorkExperience} />);
    expect(screen.getByText("Referencia")).toBeInTheDocument();
    expect(screen.getByText("Cristian Olivares")).toBeInTheDocument();
    expect(
      screen.getByText("cristian.olivares@farmaloop.cl")
    ).toBeInTheDocument();
  });

  it("shows 'Actual' badge if current is true", () => {
    const currentExperience = {
      ...mockWorkExperience,
      businessPeriod: { ...mockWorkExperience.businessPeriod, current: true },
    };
    render(<WorkExperienceCard workExperience={currentExperience} />);
    expect(screen.getByText("Actual")).toBeInTheDocument();
  });

  it("does not render professional reference if not provided", () => {
    const noReference = {
      ...mockWorkExperience,
      professionalReference: undefined,
    };
    render(<WorkExperienceCard workExperience={noReference} />);
    expect(screen.queryByText("Referencia")).not.toBeInTheDocument();
  });

  it("renders timeline line if isLast is true", () => {
    render(<WorkExperienceCard workExperience={mockWorkExperience} isLast />);
    // The timeline line is visually hidden on mobile, so we check for its presence by class
    const timelineLine = document.querySelector(".bg-accent");
    expect(timelineLine).toBeInTheDocument();
  });
});
