import z from "zod";

export const sendEmailSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(50, "El nombre no puede exceder los 50 caracteres"),
  email: z
    .string()
    .email("Debe ser un correo electrónico válido")
    .max(100, "El correo electrónico no puede exceder los 100 caracteres"),
  subject: z
    .string()
    .min(1, "El asunto es obligatorio")
    .max(100, "El asunto no puede exceder los 100 caracteres"),
  message: z
    .string()
    .min(1, "El mensaje es obligatorio")
    .max(500, "El mensaje no puede exceder los 500 caracteres"),
});
