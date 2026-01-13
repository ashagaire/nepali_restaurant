import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const item = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
        tags: true,
        ingredients: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("GET /api/menu/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 400 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const existing = await prisma.menuItem.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    // 🧹 Delete old Cloudinary image if replaced
    if (
      body.imagePublicId &&
      existing.imagePublicId &&
      body.imagePublicId !== existing.imagePublicId
    ) {
      await cloudinary.uploader.destroy(existing.imagePublicId);
    }

    // 🔁 Update menu item including relations
    const updated = await prisma.menuItem.update({
      where: { id },
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

        /* ---------- RELATIONS ---------- */
        category: { connect: { id: body.categoryId } },
        tags: { set: body.tagIds?.map((id: string) => ({ id })) ?? [] },
        ingredients: {
          set: body.ingredientIds?.map((id: string) => ({ id })) ?? [],
        },
      },
      include: {
        category: true,
        tags: true,
        ingredients: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/menu/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const item = await prisma.menuItem.findUnique({ where: { id } });

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    await prisma.menuItem.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/menu/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 400 }
    );
  }
}
