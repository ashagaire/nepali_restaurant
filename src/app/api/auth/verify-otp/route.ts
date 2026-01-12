import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

import { createSession } from "@/lib/auth/session";
import { markLoginCodeUsed } from "@/lib/auth/loginCode";
const SESSION_COOKIE = "session_id";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ success: false, message: "Missing email or OTP" }, { status: 400 });
  }

  try {
    const session = await prisma.$transaction(async (tx) => {
      const loginCode = await tx.loginCode.findFirst({
        where: {
          email,
          code: otp,
          used: false,
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: "desc" },
      });

      if (!loginCode) {
        throw new Error("Invalid or expired OTP");
      }

      const user = await tx.user.findUnique({
        where: { email },
      });

      if (!user || !user.isActive) {
        throw new Error("Unauthorized");
      }

      // Mark OTP as used
      await markLoginCodeUsed(tx, loginCode.id);

      // Create session
      const session = await createSession(tx, user.id);

      // Audit log
      await tx.auditLog.create({
        data: {
          action: "LOGIN",
          entity: "Session",
          entityId: session.id,
          userId: user.id,
          message: "User logged in via OTP",
        },
      });

      return session;
    });

    // Cookie AFTER transaction
    (await cookies()).set({
      name: SESSION_COOKIE,
      value: session.id,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: session.expiresAt,
    });

    return NextResponse.json({ success: true, message: "Logged in" });
  } catch (error) {
    console.error("OTP login failed:", error);
    return NextResponse.json({ success: false, message: "Invalid or expired code" }, { status: 401 });
  }
}
