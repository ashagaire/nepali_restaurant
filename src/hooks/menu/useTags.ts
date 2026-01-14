"use client";

import { useEffect, useState } from "react";
import { Tag } from "@prisma/client";
import { MenuFeaturesItems } from "@/types/menu";

export function useTags() {
  const [data, setData] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    try {
      const res = await fetch("/api/features/tags", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch tags");
      }

      const json = (await res.json()) as Tag[];
      setData(json);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  async function create(input: MenuFeaturesItems) {
    try {
      const res = await fetch("/api/features/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        throw new Error("Failed to add tag");
      }
      const created = (await res.json()) as Tag;

      setData((prev) => [...prev, created]);
    } catch (e: any) {
      throw new Error(e.message ?? "Failed to add tag");
    }
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`/api/features/tags/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to delete tag");
      }
      setData((prev) => prev.filter((tag) => tag.id !== id));
    } catch (e: any) {
      throw new Error(e.message ?? "Failed to delete tag");
    }
  }

  return { data, loading, error, create, remove, refetch: fetchTags };
}
