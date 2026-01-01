import { transporter } from "../email";
export async function sendAdminApprovalRequestEmail(
  requestedEmail: string,
  token: string
) {
  const approveUrl = `${process.env.APP_URL}/api/admin/approve?token=${token}`;

  const message = {
    from: process.env.EMAIL_FROM!,
    to: process.env.SUPER_ADMIN_EMAIL!,
    subject: "New Admin Access Request",
    html: `
      <h2>New Admin Request</h2>
      <p>The following email has requested admin access:</p>
      <p><strong>${requestedEmail}</strong></p>
      <a href="${approveUrl}" style="padding:10px 16px;background:#16a34a;color:white;border-radius:6px;text-decoration:none;">
        Approve Admin
      </a>
      <p>If you did not expect this request, you can ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error("Failed to send admin approval email:", error);
    throw new Error("Failed to send admin approval email");
  }
}
