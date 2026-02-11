"use client";

import { Layout, Button, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
const { Header } = Layout;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const mode = process.env.NEXT_PUBLIC_NAV_MODE;
    setIsAdminMode(mode === "admin");
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  return (
    <Header
      className="fixed top-0 left-0 w-full shadow-md z-50"
      style={{ backgroundColor: "#ffffff" }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 color-primary">
          <span className="text-2xl">🍽️ Restaurant</span>
        </Link>

        {/* <Link href="/">🍽️ Restaurant</Link> */}

        {/* Actions */}
        <div className="   flex justify-end items-center">
          <div className="hidden lg:flex items-center space-x-1">
            {isAdminMode ? (
              /* admin actions */
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
            ) : (
              /* user actions */
              <Space>
                <Link href="/">
                  <Button type="default">Home</Button>
                </Link>

                <Link href="/">
                  <Button type="default">Buffet</Button>
                </Link>

                <Link href="/">
                  <Button type="default">Alacarte</Button>
                </Link>
                <Link href="/">
                  <Button type="default">About Us</Button>
                </Link>
                <Link href="/">
                  <Button type="default">Contacts</Button>
                </Link>
                <Link href="/">
                  <Button type="default">Reservation</Button>
                </Link>
              </Space>
            )}
          </div>
          <div className="lg:hidden ">
            <button
              onClick={toggleMenu}
              className="nav-menu p-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="w-full mt-2 grid gap-2 grid-cols-1 lg:hidden px-2">
            <div className="grid gap-2 justify-items-start border-t border-gray-300 pt-2 ">
              {isAdminMode ? (
                /* admin actions */
                <Space orientation="vertical">
                  <Link href="/login">
                    <Button type="text">Login</Button>
                  </Link>

                  <Link href="/request-admin">
                    <Button type="text">Request Admin</Button>
                  </Link>

                  <Link href="/admin/menu/add">
                    <Button type="primary">Add Menu</Button>
                  </Link>
                </Space>
              ) : (
                /* user actions */
                <Space orientation="vertical">
                  <Link href="/">
                    <Button type="text">Home</Button>
                  </Link>

                  <Link href="/">
                    <Button type="text">Buffet</Button>
                  </Link>

                  <Link href="/">
                    <Button type="text">Alacarte</Button>
                  </Link>
                  <Link href="/">
                    <Button type="text">About Us</Button>
                  </Link>
                  <Link href="/">
                    <Button type="text">Contacts</Button>
                  </Link>
                  <Link href="/">
                    <Button type="text">Reservation</Button>
                  </Link>
                </Space>
              )}
            </div>
          </div>
        )}
      </nav>
    </Header>
  );
}
