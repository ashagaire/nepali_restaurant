import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import cloudinary from "@/lib/cloudinary";

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

  const existing = await prisma.menuItem.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 🧹 DELETE OLD IMAGE if replaced
  if (
    body.imagePublicId &&
    existing.imagePublicId &&
    body.imagePublicId !== existing.imagePublicId
  ) {
    await cloudinary.uploader.destroy(existing.imagePublicId);
  }

  const item = await prisma.menuItem.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      price: body.price,
      description: body.description,
      imageUrl: body.imageUrl,
      imagePublicId: body.imagePublicId,
    },
  });

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
  if (item.imagePublicId) {
    await cloudinary.uploader.destroy(item.imagePublicId);
  }
  await prisma.menuItem.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
