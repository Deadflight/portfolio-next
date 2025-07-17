"use server";
import { getEnvs } from "@/lib/config/envs";
import { sendEmailSchema } from "@/schemas/sendEmailSchema";

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

  const response = await fetch(`${getEnvs.NEXT_PUBLIC_BASE_URL}/api/send`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      error: {
        general: [
          errorData.error ||
            "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
        ],
      },
    };
  }

  const data = await response.json();
  if (data.error) {
    return {
      error: {
        general: [data.error],
      },
    };
  }

  return { success: true };
}
