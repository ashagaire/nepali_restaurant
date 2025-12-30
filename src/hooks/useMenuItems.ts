import { useEffect, useState } from "react";
import type { MenuItemWithRelations } from "@/types/MenuItemWithRelations";

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItemWithRelations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/menu");

        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return { menuItems, loading, error };
}
