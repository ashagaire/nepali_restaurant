"use client";

import { useEffect, useState } from "react";
import type { MenuItemWithRelations } from "@/types/menuItemWithRelations";

interface UseMenuItemOptions {
  enabled?: boolean;
}

export function useMenuItem(id?: string, options?: UseMenuItemOptions) {
  const enabled = options?.enabled ?? true;

  const [data, setData] = useState<MenuItemWithRelations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !enabled) return;

    let cancelled = false;

    async function fetchMenuItem() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/menu/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch menu item");
        }

        const json = (await res.json()) as MenuItemWithRelations;
        if (!cancelled) {
          setData(json);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMenuItem();
    return () => {
      cancelled = true;
    };
  }, [id, enabled]);

  return { data, loading, error };
}
