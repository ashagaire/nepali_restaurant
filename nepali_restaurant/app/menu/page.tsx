import { prisma } from "@/lib/prisma";

export default async function MenuPage() {
  const menuItems = await prisma.menuItem.findMany();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Our Menu</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> – €{item.price}
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
