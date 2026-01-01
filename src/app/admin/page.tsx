"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import type { MenuItem as MenuItemDTO } from "@prisma/client";

import ConfirmDialog from "@/components/ConfirmDialog";

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    redirect("/login");
  }
  if (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN") {
    redirect("/");
  }
  const [items, setItems] = useState<MenuItemDTO[]>([]);

  async function loadItems() {
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      toast.error("Failed to load menu items");
    }
  }
  useEffect(() => {
    loadItems();
  }, []);

  async function deleteItem(id: number) {
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Menu item deleted successfully");
      loadItems();
    } catch (err) {
      toast.error("Failed to delete item");
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Upload image
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Image upload failed");
      const { imageUrl, publicId } = await uploadRes.json();

      // Add menu item
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          description: formData.get("description"),
          price: Number(formData.get("price")),
          imageUrl: imageUrl,
          imagePublicId: publicId,
        }),
      });
      if (!res.ok) throw new Error("Failed to add menu item");

      toast.success("Menu item added successfully");
      form.reset();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Admin – Add Menu Item</h1>

      <form onSubmit={handleAddItem} encType="multipart/form-data">
        <input name="name" placeholder="Name" required />
        <textarea name="description" placeholder="Description" required />
        <input name="price" type="number" step="0.01" required />
        <input name="file" type="file" accept="image/*" />
        <button type="submit">Add Item</button>
      </form>

      <main style={{ padding: "2rem" }}>
        <h1>Admin – Menu Items</h1>

        {/* <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.imageUrl && (
                <div>
                  <p>Current image:</p>
                  <img src={item.imageUrl} alt={item.name} width={200} />
                </div>
              )}
              <strong>{item.name}</strong> – €{item.price}
              <ConfirmDialog
                message="Are you sure you want to delete?"
                onConfirm={() => deleteItem(item.id)}
              >
                <button style={{ marginLeft: "1rem" }}>❌ Delete</button>
              </ConfirmDialog>
              <a href={`/admin/menu/${item.id}/edit`}>Edit</a>
            </li>
          ))}
        </ul> */}
      </main>
    </main>
  );
}
