"use client";

import { useParams } from "next/navigation";
import { Spin, Alert, message } from "antd";
import { toast } from "react-toastify";
import MenuItemForm from "@/components/forms/MenuItemForm";
import { useRouter } from "next/navigation";

import { useMenuItem } from "@/hooks/menu/useMenuItem";
import { useCategories } from "@/hooks/menu/useCategories";
import { useTags } from "@/hooks/menu/useTags";
import { useUpdateMenuItem } from "@/hooks/menu/useUpdateMenuItem";

import type { MenuItemFormValues } from "@/types/menu";

export default function EditMenuItemPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: menuItem,
    loading: itemLoading,
    error: itemError,
  } = useMenuItem(id);
  const {
    data: categories = [],
    loading: catLoading,
    error: catError,
  } = useCategories();
  const { data: tags = [], loading: tagLoading, error: tagError } = useTags();

  const {
    updateMenuItem,
    loading: saving,
    error: saveError,
  } = useUpdateMenuItem(id);

  const isLoading = itemLoading || catLoading || tagLoading;
  // TODO: error handling page
  const error = catError || tagError || itemError || saveError;

  if (isLoading) return <Spin fullscreen />;

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

  if (!menuItem) {
    return <Alert type="error" title="Menu item not found" />;
  }

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
    tagIds: menuItem.tags?.map((t) => t.id) || [],
    imageUrl: menuItem.imageUrl ?? undefined,
    imagePublicId: menuItem.imagePublicId ?? undefined,
  };

  const handleSubmit = async (values: MenuItemFormValues) => {
    try {
      const res = await updateMenuItem(values);
      if (!res.success) throw new Error("Update menu item failed");
      toast.success("Menu item updated successfully");
      router.push("/admin/menu");
    } catch (err: any) {
      toast.error(err.message || "Failed to update menu item");
    }
  };

  return (
    <MenuItemForm
      title="Edit Menu Item"
      initialValues={initialValues}
      categories={categories}
      tags={tags}
      onSubmit={handleSubmit}
      loading={saving}
    />
  );
}
