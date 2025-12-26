import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.menuItem.findMany({
    include: {
      tags: true,
    },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();

  const item = await prisma.menuItem.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl,
      imagePublicId: body.imagePublicId,
    },
  });

  return NextResponse.json(item);
}
