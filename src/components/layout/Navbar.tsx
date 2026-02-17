"use client";

import { Layout, Button, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import CartButton from "../utils/CartButton";
import Logo from "../utils/Logo";
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
      <nav className="max-w-7xl mx-auto px-4 py-2 sm:py-2 lg:py-4 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Actions */}
        <div className="  flex justify-end items-center">
          <div className="hidden lg:flex items-center space-x-1 ">
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
                <Link href="/menu">
                  <Button type="default">Menu</Button>
                </Link>

                <Link href="/">
                  <Button type="default">Lunch</Button>
                </Link>
                <Link href="/alacarte">
                  <Button type="default">Alacarte</Button>
                </Link>
                <Link href="/reservation">
                  <Button type="default">Reservation</Button>
                </Link>
                <Link href="/about">
                  <Button type="default">About Us</Button>
                </Link>
                <Link href="/contact">
                  <Button type="default">Contacts</Button>
                </Link>
              </Space>
            )}
            <CartButton />
          </div>
          <div className="lg:hidden ">
            <CartButton />
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
          <div className="w-full mt-2 grid gap-2 grid-cols-1 lg:hidden px-2 m">
            <div className="grid gap-2 justify-items-start border-t border-gray-300 pt-2 ">
              {isAdminMode ? (
                /* admin actions */
                <Space orientation="vertical">
                  <Link href="/login">
                    <Button type="text" onClick={toggleMenu}>
                      Login
                    </Button>
                  </Link>

                  <Link href="/request-admin">
                    <Button type="text" onClick={toggleMenu}>
                      Request Admin
                    </Button>
                  </Link>

                  <Link href="/admin/menu/add">
                    <Button type="primary" onClick={toggleMenu}>
                      Add Menu
                    </Button>
                  </Link>
                </Space>
              ) : (
                /* user actions */
                <Space orientation="vertical">
                  <Link href="/">
                    <Button type="text" onClick={toggleMenu}>
                      Home
                    </Button>
                  </Link>

                  <Link href="/">
                    <Button type="text" onClick={toggleMenu}>
                      Buffet
                    </Button>
                  </Link>

                  <Link href="/alacarte">
                    <Button type="text" onClick={toggleMenu}>
                      Alacarte
                    </Button>
                  </Link>
                  <Link href="/reservation">
                    <Button type="text" onClick={toggleMenu}>
                      Reservation
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button type="text" onClick={toggleMenu}>
                      About Us
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button type="text" onClick={toggleMenu}>
                      Contacts
                    </Button>
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
