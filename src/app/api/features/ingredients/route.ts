import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ingredient = await prisma.ingredient.findMany({
      orderBy: { nameEn: "asc" },
    });

    return NextResponse.json(ingredient);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch ingredient" },
      { status: 500 }
    );
  }
}

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

    const ingredient = await prisma.ingredient.create({
      data: {
        nameEn,
        nameFi,
      },
    });

    return NextResponse.json(ingredient, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Failed to create ingredient" },
      { status: 401 }
    );
  }
}
