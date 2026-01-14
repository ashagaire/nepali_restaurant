"use client";
import LoadingMeanuSection from "@/components/Skeletons/loadingMenuSection";
import { toast } from "react-toastify";
import MenuItemCard from "@/components/menu/MenuItemCard";
import CategoryBlock from "@/components/menu/CategoryBlock";
import TagBlock from "@/components/menu/TagBlock";
import IngredientBlock from "@/components/menu/IngredientBlock";
import { useMenuItems } from "@/hooks/menu/useMenuItems";

export default function AdminMenuPage() {
  const { menuItems, loading, error, reload } = useMenuItems();

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
      <h1>Menu Page for Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CategoryBlock />
        <TagBlock />
        <IngredientBlock />
      </div>
      <div>
        {" "}
        <p> Menu search section </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
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
