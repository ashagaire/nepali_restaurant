import { prisma } from "@/lib/prisma";
import type { MenuItem as MenuItemType } from "@prisma/client";

import MenuTable from "@/components/MenuTable";

export default async function AdminMenuPage() {
  const items: MenuItemType[] = await prisma.menuItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Admin – Menu</h1>
      <MenuTable items={items} />
    </main>
  );
}
