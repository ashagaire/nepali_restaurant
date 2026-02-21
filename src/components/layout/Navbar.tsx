"use client";

import { Layout, Space } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import CartButton from "../utils/CartButton";
import Logo from "../utils/Logo";
const { Header } = Layout;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mode = process.env.NEXT_PUBLIC_NAV_MODE;
    setIsAdminMode(mode === "admin");
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  return (
    <Header
      className="fixed top-0 left-0 w-full shadow-md z-50 "
      style={{ backgroundColor: "#ffffff" }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-2 sm:py-2 md:py-4 lg:py-4 flex flex-wrap justify-between items-center relative">
        {/* Logo */}
        <Logo />

        {/* Actions - centered nav links */}
        <div className=" hidden lg:flex items-center justify-center">
          <div className="flex items-center text-xl space-x-2 sm:space-x-4">
            {isAdminMode ? (
              /* admin actions */
              <Space>
                <Link
                  href="/login"
                  className={`nav-link px-2 py-1 ${pathname === "/login" ? "active" : ""}`}
                >
                  Login
                </Link>
                <Link
                  href="/request-admin"
                  className={`nav-link px-2 py-1 ${pathname === "/request-admin" ? "active" : ""}`}
                >
                  Request Admin
                </Link>
                <Link
                  href="/admin/menu/add"
                  className={`nav-link px-2 py-1 ${pathname.startsWith("/admin/menu/add") ? "active" : ""}`}
                >
                  Add Menu
                </Link>
              </Space>
            ) : (
              /* user actions */
              <Space>
                <Link
                  href="/menu"
                  className={`nav-link px-2 py-1 ${pathname === "/menu" ? "active" : ""}`}
                >
                  Menu
                </Link>
                <Link
                  href="/lunch"
                  className={`nav-link px-2 py-1 ${pathname === "/lunch" ? "active" : ""}`}
                >
                  Lunch
                </Link>
                <Link
                  href="/alacarte"
                  className={`nav-link px-2 py-1 ${pathname === "/alacarte" ? "active" : ""}`}
                >
                  Alacarte
                </Link>
                <Link
                  href="/reservation"
                  className={`nav-link px-2 py-1 ${pathname === "/reservation" ? "active" : ""}`}
                >
                  Reservation
                </Link>
                <Link
                  href="/about"
                  className={`nav-link px-2 py-1 ${pathname === "/about" ? "active" : ""}`}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className={`nav-link px-2 py-1 ${pathname === "/contact" ? "active" : ""}`}
                >
                  Contacts
                </Link>
              </Space>
            )}
          </div>
        </div>

        {/* Right side - Cart and menu button */}
        <div className="flex justify-end items-center">
          <div className="hidden lg:block">
            <CartButton />
          </div>
          <div className="lg:hidden flex justify-end items-center">
            <CartButton />
            <button
              onClick={toggleMenu}
              className=" p-2 rounded-md bg-gray-200 hover:bg-gray-300"
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
          <div className="w-full mt-2 grid  grid-cols-1 lg:hidden px-2 m">
            <div className="grid gap-2 justify-items-center text-center border-t border-gray-300 pt-2">
              {isAdminMode ? (
                /* admin actions */
                <Space orientation="vertical">
                  <Link
                    href="/login"
                    className={`nav-link block py-2 ${pathname === "/login" ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/request-admin"
                    className={`nav-link block py-2 ${pathname === "/request-admin" ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    Request Admin
                  </Link>
                  <Link
                    href="/admin/menu/add"
                    className={`nav-link block py-2 ${pathname.startsWith("/admin/menu/add") ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    Add Menu
                  </Link>
                </Space>
              ) : (
                /* user actions */
                <Space orientation="vertical">
                  <Link
                    href="/"
                    className={`nav-link block py-2 ${pathname === "/" ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                  <Link
                    href="/lunch"
                    className={`nav-link block py-2 ${pathname === "/lunch" ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    Lunch
                  </Link>
                  <Link
                    href="/alacarte"
                    className={`nav-link block py-2 ${pathname === "/alacarte" ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    Alacarte
                  </Link>
                  <Link
                    href="/reservation"
                    className={`nav-link block py-2 ${pathname === "/reservation" ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    Reservation
                  </Link>
                  <Link
                    href="/about"
                    className={`nav-link block py-2 ${pathname === "/about" ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className={`nav-link block py-2 ${pathname === "/contact" ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    Contacts
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
