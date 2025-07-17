// import { getEnvs } from "@/lib/config/envs";
// import { Resend } from "resend";

// const resend = new Resend(getEnvs.EMAIL_SENDER_API_KEY);

export async function POST() {
  // const formData = await req.formData();
  // const name = formData.get("name") as string;
  // const email = formData.get("email") as string;
  // const subject = formData.get("subject") as string;
  // const message = formData.get("message") as string;

  try {
    // const response = await resend.emails.send({
    //   from: getEnvs.EMAIL_SENDER_FROM_EMAIL,
    //   to: getEnvs.EMAIL_SENDER_TO_EMAIL,
    //   subject,
    //   replyTo: email,
    //   html: `
    //         <p><strong>Nombre:</strong> ${name}</p>
    //         <p><strong>Email:</strong> ${email}</p>
    //         <p><strong>Mensaje:</strong></p>
    //         <p>${message}</p>
    //     `,
    // });

    console.log("ROUTE HANDLER EMAIL");

    const response = {
      error: null, // Simula una respuesta exitosa
    } as {
      error: Error | null;
    };

    if (response.error) {
      return new Response(JSON.stringify({ error: response.error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
