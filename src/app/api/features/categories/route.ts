import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ---------- GET ALL CATEGORIES ---------- */
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { nameEn: "asc" },
    });

    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch categories" },
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

    const category = await prisma.category.create({
      data: {
        nameEn,
        nameFi,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Failed to create category" },
      { status: 401 }
    );
  }
}
