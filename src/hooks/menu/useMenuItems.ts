import { useEffect, useState, useCallback } from "react";
import type { MenuItemWithRelations } from "@/types/menuItemWithRelations";

interface UseMenuItemsProps {
  page?: number;
  limit?: number;
  tags?: string[];
}

export function useMenuItems({ page, limit, tags }: UseMenuItemsProps = {}) {
  const [menuItems, setMenuItems] = useState<MenuItemWithRelations[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stringify tags to use in dependency array
  const tagsStr = JSON.stringify(tags || []);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      if (limit) params.append("limit", limit.toString());
      if (tags && tags.length > 0) params.append("tags", tags.join(","));

      const qs = params.toString();
      const url = qs ? `/api/menu?${qs}` : "/api/menu";

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load menu items");
      const data = await res.json();
      setMenuItems(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [page, limit, tagsStr]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return { menuItems, total, totalPages, loading, error, reload: loadItems };
}
