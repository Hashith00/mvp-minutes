import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello world",
    react: EmailTemplate({ firstName: "John" }),
  });

  if (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
