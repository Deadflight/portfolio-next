"use client";
import { sendEmail } from "@/actions/contact/sendEmail";
import React, { JSX } from "react";
import { Icon } from "@/shared/components/Icons/Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmailSchema } from "@/schemas/sendEmailSchema";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * ContactForm
 *
 * This component renders an accessible and validated contact form, allowing users to send messages through the website.
 * It uses React Hook Form together with Zod for field validation and error management.
 *
 * Features:
 * - Real-time validation of fields (name, email, subject, message) using a Zod schema.
 * - Displays specific error messages for each field and a general message in case of submission error.
 * - Visually indicates the sending state (loading/spinner) and shows a success confirmation.
 * - User input is preserved if a submission error occurs.
 * - Accessibility: associated labels, roles, and clear messages.
 *
 * Props: None.
 *
 * Usage example:
 * ```tsx
 * <ContactForm />
 * ```
 *
 * @returns {JSX.Element} Accessible and validated contact form.
 */
export const ContactForm = (): JSX.Element => {
  const { handleSubmit, register, formState, reset } = useForm<ContactFormData>(
    {
      defaultValues: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      resolver: zodResolver(sendEmailSchema),
    }
  );
  const [generalError, setGeneralError] = React.useState<{
    [key: string]: string[] | undefined;
  }>({});

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("subject", data.subject);
      formData.append("message", data.message);

      const response = await sendEmail(formData);

      if (response && response.error) {
        setGeneralError(response.error);
        return;
      }

      reset();
      setGeneralError({});
    } catch (error) {
      setGeneralError({
        general:
          error instanceof Error
            ? [error.message]
            : ["Error al enviar el mensaje. Por favor, inténtalo de nuevo."],
      });
      return;
    }
  };

  return (
    <article className="card">
      <h3 className="text-xl font-heading font-semibold text-text-main mb-6">
        Envíame un Mensaje
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block font-body font-semibold text-text-main mb-2"
            >
              Nombre *
            </label>
            <input
              className="input-field"
              id="name"
              type="text"
              placeholder="Tu nombre"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
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
              className="input-field"
              placeholder="tu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
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
            className="input-field"
            placeholder="Asunto del mensaje"
            {...register("subject")}
          />
          {errors.subject && (
            <p className="text-error text-sm mt-1">{errors.subject.message}</p>
          )}
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
            className="input-field resize-none"
            rows={5}
            placeholder="Cuéntame sobre tu proyecto..."
            {...register("message")}
          />
          {errors.message && (
            <p className="text-error text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`btn-primary w-full flex items-center justify-center transition-opacity ${
            isSubmitting ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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
        {Object.keys(generalError).length > 0 && (
          <p className="text-error text-sm mt-4 text-center">
            {generalError.general
              ? generalError.general.join(", ")
              : "Error al enviar el mensaje. Por favor, inténtalo de nuevo."}
          </p>
        )}
        {formState.isSubmitSuccessful && !generalError.general && (
          <p className="text-success text-sm mt-4 text-center">
            Mensaje enviado correctamente. ¡Gracias por contactarme!
          </p>
        )}
      </form>
    </article>
  );
};
