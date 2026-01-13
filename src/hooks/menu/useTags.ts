"use client";

import { useEffect, useState } from "react";
import { Tag } from "@prisma/client";

export function useTags() {
  const [data, setData] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("/api/tags", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tags");
        }

        const json = (await res.json()) as Tag[];
        setData(json);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  return { data, loading, error };
}
