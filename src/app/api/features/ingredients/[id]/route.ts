import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const item = await prisma.ingredient.findUnique({ where: { id } });

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Ingredient  not found" },
        { status: 404 }
      );
    }

    const res = await prisma.ingredient.delete({ where: { id } });
    if (!res)
      return NextResponse.json(
        { success: false, message: "Failed to delete ingredient " },
        { status: 400 }
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 400 }
    );
  }
}
