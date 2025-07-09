import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
import { IIconProps } from "../../../shared/types/icons.types";
import { sendEmail } from "./../../../actions/contact/sendEmail";

// Mock dependencies
jest.mock("../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, ...props }: IIconProps) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));
jest.mock("./../../../actions/contact/sendEmail", () => ({
  sendEmail: jest.fn(),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields and submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Enviar Mensaje/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));
    await waitFor(() => {
      expect(
        screen.getAllByText(/obligatorio|requerido|required/i).length
      ).toBeGreaterThan(0);
    });
  });

  it("calls sendEmail with correct data and resets form on success", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Asunto/i), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), {
      target: { value: "Test message" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    await waitFor(() => {
      expect(sendEmail).toHaveBeenCalled();
      expect(
        screen.getByText(/Mensaje enviado correctamente/i)
      ).toBeInTheDocument();
    });
  });

  it("shows general error when sendEmail returns error", async () => {
    (sendEmail as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: "Custom error message",
    });
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Asunto/i), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), {
      target: { value: "Test message" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Error al enviar el mensaje\. Por favor, inténtalo de nuevo\./i
        )
      ).toBeInTheDocument();
    });
  });

  it("shows Network error when sendEmail fails with an exception", async () => {
    (sendEmail as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Asunto/i), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), {
      target: { value: "Test message" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  it("shows fallback error message when sendEmail fails without a message", async () => {
    (sendEmail as jest.Mock).mockRejectedValueOnce({});
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Asunto/i), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), {
      target: { value: "Test message" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Error al enviar el mensaje\. Por favor, inténtalo de nuevo\./i
        )
      ).toBeInTheDocument();
    });
  });

  it("disables submit button and shows spinner while submitting", async () => {
    (sendEmail as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ success: true }), 100);
        })
    );
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Asunto/i), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), {
      target: { value: "Test message" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    // Button should be disabled and spinner visible while submitting
    expect(
      screen.getByRole("button", { name: /Enviar Mensaje/i })
    ).toBeDisabled();
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();

    await waitFor(() => {
      expect(sendEmail).toHaveBeenCalled();
    });
  });
});
