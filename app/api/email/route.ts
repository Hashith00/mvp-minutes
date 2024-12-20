import { EmailTemplate } from "@/react-email-starter/emails/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      sendTo: string;
      subject: string;
      body: string;
      firstName: string;
    };
  }
) {
  const body = await req.json();
  console.log(body);
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [body.sendTo],
      subject: body.subject,
      react: EmailTemplate({ firstName: body.firstName }),
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
