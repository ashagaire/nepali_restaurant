import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const item = await prisma.category.findUnique({ where: { id } });

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    const res = await prisma.category.delete({ where: { id } });
    if (!res)
      return NextResponse.json(
        { success: false, message: "Failed to delete category" },
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
