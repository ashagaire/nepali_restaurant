"use client";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import MenuItemCard from "@/components/menu/MenuItemCard";
import MenuSection from "@/components/menu/MenuSection";
import SearchOptions from "@/components/menu/SearchOptions";

import LoadingMeanuSection from "@/components/Skeletons/loadingMenuSection";
import { toast } from "react-toastify";

export default function Menu() {
  const { menuItems, loading, error, reload } = useMenuItems();
  if (loading) return <LoadingMeanuSection />;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <section>
      <SearchOptions />
      <div className="bg-gray-50 rounded-md shadow-sm">
        <div className="py-12 container mx-auto max-w-7xl p-4 ">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Menu</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
