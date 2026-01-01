import { transporter } from "../email";

export async function sendAdminRejectionEmail(to: string) {
  const message = {
    from: process.env.EMAIL_FROM!,
    to,
    subject: "Admin Access Rejected",
    html: `
      <h2>Admin Access Rejected ❌</h2>
      <p>Your admin access request has been rejected.</p>
    <p>If you believe this is a mistake, please contact support.</p>
    `,
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error("Failed to send admin rejection email:", error);
    throw new Error("Failed to send admin rejection email");
  }
}
