import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE = "session_id";

export async function GET() {
  const items = await prisma.menuItem.findMany({
    include: {
      category: true,
      tags: true,
      ingredients: true,
    },
  });

  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Get current user from session cookie
    const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const item = await prisma.menuItem.create({
      data: {
        /* ---------- BASIC INFO ---------- */
        nameEn: body.nameEn,
        nameFi: body.nameFi,
        descriptionEn: body.descriptionEn,
        descriptionFi: body.descriptionFi,

        price: body.price,
        discount: body.discount,
        servings: body.servings,
        spicey: body.spicey,
        visibility: body.visibility,

        /* ---------- IMAGE ---------- */
        imageUrl: body.imageUrl ?? null,
        imagePublicId: body.imagePublicId ?? null,

        // Associate with the authenticated user
        user: {
          connect: { id: session.user.id },
        },

        /* ---------- RELATIONS ---------- */
        category: {
          connect: { id: body.categoryId },
        },

        tags: {
          connect: body.tagIds?.map((id: string) => ({ id })) ?? [],
        },

        ingredients: {
          connect: body.ingredientIds?.map((id: string) => ({ id })) ?? [],
        },
      },
      include: {
        category: true,
        tags: true,
        ingredients: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
