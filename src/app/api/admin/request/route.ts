import { NextResponse } from "next/server";
import { PrismaClient, AdminRequestStatus } from "@prisma/client";
import { sendAdminApprovalRequestEmail } from "../../../../lib/email/templates/sendAdminApprovalRequestEmail";
import crypto from "crypto";

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

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await prisma.adminRequest.upsert({
    where: { email },
    update: {
      token,
      status: AdminRequestStatus.PENDING,
      expiresAt,
    },
    create: {
      email,
      token,
      expiresAt,
    },
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
  await sendAdminApprovalRequestEmail(email, token);

  return NextResponse.json({
    message: "Admin request submitted",
  });
}
