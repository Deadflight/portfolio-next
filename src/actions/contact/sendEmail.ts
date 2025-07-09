"use server";
import { getEnvs } from "@/lib/config/envs";
import { sendEmailSchema } from "@/schemas/sendEmailSchema";
import { Resend } from "resend";

const resend = new Resend(getEnvs.EMAIL_SENDER_API_KEY);

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

  const response = await resend.emails.send({
    from: getEnvs.EMAIL_SENDER_EMAIL,
    to: getEnvs.EMAIL_SENDER_TO_EMAIL,
    subject: formData.get("subject") as string,
    replyTo: formData.get("email") as string,
    html: `
      <p><strong>Nombre:</strong> ${formData.get("name")}</p>
      <p><strong>Email:</strong> ${formData.get("email")}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${formData.get("message")}</p>
    `,
  });

  if (response.error) {
    return {
      error: {
        general: response.error.message
          ? [response.error.message]
          : ["Error al enviar el mensaje. Por favor, inténtalo de nuevo."],
      },
    };
  }

  return { success: true };
}
