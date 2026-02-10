"use client";

import MenuItemCard from "./MenuItemCard";
import LoadingMeanuSection from "../Skeletons/loadingMenuSection";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import { toast } from "react-toastify";

export default function MenuSection() {
  const { menuItems, loading, error } = useMenuItems();

  if (loading) return <LoadingMeanuSection />;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className=" bg-gray-50">
      <div className="container mx-auto max-w-7xl p-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
