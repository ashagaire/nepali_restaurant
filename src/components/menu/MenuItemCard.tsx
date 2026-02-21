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
    <div className=" flex bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300  ">
      {/* LEFT SIDE — CONTENT */}
      <div className=" relative w-4/7 flex flex-col justify-between p-2 ">
        <div>
          {/* Title */}
          <h3 className="text-lg font-semibold leading-tight">{item.nameEn}</h3>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {item.descriptionEn}
          </p>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-3">
          {/* Price */}
          <span className="text-lg font-bold">€{finalPrice.toFixed(2)}</span>

          {/* Add Button */}

          {!showAdminActions ? (
            <button className="px-2 py-2 text-sm  rounded-full hover:bg-gray-800 transition">
              <ShoppingCartIcon fontSize="medium" />
            </button>
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
        </div>
        {/* Optional Spice Badge */}
      </div>

      {/* RIGHT SIDE — IMAGE */}
      <div className="relative w-3/7 h-40">
        <img
          src={item.imageUrl || "/images/banner1.jpg"}
          alt={item.nameEn}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2    backdrop-blur px-2 py-1 rounded-full text-xs font-medium shadow">
          <SpiceIndicator level={item.spicey} />
        </div>
      </div>
    </div>

    // <Card className="menu-card overflow-hidden">
    //   <CardContent className="flex !p-0">
    //     {/* LEFT SIDE — TEXT */}
    //     <Box className="flex flex-col w-1/2 !p-4 relative">
    //       <Typography variant="h6" className="font-semibold leading-tight">
    //         {item.nameEn}
    //       </Typography>

    //       <Typography
    //         variant="body2"
    //         color="textSecondary"
    //         className="line-clamp-2 mt-2"
    //       >
    //         {item.descriptionEn}
    //       </Typography>

    //       <Box className="mt-auto">
    //         <Typography variant="h6">€{finalPrice.toFixed(2)}</Typography>
    //       </Box>
    //     </Box>

    //     {/* RIGHT SIDE — IMAGE */}
    //     <Box className="relative w-1/2 ">
    //       <CardMedia
    //         component="img"
    //         image={item.imageUrl || "/images/banner1.jpg"}
    //         alt={item.nameEn}
    //         className="absolute inset-0 w-full h-full object-cover block"
    //       />

    //       <Box className="absolute top-2 right-2">
    //         <SpiceIndicator level={item.spicey} />
    //       </Box>
    //     </Box>
    //   </CardContent>
    // </Card>
  );
};

export default MenuItemCard;
