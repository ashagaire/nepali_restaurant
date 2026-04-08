"use client";

import { useState } from "react";
import { useTags } from "@/hooks/menu/useTags";
import { useCategories } from "@/hooks/menu/useCategories";
import { toast } from "react-toastify";
import { Chip, Typography, useMediaQuery, useTheme, Button } from "@mui/material";

interface SearchOptionsProps {
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  onClearCategories: () => void;
}

export default function SearchOptions({
  selectedTags,
  onTagToggle,
  selectedCategories,
  onCategoryToggle,
  onClearCategories,
}: SearchOptionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: tags, loading: tagsLoading, error: tagsError } = useTags();
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const displayedCategories = (isSmallScreen && !isExpanded) 
    ? categories.slice(0, 5) 
    : categories;

  const hasMoreCategories = categories.length > 5;

  if (tagsLoading || categoriesLoading) return <p className="text-center py-4">Loading options...</p>;
  
  if (tagsError || categoriesError) {
    const errorMsg = tagsError || categoriesError;
    toast.error(errorMsg);
    return <p className="text-red-500 text-center py-4">{errorMsg}</p>;
  }

  return (
    <section className="mt-6 lg:mt-12">
      <div className="container mx-auto max-w-7xl px-4 ">
        
            
        
        <div className="flex flex-col gap-6 mt-2 justify-center items-center">
          {/* Categories Section */}
          <div className="w-full">
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onClearCategories}
                className={`flex justify-center items-center text-center px-4 py-1.5 sm:py-2 md:px-5 md:py-2.5 rounded-md border-b text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  selectedCategories.length === 0
                    ? "bg-orange-200 border-orange-400 text-orange-600 shadow-[0_2px_10px_-3px_rgba(234,88,12,0.3)]"
                    : "bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:text-orange-600"
                }`}
              >
                All
              </button>
              {displayedCategories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryToggle(category.id)}
                    className={`flex justify-center items-center text-center px-2 py-1 sm:py-2 md:px-5 md:py-2.5 rounded-md border-b text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                      isSelected
                        ? "bg-orange-200 border-orange-400 text-orange-600 shadow-[0_2px_10px_-3px_rgba(234,88,12,0.3)]"
                        : "bg-orange-100 border-orange-400 text-orange-600 hover:bg-orange-200 hover:text-orange-600"
                    }`}
                  >
                    {category.nameEn}
                  </button>
                );
              })}
              
              {isSmallScreen && hasMoreCategories && (
                <Button 
                  size="small" 
                  onClick={() => setIsExpanded(!isExpanded)}
                  sx={{ 
                    textTransform: 'none', 
                    fontWeight: 600,
                    color: 'primary.main',
                    minWidth: 'auto',
                    ml: 1,
                    p:0
                  }}
                >
                  {isExpanded ? "Show Less" : "More..."}
                </Button>
              )}
            </div>
          </div>

          {/* Tags Section */}
          <div className="w-full">
            
            <div className="flex flex-wrap  gap-2">
              {tags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <Chip
                    key={tag.id}
                    label={tag.symbol}
                    onClick={() => onTagToggle(tag.id)}
                    variant="filled"
                    size="small"
                    clickable
                    className="!border-b !border-orange-400"

                    sx={{
                      fontWeight: 500,
                      borderRadius: "6px",
                      px: { xs: 0, lg: 1 },
                      py: { xs: 0, lg: 2 },

                      bgcolor: isSelected ? "#fed7aa" : "#ffedd5",
                      color: isSelected ? "#c2410c" : "#f97316",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
