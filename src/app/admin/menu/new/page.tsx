"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddMenuItemPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Image upload failed");
      const { imageUrl, publicId } = await uploadRes.json();

      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameEn: formData.get("name"),
          descriptionEn: formData.get("description"),
          price: Number(formData.get("price")),
          imageUrl,
          imagePublicId: publicId,
        }),
      });

      if (!res.ok) throw new Error("Failed to add menu item");
      toast.success("Menu item added successfully");
      router.push("/admin"); // back to list
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Add Menu Item</h1>
      <form onSubmit={handleAddItem} encType="multipart/form-data">
        <input name="name" placeholder="Name" required />
        <textarea name="description" placeholder="Description" required />
        <input name="price" type="number" step="0.01" required />
        <input name="file" type="file" accept="image/*" />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Item"}
        </button>
      </form>
    </main>
  );
}
