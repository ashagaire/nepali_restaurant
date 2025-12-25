"use client";

import { useEffect, useState } from "react";
// import type { MenuItem as MenuItemType } from "@prisma/client";
import type { MenuItemDTO } from "@/types";

export default function AdminPage() {
  const [items, setItems] = useState<MenuItemDTO[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const res = await fetch("/api/menu");
    const data = await res.json();
    setItems(data);
  }

  async function deleteItem(id: number) {
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { imageUrl } = await uploadRes.json();

    await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        imageUrl,
      }),
    });

    form.reset();
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
              <button onClick={() => deleteItem(item.id)}>❌ Delete</button>
              <a href={`/admin/edit/${item.id}`}>Edit</a>
            </li>
          ))}
        </ul>
      </main>
    </main>
  );
}
