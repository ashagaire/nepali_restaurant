"use client";

import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { MenuFeaturesItems } from "@/types/menu";

export function useIngredients() {
  const [data, setData] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    try {
      setLoading(true);
      const res = await fetch("/api/features/ingredients", {
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

  async function create(input: MenuFeaturesItems) {
    try {
      const res = await fetch("/api/features/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        throw new Error("Failed to add ingredient");
      }
      const created = (await res.json()) as Ingredient;
      setData((prev) => [...prev, created]);
    } catch (e: any) {
      throw new Error(e.message ?? "Failed to add ingredient");
    }
  }
  async function remove(id: string) {
    try {
      const res = await fetch(`/api/features/ingredients/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to delete ingredient");
      }
      setData((prev) => prev.filter((ing) => ing.id !== id));
    } catch (e: any) {
      throw new Error(e.message ?? "Failed to delete ingredient");
    }
  }

  return { data, loading, error, create, remove, refetch: fetchIngredients };
}
