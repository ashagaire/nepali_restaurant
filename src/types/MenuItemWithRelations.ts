import type { MenuItem as MenuItemDTO, Tag, Ingredient } from "@prisma/client";

export interface MenuItemWithRelations extends MenuItemDTO {
  tags: Tag[];
  ingredients: Ingredient[];
}
