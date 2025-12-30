"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import type { MenuItemWithRelations } from "@/app/page";

interface MenuItemCardProps {
  item: MenuItemWithRelations;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <Card className="max-w-sm mx-auto shadow-lg rounded-xl overflow-hidden">
      {/* Image */}
      {item.imageUrl ? (
        <CardMedia
          component="img"
          height="200"
          image={item.imageUrl}
          alt={item.nameEn}
        />
      ) : (
        <Box className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
          No Image
        </Box>
      )}

      {/* Details */}
      <CardContent className="p-4">
        <Typography variant="h6" className="mb-2 font-semibold">
          {item.nameEn}
        </Typography>

        <Typography variant="body2" color="textSecondary" className="mb-2">
          {item.descriptionEn}
        </Typography>

        {/* Tags */}
        <Box className="flex flex-wrap gap-2 mb-2">
          {item.tags?.map((tag) => (
            <Chip key={tag.id} label={tag.nameEn} size="small" />
          ))}
        </Box>

        {/* Ingredients & Servings */}
        <Box className="flex justify-between text-sm text-gray-700 mb-2">
          <span>
            Ingredients:
            {item.ingredients
              ?.map((ingredient) => ingredient.nameEn)
              .join(", ")}
          </span>
          <span>Servings: {item.servings}</span>
        </Box>

        {/* Price */}
        <Typography variant="subtitle1" className="font-semibold">
          ${item.price.toFixed(2)}
          {item.discount > 0 && (
            <span className="ml-2 text-red-500 line-through">
              ${item.discount.toFixed(2)}
            </span>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
