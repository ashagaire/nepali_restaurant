import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuSection from "@/components/MenuSection";
import { prisma } from "@/lib/prisma";
import type { MenuItem as MenuItemDTO, Tag, Ingredient } from "@prisma/client";

export interface MenuItemWithRelations extends MenuItemDTO {
  tags: Tag[];
  ingredients: Ingredient[];
}

export default async function Home() {
  const menuItems: MenuItemWithRelations[] = await prisma.menuItem.findMany({
    include: {
      tags: true,
      ingredients: true,
    },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <Header />
      <h1>Himalayan Taste</h1>
      <p>Authentic Nepali & Himalayan Cuisine</p>
      <MenuSection menuItems={menuItems} />
      <Footer />
    </main>
  );
}
