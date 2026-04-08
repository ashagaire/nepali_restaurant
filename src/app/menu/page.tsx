"use client";
import { useState } from "react";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import MenuItemCard from "@/components/menu/MenuItemCard";
import MenuSection from "@/components/menu/MenuSection";
import SearchOptions from "@/components/menu/SearchOptions";
import { Button, Typography, Pagination, Box } from "@mui/material";

import LoadingMeanuSection from "@/components/Skeletons/loadingMenuSection";
import { toast } from "react-toastify";

export default function Menu() {
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const limit = 12;

  const { menuItems, total, totalPages, loading, error, reload } = useMenuItems({ 
    page, 
    limit, 
    tags: selectedTags,
    categories: selectedCategories 
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Optional: scroll to top of list
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId];
      setPage(1); // Reset to page 1 on filter change
      return newTags;
    });
  };

  const handleClearTags = () => {
    setSelectedTags([]);
    setPage(1);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newCats = prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId];
      setPage(1);
      return newCats;
    });
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
    setPage(1);
  };

  if (loading && menuItems.length === 0) return <LoadingMeanuSection />;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <section className="text-center pt-6 md:pt-12">
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: 700, my: 2, fontSize: { xs: 30, sm: 45, md: 50 } }}
      >
        <span className="block text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
          Find Menu
        </span>
        <div className="w-50 mx-auto border-b border-2 border-orange-200"></div>
      </Typography>
      
      <SearchOptions 
        selectedTags={selectedTags} 
        onTagToggle={handleTagToggle} 
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        onClearCategories={handleClearCategories}
      />

      <div className="rounded-md shadow-sm relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            {/* Overlay loading indicator when updating list while already having items */}
          </div>
        )}
        
        <div className="py-6 container mx-auto max-w-7xl px-4">
          {menuItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <Typography variant="h6" color="text.secondary" sx={{ py: 8 }}>
              No menu items found.
            </Typography>
          )}

          {total > 0 && (
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
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
                  '& .MuiPaginationItem-root': {
                    fontWeight: 600,
                  }
                }}
              />
            </Box>
          )}
        </div>
      </div>
    </section>
  );
}
