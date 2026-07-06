import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Icon } from "@/components/Icon";

import type { CuratedField } from "../types/employee.types";

interface CuratedFieldPickerProps {
  availableFields: CuratedField[];
  selectedFields: CuratedField[];

  onAdd: (field: CuratedField) => void;

  onRemove: (fieldId: string) => void;
}

export default function CuratedFieldPicker({
  availableFields,
  selectedFields,
  onAdd,
  onRemove,
}: CuratedFieldPickerProps) {
  const [selectedId, setSelectedId] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const remainingFields = useMemo(() => {
    return availableFields.filter(
      (field) =>
        !selectedFields.some(
          (item) => item.id === field.id
        )
    );
  }, [availableFields, selectedFields]);

  const handleAdd = () => {
    if (!selectedId) return;

    const field = availableFields.find(
      (item) => item.id === selectedId
    );

    if (!field) return;

    onAdd(field);

    setSelectedId("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {selectedFields.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {selectedFields.map((field) => (
            <span
              key={field.id}
              className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700"
            >
              {field.label}

              <button
                type="button"
                aria-label={`Remove ${field.label}`}
                className="text-mid-gray transition-colors hover:text-destructive"
                onClick={() =>
                  onRemove(field.id)
                }
              >
                <Icon
                  icon={X}
                  size={16}
                  className="text-current"
                />
              </button>
            </span>
          ))}
        </div>
      )}

      {remainingFields.length > 0 && !isAdding && (
        <Button
          variant="secondary"
          type="button"
          onClick={() => setIsAdding(true)}
        >
          <div className="flex items-center gap-2">
            <Icon
              icon={Plus}
              size={20}
            />
            Add new
          </div>
        </Button>
      )}

      {remainingFields.length > 0 && isAdding && (
        <div className="rounded-button border border-dashed border-light-gray bg-off-white p-4">
          <Select
            label="Area of expertise"
            value={selectedId}
            onChange={setSelectedId}
            placeholder="Select an area"
            options={remainingFields.map(
              (field) => ({
                label: field.label,
                value: field.id,
              })
            )}
          />

          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="tertiary"
              type="button"
              onClick={() => {
                setSelectedId("");
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              type="button"
              disabled={!selectedId}
              onClick={handleAdd}
            >
              Add
            </Button>

          </div>

        </div>

      )}

    </div>
  );
}
