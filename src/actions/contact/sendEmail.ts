"use server";
import { getServerEnvs } from "@/lib/config/envs";
import { sendEmailSchema } from "@/schemas/sendEmailSchema";
import { Resend } from "resend";

export async function sendEmail(formData: FormData): Promise<{
  success?: boolean;
  error?: { [key: string]: string[] };
}> {
  const validateFields = sendEmailSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const envs = getServerEnvs();

  if (envs.CI && envs.NODE_ENV === "development") {
    return {
      success: true,
    };
  }

  const resend = new Resend(getServerEnvs().EMAIL_SENDER_API_KEY);
  const response = await resend.emails.send({
    from: envs.EMAIL_SENDER_FROM_EMAIL,
    to: envs.EMAIL_SENDER_TO_EMAIL,
    subject: validateFields.data.subject,
    replyTo: validateFields.data.email,
    html: `
            <p><strong>Nombre:</strong> ${validateFields.data.name}</p>
            <p><strong>Email:</strong> ${validateFields.data.email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${validateFields.data.message}</p>
        `,
  });

  if (response.error) {
    const errorData = response.error.message;
    return {
      error: {
        general: [
          errorData ||
            "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
        ],
      },
    };
  }

  return { success: true };
}
