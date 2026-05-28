import React from "react";
import { renderWithI18n as render, screen } from "@/test/utils";
import { ProfessionalActions } from "./ProfessionalActions";
import { IIconProps } from "@/shared/types/icons.types";
import "@testing-library/jest-dom";

jest.mock("../../../../shared/components/Icons/Icons", () => ({
  Icon: (props: IIconProps) => <span data-testid="icon" {...props} />,
}));

describe("ProfessionalActions", () => {
  it("renders both action buttons", () => {
    render(<ProfessionalActions />);
    expect(
      screen.getByRole("link", { name: /Ver Proyectos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Descargar CV/i,
      })
    ).toBeInTheDocument();
  });

  it("renders the correct href for projects link", () => {
    render(<ProfessionalActions />);
    const proyectosLink = screen.getByRole("link", {
      name: /Ver Proyectos/i,
    });
    expect(proyectosLink).toHaveAttribute("href", "#projects");
  });

  it("renders the Download icon inside the CV button", () => {
    render(<ProfessionalActions />);
    const cvLink = screen.getByRole("link", {
      name: /Descargar CV/i,
    });
    expect(cvLink.querySelector('[data-testid="icon"]')).toBeInTheDocument();
  });
});
