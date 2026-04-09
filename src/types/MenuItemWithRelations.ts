import type { MenuItem as MenuItemDTO, Tag } from "@prisma/client";

export interface MenuItemWithRelations extends MenuItemDTO {
  tags: Tag[];
}
