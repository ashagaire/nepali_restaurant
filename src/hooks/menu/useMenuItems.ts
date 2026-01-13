import { useEffect, useState } from "react";
import type { MenuItemWithRelations } from "@/types/menuItemWithRelations";

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItemWithRelations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/menu");
      if (!res.ok) throw new Error("Failed to load menu items");
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return { menuItems, loading, error, reload: loadItems };
}
