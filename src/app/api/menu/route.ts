import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuthSession } from "@/lib/auth/getAuthSession";

const SESSION_COOKIE = "session_id";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const tagsParam = searchParams.get("tags");
  const categoriesParam = searchParams.get("categories");

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = limitParam ? parseInt(limitParam, 10) : 0;

  const whereClause: any = {};

  if (categoriesParam) {
    const categories = categoriesParam.split(",").filter((c) => c.trim() !== "");
    if (categories.length > 0) {
      whereClause.categoryId = {
        in: categories,
      };
    }
  }

  if (tagsParam) {
    const tags = tagsParam.split(",").filter((t) => t.trim() !== "");
    if (tags.length > 0) {
      whereClause.tags = {
        some: {
          id: {
            in: tags,
          },
        },
      };
    }
  }

  const queryArgs: any = {
    where: whereClause,
    include: {
      category: true,
      tags: true,
    },
  };

  if (limit > 0) {
    queryArgs.skip = (page - 1) * limit;
    queryArgs.take = limit;
  }

  const [items, total] = await Promise.all([
    prisma.menuItem.findMany(queryArgs),
    prisma.menuItem.count({ where: whereClause }),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    limit: limit > 0 ? limit : total,
    totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Get current user from session (or dev mode bypass)
    const session = await getAuthSession();
    if (!session) {
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

      },
      include: {
        category: true,
        tags: true,
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
