"use client";
import LoadingMeanuSection from "@/components/Skeletons/loadingMenuSection";
import { toast } from "react-toastify";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { Modal, Button } from "antd";
import { useState, useCallback } from "react";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import AdminMenuItemEditor from "@/components/admin/AdminMenuItemEditor";

export default function AdminMenuPage() {
  const { menuItems, loading, error, reload } = useMenuItems();
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (loading) return <LoadingMeanuSection />;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }
  /** 🔹 Open editor in EDIT mode */
  const handleEdit = useCallback((itemId: string) => {
    setEditingId(itemId);
    setMode("edit");
  }, []);

  /** 🔹 Open editor in ADD mode */
  const handleAdd = useCallback(() => {
    setEditingId(null);
    setMode("add");
  }, []);

  /** 🔹 Close modal */
  const handleClose = useCallback(() => {
    setMode(null);
    setEditingId(null);
  }, []);
  async function handleDelete(id: number) {
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
      <Button type="primary" onClick={handleAdd}>
        Add Menu Item
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {menuItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            showAdminActions={true}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <Modal
        open={!!mode}
        onCancel={handleClose}
        footer={null}
        destroyOnHidden
        width={900}
      >
        {mode && (
          <AdminMenuItemEditor
            mode={mode}
            menuItemId={editingId ?? undefined}
            onSuccess={() => {
              handleClose();
              reload();
            }}
          />
        )}
      </Modal>
    </main>
  );
}
