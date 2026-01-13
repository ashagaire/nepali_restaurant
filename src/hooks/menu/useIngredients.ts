"use client";

import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";

export function useIngredients() {
  const [data, setData] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const res = await fetch("/api/ingredients", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch ingredients");
        }

        const json = (await res.json()) as Ingredient[];
        setData(json);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { data, loading, error };
}
