import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
// import { AuditAction } from "@prisma/client";

const SESSION_COOKIE = "session_id";

export async function POST() {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    // No session cookie → already logged out
    if (!sessionId) {
      return NextResponse.json({
        success: true,
        message: "Already logged out",
      });
    }

    // Fetch session to get userId
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    // Session missing → clear stale cookie
    if (!session) {
      (await cookies()).set({
        name: SESSION_COOKIE,
        value: "",
        expires: new Date(0),
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Already logged out",
      });
    }

    await prisma.$transaction([
      prisma.session.delete({
        where: { id: sessionId },
      }),

      prisma.auditLog.create({
        data: {
          action: "LOGOUT",
          entity: "Session",
          entityId: sessionId,
          userId: session.userId,
          message: "User logged out",
        },
      }),
    ]);

    (await cookies()).set({
      name: SESSION_COOKIE,
      value: "",
      expires: new Date(0),
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to logout",
      },
      { status: 500 }
    );
  }
}
