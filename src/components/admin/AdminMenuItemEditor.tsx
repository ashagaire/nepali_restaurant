// "use client";

// import { Spin, Alert } from "antd";
// import MenuItemForm from "@/components/forms/MenuItemForm";

// import { useMenuItem } from "@/hooks/menu/useMenuItem";
// import { useCategories } from "@/hooks/menu/useCategories";
// import { useTags } from "@/hooks/menu/useTags";
// import { useIngredients } from "@/hooks/menu/useIngredients";
// import { useUpdateMenuItem } from "@/hooks/menu/useUpdateMenuItem";
// import { useCreateMenuItem } from "@/hooks/menu/useCreateMenuItem";

// import type { MenuItemFormValues } from "@/types/menu";

// type EditorMode = "add" | "edit";

// interface Props {
//   mode: EditorMode;
//   menuItemId?: string;
//   onSuccess?: () => void;
// }

// export default function AdminMenuItemEditor({
//   mode,
//   menuItemId,
//   onSuccess,
// }: Props) {
//   /* ---------- COMMON DATA ---------- */
//   const {
//     data: categories,
//     loading: categoriesLoading,
//     error: categoriesError,
//   } = useCategories();

//   const { data: tags, loading: tagsLoading, error: tagsError } = useTags();

//   const {
//     data: ingredients,
//     loading: ingredientsLoading,
//     error: ingredientsError,
//   } = useIngredients();

//   /* ---------- EDIT ONLY ---------- */
//   const {
//     data: menuItem,
//     loading: menuItemLoading,
//     error: menuItemError,
//   } = useMenuItem(menuItemId!, {
//     enabled: mode === "edit",
//   });

//   const {
//     updateMenuItem,
//     loading: updateLoading,
//     error: updateError,
//   } = useUpdateMenuItem(menuItemId!);

//   /* ---------- ADD ONLY ---------- */
//   const {
//     createMenuItem,
//     loading: createLoading,
//     error: createError,
//   } = useCreateMenuItem();

//   const isLoading =
//     categoriesLoading ||
//     tagsLoading ||
//     ingredientsLoading ||
//     (mode === "edit" && menuItemLoading);

//   const error =
//     categoriesError ||
//     tagsError ||
//     ingredientsError ||
//     menuItemError ||
//     updateError ||
//     createError;

//   if (isLoading) return <Spin fullscreen />;

//   if (mode === "edit" && !menuItem) {
//     return (
//       <Alert
//         type="error"
//         title="Menu item not found"
//         style={{ maxWidth: 600, margin: "40px auto" }}
//       />
//     );
//   }

//   if (error) {
//     return (
//       <Alert
//         type="error"
//         title="Error"
//         description={error}
//         style={{ maxWidth: 600, margin: "40px auto" }}
//       />
//     );
//   }

//   /* ---------- INITIAL VALUES ---------- */
//   const initialValues: MenuItemFormValues | undefined =
//     mode === "edit" && menuItem
//       ? {
//           nameEn: menuItem.nameEn,
//           nameFi: menuItem.nameFi,
//           descriptionEn: menuItem.descriptionEn,
//           descriptionFi: menuItem.descriptionFi,
//           price: menuItem.price,
//           discount: menuItem.discount,
//           servings: menuItem.servings,
//           spicey: menuItem.spicey,
//           visibility: menuItem.visibility,
//           categoryId: menuItem.categoryId,
//           tagIds: menuItem.tags.map((t) => t.id),
//           ingredientIds: menuItem.ingredients.map((i) => i.id),
//           imageUrl: menuItem.imageUrl ?? undefined,
//           imagePublicId: menuItem.imagePublicId ?? undefined,
//         }
//       : undefined;

//   /* ---------- SUBMIT ---------- */
//   async function handleSubmit(values: MenuItemFormValues) {
//     if (mode === "edit") {
//       await updateMenuItem(values);
//     } else {
//       await createMenuItem(values);
//     }
//     onSuccess?.();
//   }

//   return (
//     <MenuItemForm
//       title={mode === "edit" ? "Edit Menu Item" : "Add Menu Item"}
//       initialValues={initialValues}
//       categories={categories}
//       tags={tags}
//       ingredients={ingredients}
//       onSubmit={handleSubmit}
//       loading={mode === "edit" ? updateLoading : createLoading}
//     />
//   );
// }
