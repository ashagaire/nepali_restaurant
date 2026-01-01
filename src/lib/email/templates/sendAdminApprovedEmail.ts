import { transporter } from "../email";

export async function sendAdminApprovedEmail(to: string) {
  const loginUrl = `${process.env.APP_URL}/admin/login`;

  const message = {
    from: process.env.EMAIL_FROM!,
    to,
    subject: "Admin Access Approved",
    html: `
      <h2>Admin Access Approved ✅</h2>
      <p>Your admin access has been approved.</p>
      <a href="${loginUrl}" style="padding:10px 16px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;">
        Go to Admin Login
      </a>
      <p>You will receive a one-time login code when you log in.</p>
    `,
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error("Failed to send admin approved email:", error);
    throw new Error("Failed to send admin approved email");
  }
}
