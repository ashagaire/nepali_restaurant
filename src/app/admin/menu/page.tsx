"use client";
import { useState } from "react";
import LoadingMeanuSection from "@/components/Skeletons/loadingMenuSection";
import { toast } from "react-toastify";
import MenuItemCard from "@/components/menu/MenuItemCard";

import { useMenuItems } from "@/hooks/menu/useMenuItems";
import { Pagination, Box, Typography } from "@mui/material";

export default function AdminMenuPage() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { menuItems, total, totalPages, loading, error, reload } = useMenuItems({
    page,
    limit,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && menuItems.length === 0) return <LoadingMeanuSection />;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Menu item deleted successfully");
      reload();
    } catch (err) {
      toast.error("Failed to delete item");
    }
  }

  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <main className="min-h-[60vh] max-w-7xl mx-auto px-6 py-12 flex flex-col items-center ">
      <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, my: 2, fontSize: { xs: 30, sm: 45, md: 50 } }}
            >
              <span className="block text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Menu Page for Admin
              </span>
            </Typography>

      
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            {/* Overlay loading indicator when updating list */}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-4">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              showAdminActions={true}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {total > 0 && (
          <Box
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Showing {startItem}-{endItem} of {total} items
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 600,
                },
              }}
            />
          </Box>
        )}
      </div>
    </main>
  );
}
