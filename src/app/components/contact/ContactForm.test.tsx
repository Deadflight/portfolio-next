import React from "react";
import { screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
import "@testing-library/jest-dom";
import { renderWithProviders } from "@/test/utils";

jest.mock("react-hook-form", () => {
  const actual = jest.requireActual("react-hook-form");
  return {
    ...actual,
    useForm: () => ({
      register: jest.fn(() => ({ onChange: jest.fn(), onBlur: jest.fn(), name: "test" })),
      handleSubmit: (cb: (...args: unknown[]) => unknown) => cb,
      formState: { errors: {} },
      reset: jest.fn(),
    }),
  };
});

describe("ContactForm", () => {
  it("renders form title and all fields", () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByText("Envíame un mensaje")).toBeInTheDocument();
    expect(screen.getByText("Nombre *")).toBeInTheDocument();
    expect(screen.getByText("Email *")).toBeInTheDocument();
    expect(screen.getByText("Asunto *")).toBeInTheDocument();
    expect(screen.getByText("Mensaje *")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enviar mensaje" })).toBeInTheDocument();
  });

  it("renders input placeholders", () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByPlaceholderText("Tu nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("tu@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("¿En qué puedo ayudarte?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contame sobre tu proyecto...")).toBeInTheDocument();
  });
});