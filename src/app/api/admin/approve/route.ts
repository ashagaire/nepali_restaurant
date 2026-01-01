import { NextResponse } from "next/server";
import { PrismaClient, AdminRequestStatus, UserRole } from "@prisma/client";
import { adminApprovedTemplate } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/sendEmail";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Find admin request

      const request = await tx.adminRequest.findUnique({
        where: { token },
      });

      if (
        !request ||
        request.status !== AdminRequestStatus.PENDING ||
        request.expiresAt < new Date()
      ) {
        throw new Error("Invalid or expired request");
      }

      // Check if user already exists
      const existingUser = await tx.user.findUnique({
        where: { email: request.email },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      // Create admin user
      const newAdmin = await tx.user.create({
        data: {
          email: request.email,
          role: UserRole.ADMIN,
        },
      });

      // Update admin request
      await tx.adminRequest.update({
        where: { id: request.id },
        data: { status: AdminRequestStatus.APPROVED },
      });

      // Audit log
      await tx.auditLog.create({
        data: {
          action: "APPROVE_ADMIN",
          entity: "User",
          entityId: newAdmin.id,
          message: `SUPER_ADMIN approved admin ${newAdmin.email}`,
          userId: process.env.SUPER_ADMIN_ID!,
        },
      });

      return {
        adminEmail: newAdmin.email,
      };
    });

    // Send email (outside transaction)
    const emailTemplate = adminApprovedTemplate(result.adminEmail);
    await sendEmail(
      result.adminEmail,
      emailTemplate.subject,
      emailTemplate.html
    );

    return new Response("Admin approved successfully", { status: 200 });
  } catch (error) {
    console.error("Admin approval failed:", error);
    return new Response("Admin approval failed", { status: 500 });
  }
}
