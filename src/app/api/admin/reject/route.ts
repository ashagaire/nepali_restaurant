import { sendEmail } from "@/lib/email/sendEmail";
import { adminRejectedTemplate } from "@/lib/email/templates";
import { PrismaClient, AdminRequestStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { token, superAdminId, reason } = body;

  if (!token || !superAdminId) {
    return new Response("Missing parameters", { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Validate SUPER_ADMIN
      const superAdmin = await tx.user.findUnique({
        where: { id: superAdminId },
      });

      if (!superAdmin || superAdmin.role !== "SUPER_ADMIN") {
        throw new Error("Unauthorized");
      }

      // 2. Find admin request
      const request = await tx.adminRequest.findUnique({
        where: { token },
      });

      if (!request || request.status !== "PENDING") {
        throw new Error("Invalid or already processed request");
      }

      // 3. Update request to REJECTED
      const updatedRequest = await tx.adminRequest.update({
        where: { id: request.id },
        data: {
          status: "REJECTED",
        },
      });

      // 4. Audit log
      await tx.auditLog.create({
        data: {
          action: "UPDATE",
          entity: "AdminRequest",
          entityId: request.id,
          message:
            reason ??
            `Admin request for ${request.email} was rejected by SUPER_ADMIN`,
          userId: superAdmin.id,
        },
      });

      return {
        email: updatedRequest.email,
      };
    });

    // 5. Send rejection email (outside transaction)
    const emailTemplate = adminRejectedTemplate(result.email);
    await sendEmail(result.email, emailTemplate.subject, emailTemplate.html);

    return new Response("Admin request rejected", { status: 200 });
  } catch (error) {
    console.error("Admin rejection failed:", error);
    return new Response("Failed to reject admin request", { status: 500 });
  }
}
