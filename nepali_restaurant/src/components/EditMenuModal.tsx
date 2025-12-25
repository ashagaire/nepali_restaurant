"use client";

import { useState } from "react";
import type { MenuItem } from "@prisma/client";

type Props = {
  item: MenuItem;
  onClose: () => void;
};

export default function EditMenuModal({ item, onClose }: Props) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price.toString());
  const [description, setDescription] = useState(item.description ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/menu/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        description,
      }),
    });

    onClose();
    window.location.reload();
  }

  return (
    <div style={{ background: "#eee", padding: "1rem" }}>
      <h3>Edit Menu Item</h3>

      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <br />

        <input value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
