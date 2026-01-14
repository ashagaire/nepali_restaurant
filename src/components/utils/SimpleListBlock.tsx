type SimpleItem = {
  id: string;
  nameEn: string;
  nameFi: string;
};

type Props = {
  title: string;
  items: SimpleItem[];
  isLoading: boolean;
  onAddClick: () => void;
  onDelete: (id: string) => void;
};

export default function SimpleListBlock({
  title,
  items,
  isLoading,
  onAddClick,
  onDelete,
}: Props) {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={onAddClick}
          className="px-3 py-1 text-sm bg-black text-white rounded"
        >
          Add
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      {!isLoading && items.length === 0 && (
        <p className="text-sm text-gray-500">No items</p>
      )}

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border rounded px-3 py-2"
          >
            <span>
              {item.nameEn} / {item.nameFi}
            </span>

            <button
              onClick={() => onDelete(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
