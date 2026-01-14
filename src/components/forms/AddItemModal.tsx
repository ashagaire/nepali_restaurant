import { useState } from "react";
import { MenuFeaturesItems } from "@/types/menu";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (data: MenuFeaturesItems) => Promise<void>;
}

export default function AddItemModal({
  open,
  title,
  onClose,
  onSubmit,
}: Props) {
  const [nameEn, setNameEn] = useState("");
  const [nameFi, setNameFi] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit({ nameEn, nameFi });
      onClose();
    } catch {
      toast.error(`Failed to add ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded p-4 w-96 space-y-3">
        <h3 className="font-semibold">{title}</h3>

        <input
          placeholder="Name (EN)"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Name (FI)"
          value={nameFi}
          onChange={(e) => setNameFi(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
