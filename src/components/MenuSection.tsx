"use client";
import React from "react";
import MenuItemCard from "./MenuItemCard";
import type { MenuItemWithRelations } from "@/app/page";
import LoadingMeanuSection from "./Skeletons/loadingMenuSection";
interface MenuSectionProps {
  menuItems: MenuItemWithRelations[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ menuItems }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
