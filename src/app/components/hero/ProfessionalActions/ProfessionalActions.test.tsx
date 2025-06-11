import React from "react";
import { render, screen } from "@testing-library/react";
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
      screen.getByRole("link", { name: /View my projects/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Download my complete professional resume/i,
      })
    ).toBeInTheDocument();
  });

  it("renders the correct href for 'Ver Proyectos'", () => {
    render(<ProfessionalActions />);
    const proyectosLink = screen.getByRole("link", {
      name: /View my projects/i,
    });
    expect(proyectosLink).toHaveAttribute("href", "#proyectos");
  });

  it("renders the correct href and download attribute for 'Descargar CV'", () => {
    render(<ProfessionalActions />);
    const cvLink = screen.getByRole("link", {
      name: /Download my complete professional resume/i,
    });
    expect(cvLink).toHaveAttribute("href", "/cv-carlos-correa.pdf");
    expect(cvLink).toHaveAttribute("download");
  });

  it("renders the Download icon inside the 'Descargar CV' button", () => {
    render(<ProfessionalActions />);
    const cvLink = screen.getByRole("link", {
      name: /Download my complete professional resume/i,
    });
    expect(cvLink.querySelector('[data-testid="icon"]')).toBeInTheDocument();
  });
});
