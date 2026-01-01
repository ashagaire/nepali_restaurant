import { NextResponse } from "next/server";
import { sendAdminRejectionEmail } from "@/lib/email/templates/sendAdminRejectionEmail";

import { PrismaClient, AdminRequestStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  await prisma.adminRequest.update({
    where: { email },
    data: { status: AdminRequestStatus.REJECTED },
  });

  await prisma.auditLog.create({
    data: {
      action: "CREATE",
      entity: "AdminRequest",
      entityId: adminRequest.id,
      message: `Admin request created for ${adminRequest.email}`,
      userId: requestingUser?.id ?? "system", // null/placeholder if user not in system yet
    },
  });

  await sendAdminRejectionEmail(email);

  return NextResponse.json({ message: "Request rejected" });
}
