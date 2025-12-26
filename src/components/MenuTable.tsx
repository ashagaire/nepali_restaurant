"use client";

import { useState } from "react";
import type { MenuItem } from "@prisma/client";
import EditMenuModal from "./EditMenuModal";
import ConfirmDialog from "@/components/ConfirmDialog";

type Props = {
  items: MenuItem[];
};

export default function MenuTable({ items }: Props) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  async function handleDelete(id: number) {
    await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (€)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toString()}</td>
              <td>
                <button
                  onClick={() => {
                    window.location.href = `/admin/menu/${item.id}/edit`;
                  }}
                >
                  ✏️ Edit
                </button>
                {/* <button onClick={() => handleDelete(item.id)}>Delete</button> */}
                <ConfirmDialog
                  message="Are you sure you want to delete?"
                  onConfirm={() => handleDelete(item.id)}
                >
                  <button style={{ marginLeft: "1rem" }}>❌ Delete</button>
                </ConfirmDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <EditMenuModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
