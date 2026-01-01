import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json(
      { error: "Missing email or OTP" },
      { status: 400 }
    );
  }

  const otpRecord = await prisma.otpToken.findFirst({
    where: {
      email,
      code: otp,
      expiresAt: { gt: new Date() },
    },
  });

  if (!otpRecord) {
    return NextResponse.json(
      { error: "Invalid or expired OTP" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.isActive) {
    return NextResponse.json(
      { error: "User not allowed to login" },
      { status: 403 }
    );
  }

  // ✅ Create session
  await createSession(user.id);

  // OTP is single-use
  await prisma.otpToken.delete({
    where: { id: otpRecord.id },
  });

  return NextResponse.json({
    success: true,
    message: "Logged in successfully",
  });
}
