import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProfessionalActions } from "./index";

jest.mock("../../../../shared/components/icons", () => ({
  Icon: () => <svg data-testid="icon" />,
}));

describe("ProfessionalActions", () => {
  it("renders 'Ver Proyectos' button with correct link and aria-label", () => {
    render(<ProfessionalActions />);
    const proyectosLink = screen.getByRole("link", {
      name: /completed projects and case studies/i,
    });
    expect(proyectosLink).toBeInTheDocument();
    expect(proyectosLink).toHaveAttribute("href", "#proyectos");
    expect(proyectosLink).toHaveTextContent("Ver Proyectos");
  });

  it("renders 'Descargar CV' button with correct link, download attribute, and icon", () => {
    render(<ProfessionalActions />);
    const cvLink = screen.getByRole("link", { name: /professional resume/i });
    expect(cvLink).toBeInTheDocument();
    expect(cvLink).toHaveAttribute("href", "/cv-carlos-correa.pdf");
    expect(cvLink).toHaveAttribute("download");
    expect(cvLink).toHaveTextContent("Descargar CV");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("has correct layout classes", () => {
    render(<ProfessionalActions />);
    const container = screen.getByText("Ver Proyectos").closest("div");
    expect(container).toHaveClass(
      "flex",
      "flex-col",
      "sm:flex-row",
      "gap-4",
      "justify-center",
      "items-center",
      "mb-12"
    );
  });
});
