"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAdmins } from "@/hooks/useAdmins";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/utils/ConfirmDialog";
import { Button } from "antd";
import Link from "next/link";
import { useState } from "react";
import AdminRequestForm from "@/components/forms/AdminRequestForm";

export default function UsersPage() {
  const { admins, loading, error, reload } = useAdmins();
  const { user: currentUser } = useAuth();

  const [open, setOpen] = useState(false);

  const addAdmin = async (email: string) => {
    if (!email) return;

    try {
      const res = await fetch("/api/admin/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message || "Admin request submitted");
        setOpen(false);
      } else {
        toast.error(data?.message || "Request failed");
        setOpen(false);
      }
    } catch (err) {
      toast.error((err as Error).message || "An error occurred");
      setOpen(false);
    }
  };

  async function revokeAdmin(targetAdminId: string) {
    if (!currentUser) return;
    try {
      const res = await fetch("/api/admin/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetAdminId,
          superAdminId: currentUser.id,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Delete failed");
      }
      toast.success("Admin deleted successfully");
      await reload();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  //TODO: handle loading state
  if (loading) return <p>Loading admins...</p>;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Super Admin – Admin Users</h1>
      <div className="flex items-center gap-2 my-4">
        <Button type="primary" onClick={() => setOpen(true)}>
          Add New Admin
        </Button>
      </div>

      {admins.length === 0 ? (
        <p>No active admins</p>
      ) : (
        <ul>
          {admins.map((admin) => (
            <li key={admin.id}>
              <strong>{admin.email}</strong> – {admin.role}{" "}
              {admin.role !== "SUPER_ADMIN" && (
                <ConfirmDialog
                  message={`Remove admin ${admin.email}?`}
                  onConfirm={() => revokeAdmin(admin.id)}
                >
                  <button style={{ marginLeft: "1rem" }}>❌ Remove</button>
                </ConfirmDialog>
              )}
            </li>
          ))}
        </ul>
      )}

      <AdminRequestForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={addAdmin}
      />
    </main>
  );
}
