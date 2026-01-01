import { NextRequest } from "next/server";
import { prisma } from "./prisma";

export async function assertSuperAdmin(req: NextRequest, userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized: Only super admins allowed");
  }
  return user;
}
