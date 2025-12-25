"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import type { MenuItemDTO } from "@/types";

export default function EditMenuItemPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return <p>Invalid ID</p>;
  }

  const [item, setItem] = useState<MenuItemDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadItem() {
      const res = await fetch(`/api/menu/${id}`);
      const data = await res.json();
      setItem(data);
      setLoading(false);
    }

    loadItem();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;

    let imageUrl = item.imageUrl;
    let oldImageUrl = item.imageUrl;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.imageUrl;
    }

    await fetch(`/api/menu/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl,
        oldImageUrl,
      }),
    });

    router.push("/admin/menu");
    router.refresh();
  }

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Edit Menu Item</h1>

      {item.imageUrl && (
        <>
          <p>Current image:</p>
          <img src={item.imageUrl} alt={item.name} width={200} />
        </>
      )}

      <form onSubmit={handleSubmit}>
        <input
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          required
        />

        <textarea
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          required
        />

        <input
          type="number"
          step="0.01"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: Number(e.target.value) })}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button type="submit">💾 Save</button>
      </form>
    </main>
  );
}
