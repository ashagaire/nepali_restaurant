import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const admins = await prisma.user.findMany({
      where: { isActive: true, role: { in: ["ADMIN", "SUPER_ADMIN"] } },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
      orderBy: { email: "asc" },
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}
