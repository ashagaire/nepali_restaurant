import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { targetAdminId, superAdminId } = body;

  if (!targetAdminId || !superAdminId)
    return NextResponse.json(
      { success: false, message: "Missing parameters" },
      { status: 400 }
    );

  // Validate SUPER_ADMIN
  const superAdmin = await prisma.user.findUnique({
    where: { id: superAdminId },
  });
  if (!superAdmin || superAdmin.role !== "SUPER_ADMIN") {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 403 }
    );
  }

  const targetAdmin = await prisma.user.findUnique({
    where: { id: targetAdminId },
  });
  if (!targetAdmin || targetAdmin.role !== "ADMIN") {
    return NextResponse.json(
      { success: false, message: "Target not found or not an admin" },
      { status: 404 }
    );
  }

  // Revoke (soft delete by changing role)
  await prisma.user.update({
    where: { id: targetAdminId },
    data: { isActive: false },
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      action: "DELETE",
      entity: "User",
      entityId: targetAdmin.id,
      message: `SUPER_ADMIN revoked admin ${targetAdmin.email} to not active.`,
      userId: superAdmin.id,
    },
  });

  return NextResponse.json({ success: true, message: "Admin revoked" });
}
