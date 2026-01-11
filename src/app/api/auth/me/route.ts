// app/api/auth/me/route.ts
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionId = (await cookies()).get("session_id")?.value;

  if (!sessionId) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
    },
  });
}
