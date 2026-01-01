import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { targetAdminId, superAdminId } = body;

  if (!targetAdminId || !superAdminId)
    return new Response("Missing parameters", { status: 400 });

  // Validate SUPER_ADMIN
  const superAdmin = await prisma.user.findUnique({
    where: { id: superAdminId },
  });
  if (!superAdmin || superAdmin.role !== "SUPER_ADMIN") {
    return new Response("Unauthorized", { status: 403 });
  }

  const targetAdmin = await prisma.user.findUnique({
    where: { id: targetAdminId },
  });
  if (!targetAdmin || targetAdmin.role !== "ADMIN") {
    return new Response("Target not found or not an admin", { status: 404 });
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

  return new Response("Admin revoked", { status: 200 });
}
