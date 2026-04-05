"use client";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import MenuItemCard from "@/components/menu/MenuItemCard";
import MenuSection from "@/components/menu/MenuSection";
import SearchOptions from "@/components/menu/SearchOptions";
import { Button, Typography } from "@mui/material";

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
      <div className=" rounded-md shadow-sm ">
        <div className="py-6 container mx-auto max-w-7xl px-4  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
