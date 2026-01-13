"use client";

import MenuItemForm from "@/components/forms/MenuItemForm";
import { useCategories } from "@/hooks/menu/useCategories";
import { useTags } from "@/hooks/menu/useTags";
import { useIngredients } from "@/hooks/menu/useIngredients";
import { useCreateMenuItem } from "@/hooks/menu/useCreateMenuItem";
import type { MenuItemFormValues } from "@/types/menu";
import { Spin, Alert } from "antd";

export default function AddMenuPage() {
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
    createMenuItem,
    loading: createLoading,
    error: createError,
  } = useCreateMenuItem();

  const isLoading = categoriesLoading || tagsLoading || ingredientsLoading;

  const error = categoriesError || tagsError || ingredientsError || createError;

  const handleSubmit = async (values: MenuItemFormValues) => {
    await createMenuItem(values);
    // later: redirect or show success toast
    console.log("Menu item created");
  };

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (error) {
    return (
      <Alert
        type="error"
        title="Error"
        description={error}
        style={{ maxWidth: 600, margin: "40px auto" }}
      />
    );
  }

  return (
    <MenuItemForm
      title="Add Menu Item"
      categories={categories}
      tags={tags}
      ingredients={ingredients}
      onSubmit={handleSubmit}
      loading={createLoading}
    />
  );
}
