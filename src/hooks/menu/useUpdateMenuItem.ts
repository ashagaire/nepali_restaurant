"use client";

import { useState } from "react";
import type { MenuItemFormValues } from "@/types/menu";

export function useUpdateMenuItem(menuItemId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMenuItem = async (values: MenuItemFormValues) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/menu/${menuItemId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Failed to update menu item");
      }

      return res.json();
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { updateMenuItem, loading, error };
}
