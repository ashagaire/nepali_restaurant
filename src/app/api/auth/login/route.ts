import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOTP, getOtpExpiry } from "@/lib/auth/otp";
import { sendLoginOtpEmail } from "@/lib/email/sendEmail";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
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

  const code = generateOTP();

  await prisma.loginCode.create({
    data: {
      email,
      code,
      expiresAt: getOtpExpiry(10),
    },
  });

  await sendLoginOtpEmail(email, code);

  return NextResponse.json({
    success: true,
    message: "OTP sent to email",
  });
}
