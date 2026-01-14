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
import type { MenuItemWithRelations } from "@/types/menuItemWithRelations";
import SpiceIndicator from "@/components/utils/SpiceIndicator";
import ConfirmDialog from "@/components/utils/ConfirmDialog";
import { useRouter } from "next/navigation";

interface MenuItemCardProps {
  item: MenuItemWithRelations;
  showAdminActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  showAdminActions,
  onDelete,
}) => {
  const router = useRouter();

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

          {!showAdminActions ? (
            <Button
              variant="contained"
              size="small"
              startIcon={<ShoppingCartIcon />}
              className="rounded-full"
            >
              Add
            </Button>
          ) : (
            <Box display="flex" gap={1} justifyContent="space-between">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
                onClick={() => router.push(`/admin/menu/${item.id}/edit`)}
              >
                Edit
              </Button>

              <ConfirmDialog
                message={`Are you sure you want to delete this item ${item.nameEn}?`}
                onConfirm={() => onDelete?.(item.id)}
              >
                <Button variant="outlined" color="error" size="small" fullWidth>
                  Delete
                </Button>
              </ConfirmDialog>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
