import { MenuBook, People, AddCircleOutline, Category } from "@mui/icons-material";
import { ReactNode } from "react";

export interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  gradient: string;
  chip: string;
  chipColor: string;
  chipTextColor: string;
}

export const quickActions: QuickAction[] = [
  {
    title: "Menu Manager",
    description: "View, edit and manage all your restaurant menu items in one place.",
    href: "/admin/menu",
    icon: <MenuBook sx={{ fontSize: 36 }} />,
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    chip: "Browse",
    chipColor: "#fff3e0",
    chipTextColor: "#ea580c",
  },
  {
    title: "User Management",
    description: "Administer user accounts, roles, and permissions for your team.",
    href: "/admin/users",
    icon: <People sx={{ fontSize: 36 }} />,
    gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    chip: "Manage",
    chipColor: "#ede9fe",
    chipTextColor: "#4f46e5",
  },
  {
    title: "Add Menu Item",
    description: "Create a new dish, set pricing, upload images and assign categories.",
    href: "/admin/menu/new",
    icon: <AddCircleOutline sx={{ fontSize: 36 }} />,
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    chip: "Create",
    chipColor: "#d1fae5",
    chipTextColor: "#059669",
  },
  {
    title: "Sub-Components",
    description: "Manage categories, tags and ingredients used across menu items.",
    href: "/admin/sub-components",
    icon: <Category sx={{ fontSize: 36 }} />,
    gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    chip: "Configure",
    chipColor: "#fce7f3",
    chipTextColor: "#db2777",
  },
];
