"use client";

import { useState } from "react";
import { useTags } from "@/hooks/menu/useTags";
import { toast } from "react-toastify";
import { ToggleButton, ToggleButtonGroup, Chip, Button } from "@mui/material";

export default function SearchOptions() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: tags, loading, create, remove, error } = useTags();
  if (loading) return <p> loading Tags </p>;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  const handleCategories = (
    _event: React.MouseEvent<HTMLElement>,
    newCategories: string[] | null,
  ) => {
    setCategories(newCategories ?? []);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <section className=" bg-gray-100">
      <div className="py-8 container mx-auto max-w-7xl p-4 ">
        <h2 className="text-3xl font-bold pt-4 text-center">Find Menu</h2>
        <p className="text-xl text-gray-600 mb-4 text-center">
          Explore our selection of authentic Nepali dishes
        </p>
        <div className="  flex flex-col  gap-2 mt-2 jystify-center items-center text-red-400">
          <div className="pb-4">
            <ToggleButtonGroup
              value={categories}
              onChange={handleCategories}
              aria-label="categories"
              exclusive
              size="small"
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                "& .MuiToggleButton-root": {
                  border: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.75,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "text.secondary",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                },
              }}
            >
              <ToggleButton value="Appetizer" aria-label="Appetizer">
                Appetizer
              </ToggleButton>
              <ToggleButton value="MainCourse" aria-label="MainCourse">
                Main Course
              </ToggleButton>
              <ToggleButton value="Dessert" aria-label="Dessert">
                Dessert
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className="pb-4 ">
            {tags.length > 0 && (
              <div>
                <div className={`flex flex-wrap gap-2 mb-0}`}>
                  <button
                    onClick={() => setSelectedTags([])}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.length === 0
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  {tags.map((tag) => {
                    const isSelected = selectedTags.includes(tag.id);
                    return (
                      <Chip
                        key={tag.id}
                        label={tag.nameEn}
                        onClick={() => handleTagClick(tag.id)}
                        color={isSelected ? "primary" : "default"}
                        variant={isSelected ? "filled" : "outlined"}
                        size="medium"
                        clickable
                        className={"font-medium rounded-md"}
                      />
                    );
                  })}
                  {/* {hasMoreTags && (
                    <Button
                      size="small"
                      onClick={() => setShowAllTags(!showAllTags)}
                      endIcon={
                        showAllTags ? <ExpandLessIcon /> : <ExpandMoreIcon />
                      }
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        mt: 0.5,
                      }}
                    >
                      {showAllTags ? "Show less" : `Show all tags`}
                    </Button>
                  )} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
