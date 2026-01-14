"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "antd";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isMenuPage = pathname.startsWith("/admin/menu");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white  shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/menu">
              <Button type="link">Go to Menu</Button>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/menu/new">
              <Button type="primary">Add Menu Item</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">{children}</main>
    </div>
  );
}
