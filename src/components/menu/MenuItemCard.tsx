"use client";

import React from "react";
import { IconButton } from "@mui/material";
import {
  ShoppingCart,
  Edit,
  Delete
} from "@mui/icons-material";
import type { MenuItemWithRelations } from "@/types/menuItemWithRelations";
import SpiceIndicator from "@/components/utils/SpiceIndicator";
import ConfirmDialog from "@/components/utils/ConfirmDialog";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

interface MenuItemCardProps {
  item: MenuItemWithRelations;
  showAdminActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function toDecimalNumber(value: unknown): number {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : 0;
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "toNumber" in value &&
    typeof (value as { toNumber: unknown }).toNumber === "function"
  ) {
    return (value as { toNumber: () => number }).toNumber();
  }
  return 0;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  showAdminActions,
  onDelete,
}) => {
  const router = useRouter();
  const { addToCart, toggleCart } = useCart();

  const price = toDecimalNumber(item.price);
  const discount = toDecimalNumber(item.discount);
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price - discount : price;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.nameEn,
      price: finalPrice,
      quantity: 1,
      imageUrl: item.imageUrl || undefined,
    });

    toast.info("Go To Shopping Cart", {
      position: "top-right",
      autoClose: 2000,
      onClick: () => toggleCart(),
      className: "cursor-pointer font-bold ",
    });
  };

  return (
    <div className=" flex bg-white rounded-xl overflow-hidden border-2 border-orange-400  shadow-md hover:shadow-xl hover:-translate-y-4 transition-all duration-300  ">
      {/* LEFT SIDE — CONTENT */}
      <div className=" relative w-4/7 flex flex-col justify-between px-2 ">
        <div className="flex flex-col text-left mt-2">
          {/* Title */}
          <h3 className="text-lg text-orange-600 font-semibold leading-tight " >{item.nameEn}</h3>

          {/* Description */}
          <p className="text-sm text-gray-500 text-left mt-2 ">
            {item.descriptionEn}
          </p>


          {/* Tags */}
          <div className="text-xs text-orange-600 flex gap-2 mt-2">
            {item.tags.map((tag) => (
              <span className="border border-orange-200 px-2 py-0.5  rounded-sm " key={tag.id}>{tag.symbol}</span>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-2 mb-1">
          {/* Price */}
          <span className="text-lg font-bold text-orange-600">€{finalPrice.toFixed(2)}</span>

          {/* Add Button */}

          {!showAdminActions ? (
            <button 
              onClick={handleAddToCart}
              className="px-2 py-2 text-sm  rounded-full text-orange-600 hover:bg-orange-100 transition"
            >
              <ShoppingCart fontSize="medium" />
            </button>
          ) : (
            <div className="flex gap-0.5 justify-end" >
              <IconButton
                size="medium"
                sx={{
                  color: "#128425ff",
                  p: 0.5,
                }}
                onClick={() => router.push(`/admin/menu/${item.id}/edit`)}
              >
                <Edit fontSize="medium" />
              </IconButton>

              <ConfirmDialog
                message={`Are you sure you want to delete this item ${item.nameEn}?`}
                onConfirm={() => onDelete?.(item.id)}
              >
                <IconButton 
                  size="medium"
                  color="error"
                  sx={{ p: 0.5 }}
                >
                  <Delete fontSize="medium" />
                </IconButton>
              </ConfirmDialog>
            </div>
          )}
        </div>
        
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

    
  );
};

export default MenuItemCard;
