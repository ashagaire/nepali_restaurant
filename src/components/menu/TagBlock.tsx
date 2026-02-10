"use client";

import SimpleListBlock from "@/components/utils/SimpleListBlock";
import { useTags } from "@/hooks/menu/useTags";
import { useState } from "react";
import AddItemModal from "@/components/forms/AddItemModal";
import { toast } from "react-toastify";

export default function TagBlock() {
  const { data, loading, create, remove, error } = useTags();
  const [open, setOpen] = useState(false);

  if (loading) return <p> loading Tags </p>;
  if (error) {
    toast.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <SimpleListBlock
        title="Tags"
        items={data ?? []}
        isLoading={loading}
        onAddClick={() => setOpen(true)}
        onDelete={remove}
      />

      <AddItemModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Tag"
        onSubmit={create}
      />
    </>
  );
}
