"use client";

import { useEffect, useState } from "react";
import type { User as UserDTO, UserRole } from "@prisma/client";

export function useAdmins() {
  const [admins, setAdmins] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadAdmins() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to load admins");
      const data: UserDTO[] = await res.json();
      setAdmins(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  return { admins, loading, error, reload: loadAdmins };
}
