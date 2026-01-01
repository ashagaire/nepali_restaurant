// route.ts
import { prisma } from "@/lib/prisma";

const targetUser = await prisma.user.findUnique({ where: { id } });

if (!targetUser) throw new Error("User not found");

if (targetUser.role === "SUPER_ADMIN") {
  throw new Error("Cannot delete a super admin");
}

// Option A: downgrade role
await prisma.user.update({
  where: { id },
  data: { role: "USER" },
});

// Option B: soft delete
await prisma.user.update({
  where: { id },
  data: { isActive: false },
});

await prisma.auditLog.create({
  data: {
    action: "DELETE",
    entity: "User",
    entityId: targetAdmin.id,
    message: `SUPER_ADMIN deleted/revoked admin ${targetAdmin.email}`,
    userId: superAdmin.id,
  },
});
