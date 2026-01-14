import { SpiceLevel, Visibility, MenuItem } from "@prisma/client";

/**
 * UI-safe MenuItem form values (CREATE / UPDATE)
 */
export type MenuItemFormValues = {
  nameEn: MenuItem["nameEn"];
  nameFi: MenuItem["nameFi"];
  descriptionEn: MenuItem["descriptionEn"];
  descriptionFi: MenuItem["descriptionFi"];

  price: MenuItem["price"];
  discount?: MenuItem["discount"];

  imageUrl?: MenuItem["imageUrl"];
  imagePublicId?: MenuItem["imagePublicId"];

  servings: MenuItem["servings"];
  spicey: SpiceLevel;

  visibility: Visibility;

  categoryId: string;

  tagIds: string[];
  ingredientIds: string[];
};

export interface MenuFeaturesItems {
  nameEn: string;
  nameFi: string;
}
