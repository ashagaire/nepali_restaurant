"use client";

import MenuItemCard from "@/components/menu/MenuItemCard";
import LoadingMeanuSection from "../Skeletons/loadingMenuSection";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import { toast } from "react-toastify";
import Link from "next/link";

export default function PopularDishes() {
  const { menuItems, loading, error } = useMenuItems();
  if (loading) return <LoadingMeanuSection />;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="py-4 container mx-auto max-w-7xl ">
      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12   justify-content-center ">
        {menuItems.slice(0, 3).map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-end  ">
        <Link
          href="/menu"
          className="flex justify-end text-yellow-600 hover:text-yellow-700  font-bold rounded-lg px-4 py-2 bg-orange-100 mt-2 transition-colors duration-300"
        >
          View Full Menu &rarr;
        </Link>
      </div>
    </div>
  );
}
