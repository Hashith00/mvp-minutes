import { EmailTemplate } from "@/react-email-starter/emails/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { sendTo, subject, firstName, body } = await req.json();
  console.log(sendTo, subject, firstName, body);
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [sendTo],
      subject: subject,
      react: EmailTemplate({ firstName: firstName }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
