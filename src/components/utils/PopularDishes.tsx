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
    <section className="bg-gray-50 ">
      <div className="py-12 container mx-auto max-w-7xl p-4 ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 ">Most Popular Dishes</h2>
          <Link
            href="/menu"
            className="text-primary-700 hover:text-primary-800 font-medium"
          >
            View Full Menu &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
