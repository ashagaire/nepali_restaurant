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
    <div className="py-12 container mx-auto max-w-7xl p-4">
      <div className="flex  justify-center mb-8">
        <h2 className="text-3xl font-bold text-yellow-700 mb-4 rounded-lg px-4 py-2 bg-blue-200">
          Most Popular Dishes in Fusion Nepal
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 rounded-lg px-4 py-2 ">
        {menuItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-end  ">
        <Link
          href="/menu"
          className="flex justify-end text-yellow-700 hover:text-yellow-900  font-bold rounded-lg px-4 py-2 bg-blue-200"
        >
          View Full Menu &rarr;
        </Link>
      </div>
    </div>
  );
}
