"use client";

import { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { MenuFeaturesItems } from "@/types/menu";

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      const res = await fetch("/api/features/categories", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      const json = (await res.json()) as Category[];
      setData(json);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function create(input: MenuFeaturesItems) {
    try {
      const res = await fetch("/api/features/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error("Failed to add category");
      }

      const created = (await res.json()) as Category;

      setData((prev) => [...prev, created]);
    } catch (e: any) {
      throw new Error(e.message ?? "Failed to add category");
    }
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`/api/features/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete category");
      }

      setData((prev) => prev.filter((cat) => cat.id !== id));
    } catch (e: any) {
      throw new Error(e.message ?? "Failed to delete category");
    }
  }

  return {
    data,
    loading,
    error,
    create,
    remove,
    refetch: fetchCategories,
  };
}
