"use client";

import { Spin, Alert, message } from "antd";
import MenuItemForm from "@/components/forms/MenuItemForm";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/menu/useCategories";
import { useTags } from "@/hooks/menu/useTags";
import { useIngredients } from "@/hooks/menu/useIngredients";
import { useCreateMenuItem } from "@/hooks/menu/useCreateMenuItem";
import { toast } from "react-toastify";
import type { MenuItemFormValues } from "@/types/menu";

export default function NewMenuItemPage() {
  const router = useRouter();
  const {
    data: categories = [],
    loading: catLoading,
    error: catError,
  } = useCategories();
  const { data: tags = [], loading: tagLoading, error: tagError } = useTags();
  const {
    data: ingredients = [],
    loading: ingLoading,
    error: ingError,
  } = useIngredients();

  const {
    createMenuItem,
    loading: saving,
    error: saveError,
  } = useCreateMenuItem();

  const isLoading = catLoading || tagLoading || ingLoading;
  const error = catError || tagError || ingError || saveError;

  const handleSubmit = async (values: MenuItemFormValues) => {
    try {
      const res = await createMenuItem(values);
      if (!res.ok) throw new Error("Adding menu item failed");
      toast.success("Menu item created successfully");
      router.push("/admin/menu");
    } catch (err: any) {
      toast.error(err.message || "Failed to create menu item");
    }
  };

  if (isLoading) return <Spin fullscreen />;
  // TODO: error handling page
  if (error) return <Alert type="error" title={error} />;

  return (
    <MenuItemForm
      title="Add Menu Item"
      categories={categories}
      tags={tags}
      ingredients={ingredients}
      onSubmit={handleSubmit}
      loading={saving}
    />
  );
}
