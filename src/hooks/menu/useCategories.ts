"use client";

import { useEffect, useState } from "react";
import { Category } from "@prisma/client";

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const json = (await res.json()) as Category[];
        setData(json);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { data, loading, error };
}
