import { transporter } from "./email";

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
  });
}

export async function sendLoginOtpEmail(to: string, code: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM!,
    to,
    subject: "Your login code",
    html: `
      <p>Your one-time login code is:</p>
      <h2>${code}</h2>
      <p>This code expires in 10 minutes.</p>
    `,
  });
}
