"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAdmins } from "@/hooks/useAdmins";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/utils/ConfirmDialog";

export default function UsersPage() {
  const { admins, loading, error, reload } = useAdmins();
  const { user: currentUser } = useAuth();

  //TODO: handle loading state
  if (loading) return <p>Loading admins...</p>;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

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

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Super Admin – Admin Users</h1>

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
    </main>
  );
}
