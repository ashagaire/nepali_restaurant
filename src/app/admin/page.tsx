"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { MenuItemDTO } from "@/types";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function AdminPage() {
  const [items, setItems] = useState<MenuItemDTO[]>([]);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      // Upload image
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Image upload failed");
      const { imageUrl } = await uploadRes.json();

      // Add menu item
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          description: formData.get("description"),
          price: Number(formData.get("price")),
          imageUrl,
        }),
      });
      if (!res.ok) throw new Error("Failed to add menu item");

      toast.success("Menu item added successfully");
      form.reset();
      loadItems();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
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

        <ul>
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
        </ul>
      </main>
    </main>
  );
}
