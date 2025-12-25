import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const item = await prisma.menuItem.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(item);
}

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
      imageUrl: body.imageUrl,
    },
  });

  if (body.oldImageUrl && body.oldImageUrl !== body.imageUrl) {
    const filePath = path.join(process.cwd(), "public", body.oldImageUrl);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete old image:", err.message);
      }
    });
  }

  return NextResponse.json(item);
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const item = await prisma.menuItem.findUnique({
    where: { id: Number(id) },
  });

  if (!item) {
    return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
  }
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.menuItem.delete({
    where: { id: Number(id) },
  });

  if (item.imageUrl) {
    const filePath = path.join(process.cwd(), "public", item.imageUrl);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete image:", err.message);
      }
    });
  }

  return NextResponse.json({ success: true });
}
