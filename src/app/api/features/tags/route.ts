import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ---------- GET ALL CATEGORIES ---------- */
export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { nameEn: "asc" },
    });

    return NextResponse.json(tags);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

/* ---------- CREATE CATEGORY ---------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nameEn, nameFi } = body;

    if (!nameEn || !nameFi) {
      return NextResponse.json(
        { message: "nameEn and nameFi are required" },
        { status: 400 }
      );
    }

    const tags = await prisma.tag.create({
      data: {
        nameEn,
        nameFi,
      },
    });

    return NextResponse.json(tags, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Failed to create tags" },
      { status: 401 }
    );
  }
}
