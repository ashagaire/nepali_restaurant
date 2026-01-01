import { transporter } from "../email";

export async function sendLoginOtpEmail(to: string, code: string) {
  const message = {
    from: process.env.EMAIL_FROM!,
    to,
    subject: "Your Admin Login Code",
    html: `
      <h2>Your Login Code</h2>
      <p>Use the following 6-digit code to log in:</p>
      <h1 style="letter-spacing:4px;">${code}</h1>
      <p>This code will expire in 10 minutes.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error("Failed to send login OTP email:", error);
    throw new Error("Failed to send login OTP email");
  }
}
