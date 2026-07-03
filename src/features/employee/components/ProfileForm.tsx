import { useState } from "react";
import { Lock } from "lucide-react";

import Avatar from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";

import CuratedFieldPicker from "./CuratedFieldPicker";

import type {
  EmployeeProfile,
  CuratedField,
} from "../types/employee.types";

interface ProfileFormProps {
  profile: EmployeeProfile;
  isSaving?: boolean;
  onSave: (data: EmployeeProfile) => void;
}

const expertiseFields: CuratedField[] = [
  {
    id: "react",
    label: "React",
    value: "React",
  },
  {
    id: "typescript",
    label: "TypeScript",
    value: "TypeScript",
  },
  {
    id: "figma",
    label: "Figma",
    value: "Figma",
  },
  {
    id: "design-system",
    label: "Design Systems",
    value: "Design Systems",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    value: "Accessibility",
  },
  {
    id: "leadership",
    label: "Leadership",
    value: "Leadership",
  },
  {
    id: "node",
    label: "Node.js",
    value: "Node.js",
  },
  {
    id: "dotnet",
    label: ".NET",
    value: ".NET",
  },
];

const normalizeProfile = (
  profile: EmployeeProfile
): EmployeeProfile => ({
  ...profile,
  curatedFields: profile.curatedFields.filter((field) =>
    expertiseFields.some((item) => item.id === field.id)
  ),
});

export default function ProfileForm({
  profile,
  isSaving = false,
  onSave,
}: ProfileFormProps) {
  const [formData, setFormData] =
    useState<EmployeeProfile>(() =>
      normalizeProfile(profile)
    );

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleAddField = (
    field: CuratedField
  ) => {
    if (
      formData.curatedFields.some(
        (item) => item.id === field.id
      )
    ) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      curatedFields: [
        ...prev.curatedFields,
        field,
      ],
    }));
  };

  const handleRemoveField = (
    id: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      curatedFields:
        prev.curatedFields.filter(
          (item) => item.id !== id
        ),
    }));
  };

  return (
    <div className="space-y-8">

      {/* ===========================================
            YOUR DETAILS
      ============================================ */}

      <Card>

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold text-navy-500">
              Your Details
            </h2>

            <p className="mt-1 text-sm text-mid-gray">
              These details are managed by your administrator.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full border border-light-gray bg-off-white px-3 py-2">

            <Icon
              icon={Lock}
              size={16}
              tone="disabled"
            />

            <span className="text-sm text-mid-gray">
              Locked Info
            </span>

          </div>

        </div>

        <div className="mb-8 flex justify-center">

          <Avatar
            src={formData.avatar}
            name={formData.name}
            size="xl"
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium text-mid-gray">
              Full Name
            </label>

            <div className="flex items-center justify-between rounded-button border border-light-gray bg-off-white px-4 py-3">

              <span>{formData.name}</span>

              <Icon
                icon={Lock}
                size={16}
                tone="disabled"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-mid-gray">
              Job Title
            </label>

            <div className="flex items-center justify-between rounded-button border border-light-gray bg-off-white px-4 py-3">

              <span>{formData.jobTitle}</span>

              <Icon
                icon={Lock}
                size={16}
                tone="disabled"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-mid-gray">
              Department
            </label>

            <div className="flex items-center justify-between rounded-button border border-light-gray bg-off-white px-4 py-3">

              <span>{formData.department}</span>

              <Icon
                icon={Lock}
                size={16}
                tone="disabled"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-mid-gray">
              Phone Number
            </label>

            <div className="flex items-center justify-between rounded-button border border-light-gray bg-off-white px-4 py-3">

              <span>{formData.phone}</span>

              <Icon
                icon={Lock}
                size={16}
                tone="disabled"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-mid-gray">
              Email Address
            </label>

            <div className="flex items-center justify-between rounded-button border border-light-gray bg-off-white px-4 py-3">

              <span>{formData.email}</span>

              <Icon
                icon={Lock}
                size={16}
                tone="disabled"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-mid-gray">
              LinkedIn Profile
            </label>

            <div className="flex items-center justify-between rounded-button border border-light-gray bg-off-white px-4 py-3">

              <span className="truncate">
                {formData.linkedin}
              </span>

              <Icon
                icon={Lock}
                size={16}
                tone="disabled"
              />

            </div>

          </div>

        </div>

      </Card>

      {/* ===========================================
            ABOUT
      ============================================ */}

      <Card>

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold text-navy-500">
              About (Bio)
            </h2>

            <p className="mt-1 text-sm text-mid-gray">
              A short summary shown on your digital business card.
            </p>

          </div>

          <span className="text-sm text-mid-gray">
            {formData.description.length}/100
          </span>

        </div>

        <textarea
          rows={4}
          maxLength={100}
          value={formData.description}
          onChange={handleDescriptionChange}
          className="w-full resize-none rounded-button border border-light-gray px-4 py-3 outline-none focus:border-teal-500"
        />

      </Card>

      {/* ===========================================
            AREAS OF EXPERTISE
      ============================================ */}

      <Card>

        <h2 className="mb-6 text-xl font-semibold text-navy-500">
          Areas of Expertise
        </h2>

        <CuratedFieldPicker
          availableFields={expertiseFields}
          selectedFields={formData.curatedFields}
          onAdd={handleAddField}
          onRemove={handleRemoveField}
        />
      </Card>

      {/* ===========================================
            ACTIONS
      ============================================ */}

      <div className="flex flex-col-reverse gap-3 border-t border-light-gray pt-6 sm:flex-row sm:justify-end">

        <Button
          variant="secondary"
          type="button"
          onClick={() =>
            setFormData(normalizeProfile(profile))
          }
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          type="button"
          disabled={isSaving}
          onClick={() => onSave(formData)}
        >
          {isSaving
            ? "Saving..."
            : "Save Changes"}
        </Button>

      </div>

    </div>
  );
}
