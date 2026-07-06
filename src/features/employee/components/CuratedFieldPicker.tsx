import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

import type { CuratedField } from "../types/employee.types";

interface CuratedFieldPickerProps {
  availableFields: CuratedField[];
  selectedFields: CuratedField[];
  isEditing?: boolean;

  onAdd: (field: CuratedField) => void;

  onRemove: (fieldId: string) => void;
}

export default function CuratedFieldPicker({
  availableFields,
  selectedFields,
  isEditing = false,
  onAdd,
  onRemove,
}: CuratedFieldPickerProps) {
  const [inputValue, setInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const remainingFields = useMemo(() => {
    return availableFields.filter(
      (field) =>
        !selectedFields.some(
          (item) => item.id === field.id
        )
    );
  }, [availableFields, selectedFields]);

  const normalizedInput = inputValue.trim();
  const exactMatchField = remainingFields.find(
    (field) => field.label.toLowerCase() === normalizedInput.toLowerCase()
  );
  const filteredFields = useMemo(
    () =>
      remainingFields.filter((field) =>
        field.label.toLowerCase().includes(normalizedInput.toLowerCase())
      ),
    [remainingFields, normalizedInput]
  );

  const addField = (field: CuratedField) => {
    onAdd(field);
    setInputValue("");
    setIsAdding(false);
  };

  const addCustomField = (label: string) => {
    const trimmedLabel = label.trim();
    if (!trimmedLabel) return;

    const newField: CuratedField = {
      id:
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `custom-${Date.now()}`,
      label: trimmedLabel,
      value: trimmedLabel,
    };

    addField(newField);
  };

  const handleAdd = () => {
    if (!normalizedInput) return;

    if (exactMatchField) {
      addField(exactMatchField);
      return;
    }

    addCustomField(normalizedInput);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }

    if (event.key === "Escape") {
      setIsAdding(false);
    }
  };

  const showAddOption =
    normalizedInput.length > 0 &&
    !exactMatchField &&
    !selectedFields.some(
      (field) => field.label.toLowerCase() === normalizedInput.toLowerCase()
    );

  return (
    <div className="space-y-4">
      {selectedFields.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {selectedFields.map((field) => (
            <span
              key={field.id}
              className={
                isEditing
                  ? "inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700"
                  : "inline-flex items-center gap-2 rounded-full border border-light-gray bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600"
              }
            >
              {field.label}

              {isEditing ? (
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
              ) : null}
            </span>
          ))}
        </div>
      )}

      {remainingFields.length > 0 && !isAdding && isEditing && (
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

      {remainingFields.length > 0 && isAdding && isEditing && (
        <div className="rounded-button border border-dashed border-light-gray bg-off-white p-4">
          <label className="mb-2 block text-sm font-medium text-navy-100">
            Area of expertise
          </label>

          <div className="relative">
            <input
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              onFocus={() => setIsAdding(true)}
              onBlur={() => setTimeout(() => setIsAdding(false), 150)}
              onKeyDown={handleKeyDown}
              placeholder="Type or select an expertise"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
            />

            {isAdding && (filteredFields.length > 0 || showAddOption) && (
              <div className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded border border-gray-200 bg-white shadow-lg">
                {filteredFields.map((field) => (
                  <button
                    key={field.id}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => addField(field)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100"
                  >
                    {field.label}
                  </button>
                ))}

                {showAddOption ? (
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => addCustomField(normalizedInput)}
                    className="w-full px-3 py-2 text-left font-medium text-primary hover:bg-gray-100"
                  >
                    Add “{inputValue}”
                  </button>
                ) : null}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="tertiary"
              type="button"
              onClick={() => {
                setInputValue("");
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              type="button"
              disabled={!normalizedInput}
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
