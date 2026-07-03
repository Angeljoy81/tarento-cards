import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Input } from "@/components/Input";
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
  };

  return (
    <div className="space-y-6">

      {/* Existing Fields */}

      {selectedFields.map((field) => (

        <div
          key={field.id}
          className="flex items-end gap-4"
        >

          <div className="flex-1">

            <Input
              label={field.label}
              value={field.value}
              onChange={() => {}}
              disabled
            />

          </div>

          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              onRemove(field.id)
            }
          >
            <Icon
              icon={Trash2}
              size={20}
            />
          </Button>

        </div>

      ))}

      {/* Add Another */}

      {remainingFields.length > 0 && (

        <div className="rounded-button border border-dashed border-light-gray p-4">

          <Select
            label="Add another field"
            value={selectedId}
            onChange={setSelectedId}
            placeholder="+ Add another field..."
            options={remainingFields.map(
              (field) => ({
                label: field.label,
                value: field.id,
              })
            )}
          />

          <div className="mt-4 flex justify-end">

            <Button
              variant="primary"
              type="button"
              disabled={!selectedId}
              onClick={handleAdd}
            >
              Add Field
            </Button>

          </div>

        </div>

      )}

    </div>
  );
}