import { prisma } from "@/lib/prisma";
import type { MenuItem as MenuItemType } from "@prisma/client";
// import type { MenuItemDTO } from "@/types";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const menuItems: MenuItemType[] = await prisma.menuItem.findMany();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Our Menu</h1>
      <ul className="list-disc pl-6">
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} width={200} />
            )}
            <strong>{item.name}</strong> – €{item.price.toString()}
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
