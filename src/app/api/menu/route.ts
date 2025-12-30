import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.menuItem.findMany({
    include: {
      tags: true,
      ingredients: true,
    },
  });
  return NextResponse.json(items);
}

// export async function POST(req: Request) {
//   const body = await req.json();

//   const item = await prisma.menuItem.create({
//     data: {
//       nameEn: body.nameEn,
//       nameNp: body.nameNp,
//       descriptionEn: body.descriptionEn,
//     },
//   });

//   return NextResponse.json(item);
// }
