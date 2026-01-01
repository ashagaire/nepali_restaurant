import nodemailer from "nodemailer";

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Validate email configuration at startup
 */
function validateEmailConfig(): void {
  //   if (isDevelopment) {
  //     console.log(
  //       "⚠️ Development mode: Email validation skipped (emails optional)"
  //     );
  //     return;
  //   }

  //   const isGitHubActions = process.env.CI === "true" && !process.env.VERCEL;
  //   if (isGitHubActions) {
  //     console.log("⚠️ CI mode: Email validation skipped");
  //     return;
  //   }

  if (!process.env.BREVO_SMTP_LOGIN) {
    throw new Error("BREVO_SMTP_LOGIN is not configured");
  }

  if (!process.env.BREVO_SMTP_KEY) {
    throw new Error("BREVO_SMTP_KEY is not configured");
  }

  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM is not configured");
  }

  // if (!process.env.APP_URL) {
  //   throw new Error("APP_URL is not configured");
  // }

  console.log("✅ Email configuration validated");
}

validateEmailConfig();

/**
 * SMTP Transporter
 */
export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN!,
    pass: process.env.BREVO_SMTP_KEY!,
  },
});
