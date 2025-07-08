"use server";

import {
  ContactFormData,
  IActionState,
} from "@/app/components/contact/ContactForm";
import { sendEmailSchema } from "@/schemas/sendEmailSchema";

export async function sendEmail(
  initialState: IActionState<ContactFormData>,
  formData: FormData
) {
  const validateFields = sendEmailSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validateFields.success) {
    console.log("Return Data", {
      success: false,
      message: "Validation failed",
      error: validateFields.error.flatten().fieldErrors,
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      },
    });
    return {
      success: false,
      message: "Validation failed",
      error: validateFields.error.flatten().fieldErrors,
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      },
    };
  }

  return {
    success: true,
    message: "Email sent successfully",
    error: {},
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    },
  };
}
