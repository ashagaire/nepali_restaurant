"use client";

import { useParams } from "next/navigation";
import AdminMenuItemEditor from "@/components/admin/AdminMenuItemEditor";

export default function EditMenuPage() {
  const { id } = useParams<{ id: string }>();

  return <AdminMenuItemEditor mode="edit" menuItemId={id} />;
}
