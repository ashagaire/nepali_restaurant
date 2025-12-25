import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const item = await prisma.menuItem.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      price: body.price,
      description: body.description,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.menuItem.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
