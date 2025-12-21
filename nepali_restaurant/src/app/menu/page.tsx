import { prisma } from "@/lib/prisma";
import type { MenuItemModel as MenuItem } from "@/lib/generated/prisma/models/MenuItem";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const menuItems = await prisma.menuItem.findMany();
  console.log("Menu Items:", menuItems);
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Our Menu</h1>
      <h1>why no text</h1>
      <ul className="list-disc pl-6">
        {menuItems.map((item: MenuItem) => (
          <li key={item.id}>
            <strong>{item.name}</strong> – €{item.price.toString()}
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
