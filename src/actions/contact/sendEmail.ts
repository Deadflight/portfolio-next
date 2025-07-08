"use server";

import { sendEmailSchema } from "@/schemas/sendEmailSchema";

export async function sendEmail(formData: FormData) {
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
}
