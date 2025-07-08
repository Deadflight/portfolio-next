"use client";
import { sendEmail } from "@/actions/contact/sendEmail";
import React, { useActionState } from "react";
import { Icon } from "@/shared/components/Icons/Icons";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IActionState<T> {
  error: Record<string, string[]>;
  success: boolean;
  message: string;
  data: T;
}
const initialState: IActionState<ContactFormData> = {
  error: {},
  success: false,
  message: "",
  data: {
    name: "",
    email: "",
    subject: "",
    message: "",
  },
};

export const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(
    sendEmail,
    initialState
  );

  return (
    <article className="card">
      <h3 className="text-xl font-heading font-semibold text-text-main mb-6">
        Envíame un Mensaje
      </h3>

      <form action={formAction}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block font-body font-semibold text-text-main mb-2"
            >
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="input-field"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-body font-semibold text-text-main mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input-field"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block font-body font-semibold text-text-main mb-2"
          >
            Asunto *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="input-field"
            placeholder="Asunto del mensaje"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-body font-semibold text-text-main mb-2"
          >
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="input-field resize-none"
            placeholder="Cuéntame sobre tu proyecto..."
          />
        </div>
        {state.success && Object.keys(state.error).length === 0 && (
          <div className="text-success mt-4">
            {state.message || "Mensaje enviado con éxito."}
          </div>
        )}
        {!state.success && Object.keys(state.error).length > 0 && (
          <div className="text-error mt-4">
            {Object.values(state.error).flat().join(", ")}
          </div>
        )}
        <button
          type="submit"
          className={`btn-primary w-full flex items-center justify-center transition-opacity ${
            isPending ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={isPending}
        >
          {isPending ? (
            <svg
              className="animate-spin mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            <Icon name="PaperPlane" size={16} className="mr-2" />
          )}
          Enviar Mensaje
        </button>
      </form>
    </article>
  );
};
