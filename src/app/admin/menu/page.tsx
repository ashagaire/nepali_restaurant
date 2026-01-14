"use client";
import LoadingMeanuSection from "@/components/Skeletons/loadingMenuSection";
import { toast } from "react-toastify";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { Modal, Button } from "antd";
import { useState, useCallback } from "react";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
// import AdminMenuItemEditor from "@/components/admin/AdminMenuItemEditor";
import { useRouter } from "next/navigation";

export default function AdminMenuPage() {
  const { menuItems, loading, error, reload } = useMenuItems();
  const router = useRouter();

  if (loading) return <LoadingMeanuSection />;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Menu item deleted successfully");
    } catch (err) {
      toast.error("Failed to delete item");
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Admin – Menu</h1>
      <Button type="primary" onClick={() => router.push(`/admin/menu/new`)}>
        Add Menu Item
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {menuItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            showAdminActions={true}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
}
