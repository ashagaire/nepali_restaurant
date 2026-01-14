// export default function Header() {
//   return (
//     <header style={{ padding: "1rem", background: "#eee" }}>
//       <h2>Himalayan Taste</h2>
//     </header>
//   );
// }

"use client";

import { Layout, Button, Space } from "antd";
import Link from "next/link";

const { Header } = Layout;

export default function Navbar() {
  return (
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Logo */}
      <Link href="/">🍽️ Restaurant</Link>

      {/* Actions */}
      <Space>
        <Link href="/login">
          <Button type="default">Login</Button>
        </Link>

        <Link href="/request-admin">
          <Button type="default">Request Admin</Button>
        </Link>

        <Link href="/admin/menu/add">
          <Button type="primary">Add Menu</Button>
        </Link>
      </Space>
    </Header>
  );
}
