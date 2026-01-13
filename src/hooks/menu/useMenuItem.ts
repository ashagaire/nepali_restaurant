"use client";

import { useEffect, useState } from "react";
import type { MenuItemWithRelations } from "@/types/menuItemWithRelations";

export function useMenuItem(id: string) {
  const [data, setData] = useState<MenuItemWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenuItem() {
      try {
        const res = await fetch(`/api/menu/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch menu item");
        }

        const json = (await res.json()) as MenuItemWithRelations;
        setData(json);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItem();
  }, [id]);

  return { data, loading, error };
}
