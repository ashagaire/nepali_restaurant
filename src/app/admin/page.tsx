"use client";

import { useMenuItems } from "@/hooks/menu/useMenuItems";
import Link from "next/link";
import { Button } from "antd";

export default function AdminPage() {
  // const { menuItems, loading, error, reload } = useMenuItems();

  return (
    <main style={{ padding: "2rem" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center ">
        <div className="flex items-center gap-4">
          <Link href="/admin/menu">
            <Button type="link">Go to Menu</Button>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button type="link">Go to Users</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/menu/new">
            <Button type="primary">Add Menu Item</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
