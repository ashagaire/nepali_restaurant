import { NextResponse } from "next/server";
import { PrismaClient, AdminRequestStatus, UserRole } from "@prisma/client";
import { sendAdminApprovedEmail } from "@/lib/email/templates/sendAdminApprovedEmail";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const request = await prisma.adminRequest.findUnique({
    where: { token },
  });

  if (
    !request ||
    request.status !== AdminRequestStatus.PENDING ||
    request.expiresAt < new Date()
  ) {
    return NextResponse.json(
      { error: "Token expired or invalid" },
      { status: 400 }
    );
  }

  await prisma.$transaction([
    prisma.user.create({
      data: {
        email: request.email,
        role: UserRole.ADMIN,
      },
    }),
    prisma.adminRequest.update({
      where: { id: request.id },
      data: { status: AdminRequestStatus.APPROVED },
    }),
  ]);

  // 4️⃣ Create audit log entry
  await prisma.auditLog.create({
    data: {
      action: "APPROVE_ADMIN", // enum AuditAction
      entity: "User", // affected entity
      entityId: newAdmin.id, // the created admin ID
      message: `SUPER_ADMIN approved admin ${newAdmin.email}`, // optional
      userId: superAdmin.id, // actor performing action
    },
  });

  await sendAdminApprovedEmail(request.email);

  return NextResponse.redirect(
    `${process.env.APP_URL}/admin/login?approved=true`
  );
}
