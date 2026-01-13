"use client";

import { useParams } from "next/navigation";
import { Spin, Alert } from "antd";

import MenuItemForm from "@/components/forms/MenuItemForm";
import { useMenuItem } from "@/hooks/menu/useMenuItem";
import { useCategories } from "@/hooks/menu/useCategories";
import { useTags } from "@/hooks/menu/useTags";
import { useIngredients } from "@/hooks/menu/useIngredients";
import { useUpdateMenuItem } from "@/hooks/menu/useUpdateMenuItem";

import type { MenuItemFormValues } from "@/types/menu";

export default function EditMenuPage() {
  const params = useParams<{ id: string }>();
  const menuItemId = params.id;

  const {
    data: menuItem,
    loading: menuItemLoading,
    error: menuItemError,
  } = useMenuItem(menuItemId);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const { data: tags, loading: tagsLoading, error: tagsError } = useTags();

  const {
    data: ingredients,
    loading: ingredientsLoading,
    error: ingredientsError,
  } = useIngredients();

  const {
    updateMenuItem,
    loading: updateLoading,
    error: updateError,
  } = useUpdateMenuItem(menuItemId);

  const isLoading =
    menuItemLoading || categoriesLoading || tagsLoading || ingredientsLoading;

  const error =
    menuItemError ||
    categoriesError ||
    tagsError ||
    ingredientsError ||
    updateError;

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (!menuItem) {
    return (
      <Alert
        type="error"
        message="Menu item not found"
        style={{ maxWidth: 600, margin: "40px auto" }}
      />
    );
  }

  if (error) {
    return (
      <Alert
        type="error"
        message="Error"
        description={error}
        style={{ maxWidth: 600, margin: "40px auto" }}
      />
    );
  }

  // 🔁 Map Prisma model → form values
  const initialValues: MenuItemFormValues = {
    nameEn: menuItem.nameEn,
    nameFi: menuItem.nameFi,
    descriptionEn: menuItem.descriptionEn,
    descriptionFi: menuItem.descriptionFi,

    price: menuItem.price,
    discount: menuItem.discount,

    servings: menuItem.servings,
    spicey: menuItem.spicey,
    visibility: menuItem.visibility,

    categoryId: menuItem.categoryId,

    tagIds: menuItem.tags.map((t) => t.id),
    ingredientIds: menuItem.ingredients.map((i) => i.id),
  };

  const handleSubmit = async (values: MenuItemFormValues) => {
    await updateMenuItem(values);
    // later: redirect or toast
    console.log("Menu item updated");
  };

  return (
    <MenuItemForm
      title="Edit Menu Item"
      initialValues={initialValues}
      categories={categories}
      tags={tags}
      ingredients={ingredients}
      onSubmit={handleSubmit}
      loading={updateLoading}
    />
  );
}
