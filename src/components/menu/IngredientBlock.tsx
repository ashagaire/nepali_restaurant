import SimpleListBlock from "@/components/utils/SimpleListBlock";
import { toast } from "react-toastify";

import { useIngredients } from "@/hooks/menu/useIngredients";
import { useState } from "react";
import AddItemModal from "@/components/forms/AddItemModal";

export default function CategoryBlock() {
  const { data, loading, create, remove, error } = useIngredients();
  const [open, setOpen] = useState(false);

  if (loading) return <p> loading Ingredients </p>;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <>
      <SimpleListBlock
        title="Ingredients"
        items={data ?? []}
        isLoading={loading}
        onAddClick={() => setOpen(true)}
        onDelete={remove}
      />

      <AddItemModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Ingredient"
        onSubmit={create}
      />
    </>
  );
}
