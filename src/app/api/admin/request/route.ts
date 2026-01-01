import { NextResponse } from "next/server";
import { PrismaClient, AdminRequestStatus } from "@prisma/client";
import crypto from "crypto";
import { adminRequestTemplate } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/sendEmail";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const existingRequest = await prisma.adminRequest.findUnique({
    where: { email },
  });

  if (
    existingRequest &&
    existingRequest.status === AdminRequestStatus.PENDING
  ) {
    return NextResponse.json(
      { error: "Admin request already pending" },
      { status: 400 }
    );
  }

  // Create admin request
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Find admin request

      const request = await prisma.adminRequest.create({
        data: { email, token, status: AdminRequestStatus.PENDING, expiresAt },
      });
      // Audit log
      await prisma.auditLog.create({
        data: {
          action: "CREATE",
          entity: "AdminRequest",
          entityId: request.id,
          message: `Admin request created for ${email}`,
          userId: "SYSTEM", // system for not-yet-existing user
        },
      });
      return {
        adminEmail: email,
      };
    });

    // Send email to SUPER_ADMIN
    const approveUrl = `${process.env.APP_URL}/api/admin/approve?token=${token}`;
    const rejectionUrl = `${process.env.APP_URL}/api/admin/reject?token=${token}`;
    const emailTemplate = adminRequestTemplate(
      result.adminEmail,
      approveUrl,
      rejectionUrl
    );
    await sendEmail(
      process.env.SUPER_ADMIN_EMAIL!,
      emailTemplate.subject,
      emailTemplate.html
    );

    return new Response("Admin request submitted", { status: 200 });
  } catch (error) {
    console.error("Admin approval failed:", error);
    return new Response("Admin approval failed", { status: 500 });
  }
}
