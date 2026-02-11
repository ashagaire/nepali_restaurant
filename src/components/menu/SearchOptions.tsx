"use client";

import { useState } from "react";
import { useTags } from "@/hooks/menu/useTags";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { ToggleButton, ToggleButtonGroup, Chip, Button } from "@mui/material";

export default function SearchOptions() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const { data: tags, loading, create, remove, error } = useTags();
  if (loading) return <p> loading Tags </p>;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  const DEFAULT_TAG_LIMIT = 5;
  const hasMoreTags = tags.length > DEFAULT_TAG_LIMIT;
  const visibleTags = showAllTags ? tags : tags.slice(0, DEFAULT_TAG_LIMIT);

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
      <div className="py-12 container mx-auto max-w-7xl p-4 ">
        <h2 className="text-3xl font-bold pt-4 text-center">Find Menu</h2>
        <div className="  flex flex-col  gap-2 mt-6 jystify-center items-center">
          <div className="pb-4">
            <h3 className="text-medium font-medium mb-3 text-center">
              Filter by categories
            </h3>
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
            <h3 className="text-medium font-medium mb-3 text-center">
              Filter by tags
            </h3>

            {tags.length > 0 && (
              <div>
                <div
                  className={`flex flex-wrap gap-2 ${hasMoreTags ? "mb-2" : "mb-0"}`}
                >
                  {visibleTags.map((tag) => {
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
                  {hasMoreTags && (
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
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
