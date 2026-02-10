"use client";

import SimpleListBlock from "@/components/utils/SimpleListBlock";
import { useCategories } from "@/hooks/menu/useCategories";
import { useState } from "react";
import AddItemModal from "@/components/forms/AddItemModal";
import { toast } from "react-toastify";

export default function CategoryBlock() {
  const { data, loading, create, remove, error } = useCategories();
  const [open, setOpen] = useState(false);

  if (loading) return <p> loading Categories </p>;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <SimpleListBlock
        title="Categories"
        items={data ?? []}
        isLoading={loading}
        onAddClick={() => setOpen(true)}
        onDelete={remove}
      />

      <AddItemModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Category"
        onSubmit={create}
      />
    </>
  );
}
