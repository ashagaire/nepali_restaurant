"use client";

import { useState } from "react";
import type { MenuItemFormValues } from "@/types/menu";

export function useCreateMenuItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMenuItem = async (values: MenuItemFormValues) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/menu", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Failed to create menu item");
      }

      return res.json();
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { createMenuItem, loading, error };
}
