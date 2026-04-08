// app/api/auth/me/route.ts
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth/getAuthSession";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
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
