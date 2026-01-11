"use client";

import { useMenuItems } from "@/hooks/useMenuItems";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function AdminPage() {
  const { menuItems, loading, error, reload } = useMenuItems();

  async function deleteItem(id: string) {
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Menu item deleted successfully");
      await reload();
    } catch (err) {
      toast.error(error);
    }
  }

  if (loading) return <p>Loading menu items...</p>;
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Admin – Menu Items</h1>
      {menuItems.length === 0 ? (
        <p>No items to show</p>
      ) : (
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.imageUrl && (
                <div>
                  <p>Current image:</p>
                  <img src={item.imageUrl} alt={item.nameEn} width={200} />
                </div>
              )}
              <strong>{item.nameEn}</strong> – €{item.price}
              <ConfirmDialog
                message="Are you sure you want to delete?"
                onConfirm={() => deleteItem(item.id)}
              >
                <button style={{ marginLeft: "1rem" }}>❌ Delete</button>
              </ConfirmDialog>
              <a href={`/admin/menu/${item.id}/edit`}>Edit</a>
            </li>
          ))}
        </ul>
      )}

      {/* Add new item link */}
      <a href="/admin/menu/new">
        <button style={{ marginTop: "2rem" }}>➕ Add New Menu Item</button>
      </a>
    </main>
  );
}
