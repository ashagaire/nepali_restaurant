"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { MenuItemWithRelations } from "@/app/page";
import { getSpiceConfig } from "@/components/utils/spiceLevel";
import SpiceIndicator from "@/components/utils/SpiceIndicator";
interface MenuItemCardProps {
  item: MenuItemWithRelations;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  // const spice = getSpiceConfig(item.spicey);

  const hasDiscount = item.discount > 0;
  const finalPrice = hasDiscount ? item.price - item.discount : item.price;

  return (
    <Card
      className="flex flex-col h-full rounded-2xl shadow-md transition-all duration-300
    hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image */}
      <Box className="relative">
        {item.imageUrl ? (
          <CardMedia
            component="img"
            height="180"
            image={item.imageUrl}
            alt={item.nameEn}
            className="object-cover"
          />
        ) : (
          <Box className="h-44 flex items-center justify-center bg-gray-100">
            No Image
          </Box>
        )}
        {/* Spice Level */}
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <SpiceIndicator level={item.spicey} />
        </Box>
      </Box>

      <CardContent className="flex flex-col flex-1 p-4">
        {/* Title + Favorite */}
        <Box className="flex justify-between items-start">
          <Typography variant="h6" className="font-semibold leading-tight">
            {item.nameEn}
          </Typography>

          <Box className="flex items-center gap-1">
            <IconButton size="small">
              {/* check is the item favorites in current context */}
              {item.isArchived ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
        </Box>

        {/* Description */}
        <Box className="mb-2 flex-1">
          <Typography
            variant="body1"
            color="textSecondary"
            className=" line-clamp-2"
          >
            {item.descriptionEn}
          </Typography>
        </Box>

        {/* Tags */}
        <Box display="flex" flexWrap="wrap" gap={0.5} sx={{ mb: 1 }}>
          {item.tags?.slice(0, 3).map((tag) => (
            <Chip
              key={tag.id}
              label={tag.nameEn}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.8rem",
                borderRadius: 1,
                // color: "text.secondary",
              }}
            />
          ))}
        </Box>

        {/* Price + Cart */}
        <Box className="mt-auto flex items-center justify-between">
          <Box>
            {hasDiscount && (
              <Typography
                variant="caption"
                className="line-through text-gray-400"
              >
                €{item.price.toFixed(2)}
              </Typography>
            )}
            <Typography
              variant="h6"
              className={hasDiscount ? "text-red-600" : ""}
            >
              €{finalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCartIcon />}
            className="rounded-full"
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
