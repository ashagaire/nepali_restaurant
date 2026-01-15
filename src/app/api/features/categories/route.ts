import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ---------- GET ALL CATEGORIES ---------- */
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { nameEn: "asc" },
    });

    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

/* ---------- CREATE CATEGORY ---------- */
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

    // const category = await prisma.category.create({
    //   data: {
    //     nameEn,
    //     nameFi,
    //   },
    // });
    // return NextResponse.json(category, { status: 201 });
    const result = await prisma.$transaction(async (tx) => {
      // Find admin request

      // const request = await tx.adminRequest.create({
      //   data: { email, token, status: AdminRequestStatus.PENDING, expiresAt },
      // });
      const category = await tx.category.create({
        data: {
          nameEn,
          nameFi,
        },
      });
      // Audit log
      await tx.auditLog.create({
        data: {
          action: "CREATE",
          entity: "Category",
          entityId: category.id,
          message: `Category add  ${nameEn} `,
          userId: "20b40344-d28f-4416-8076-44e5923df658", // system for not-yet-existing user
        },
      });
      return category;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err?.message || "Failed to create category",
        error: String(err),
      },
      { status: 500 }
    );
  }
}
