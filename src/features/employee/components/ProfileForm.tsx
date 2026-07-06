import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";

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
  isEditing?: boolean;
  onEdit: () => void;
  onSave: (data: EmployeeProfile, file: File | null) => void;
  onCancel?: () => void;
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
  isEditing = false,
  onEdit,
  onSave,
  onCancel,
}: ProfileFormProps) {
  const [formData, setFormData] =
    useState<EmployeeProfile>(() =>
      normalizeProfile(profile)
    );
  const [selectedImageFile, setSelectedImageFile] =
    useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] =
    useState(profile.avatar ?? "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setAvatarPreviewUrl(profile.avatar ?? "");
    setSelectedImageFile(null);
  }, [profile]);

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleLinkedInChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      linkedin: e.target.value,
    }));
  };

  const handleAvatarClick = () => {
    if (!isEditing) return;
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    if (avatarPreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }

    setSelectedImageFile(file);
    setAvatarPreviewUrl(objectUrl);
    setFormData((prev) => ({
      ...prev,
      avatar: objectUrl,
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
    <div className="space-y-3 h-full">
      <Card padding="md" className="p-4 sm:p-5 h-full">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-navy-500">
              Profile Details
            </h2>
            <p className="mt-1 text-sm text-mid-gray">
              These details are managed by your administrator.
            </p>
          </div>

          {!isEditing ? (
            <Button variant="secondary" onClick={() => onEdit()}>
              <div className="flex items-center gap-2">
                <Icon icon={Pencil} size={20} />
                Edit Profile
              </div>
            </Button>
          ) : null}
        </div>

        <div className="mb-4 flex justify-center">
          <div
            className={`group relative inline-flex rounded-full border border-light-gray bg-slate-100 transition ${
              isEditing ? "cursor-pointer hover:border-teal-500" : ""
            }`}
            onClick={handleAvatarClick}
          >
            <Avatar
              src={avatarPreviewUrl || undefined}
              name={formData.name}
              size="xl"
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
            />

            {isEditing ? (
              <div className="pointer-events-none absolute inset-0 hidden items-center justify-center rounded-full bg-slate-900/30 text-white group-hover:flex">
                <Icon icon={Pencil} size={20} className="text-white" />
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">

          <div>

            <label className="mb-1.5 block text-sm font-medium text-mid-gray">
              Full Name
            </label>

            <div
              title="This field is locked by administration"
              className="rounded-button border border-light-gray bg-slate-100 px-3 py-2.5 text-sm text-slate-500 hover:cursor-not-allowed"
            >
              {formData.name}
            </div>

          </div>

          <div>

            <label className="mb-1.5 block text-sm font-medium text-mid-gray">
              Job Title
            </label>

            <div
              title="This field is locked by administration"
              className="rounded-button border border-light-gray bg-slate-100 px-3 py-2.5 text-sm text-slate-500 hover:cursor-not-allowed"
            >
              {formData.jobTitle}
            </div>

          </div>

          <div>

            <label className="mb-1.5 block text-sm font-medium text-mid-gray">
              Department
            </label>

            <div
              title="This field is locked by administration"
              className="rounded-button border border-light-gray bg-slate-100 px-3 py-2.5 text-sm text-slate-500 hover:cursor-not-allowed"
            >
              {formData.department}
            </div>

          </div>

          <div>

            <label className="mb-1.5 block text-sm font-medium text-mid-gray">
              Phone Number
            </label>

            <div
              title="This field is locked by administration"
              className="rounded-button border border-light-gray bg-slate-100 px-3 py-2.5 text-sm text-slate-500 hover:cursor-not-allowed"
            >
              {formData.phone}
            </div>

          </div>

          <div>

            <label className="mb-1.5 block text-sm font-medium text-mid-gray">
              Email Address
            </label>

            <div
              title="This field is locked by administration"
              className="rounded-button border border-light-gray bg-slate-100 px-3 py-2.5 text-sm text-slate-500 hover:cursor-not-allowed"
            >
              {formData.email}
            </div>

          </div>

          <div>

            <label className="mb-1.5 block text-sm font-medium text-mid-gray">
              LinkedIn Profile
            </label>

            <input
              type="text"
              value={formData.linkedin}
              onChange={handleLinkedInChange}
              readOnly={!isEditing}
              className={`w-full rounded-button border px-3 py-2.5 text-sm outline-none transition ${
                isEditing
                  ? "bg-white border-teal-200 focus:border-teal-500"
                  : "bg-slate-100 border-light-gray text-slate-500"
              }`}
            />

          </div>

          </div>

          <div className="rounded-xl border border-light-gray bg-off-white/60 p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-navy-500">
                  About (Bio)
                </h3>
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
              readOnly={!isEditing}
              className={`w-full resize-none rounded-button px-3 py-2.5 text-sm outline-none transition ${
                isEditing
                  ? "bg-white border-teal-200 border focus:border-teal-500"
                  : "bg-slate-100 border-light-gray text-slate-500"
              }`}
            />
          </div>

          <div className={isEditing ? "rounded-xl border border-teal-200 bg-white p-3" : "rounded-xl border border-light-gray bg-off-white/60 p-3"}>
            <h3 className="mb-2 text-sm font-semibold text-navy-500">
              Areas of Expertise
            </h3>
            <div className={isEditing ? "" : "opacity-90"}>
              <CuratedFieldPicker
                availableFields={expertiseFields}
                selectedFields={formData.curatedFields}
                isEditing={isEditing}
                onAdd={isEditing ? handleAddField : () => undefined}
                onRemove={isEditing ? handleRemoveField : () => undefined}
              />
            </div>
          </div>

          {isEditing ? (
              <div className="mt-4 flex flex-col-reverse gap-3 border-t border-light-gray pt-3 sm:flex-row sm:justify-end">
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  setFormData(normalizeProfile(profile));
                  onCancel?.();
                }}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                type="button"
                disabled={isSaving}
                onClick={() => onSave(formData, selectedImageFile)}
                className="w-full sm:w-auto"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
