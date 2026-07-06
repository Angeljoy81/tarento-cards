import { useState } from "react";
import { Share2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import Modal from "@/components/Modal";
import { ROUTES } from "@/config/routes";

import BusinessCardPlaceholder from "../components/BusinessCardPlaceholder";
import EmployeeLayout from "../components/EmployeeLayout";
import ProfileForm from "../components/ProfileForm";
import QrShareCard from "../components/QrShareCard";
import { useEmployeeProfile } from "../hooks/useEmployeeProfile";

export default function EditProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const {
    profile,
    isLoading,
    updateProfile,
    isSaving,
  } = useEmployeeProfile();

  const handleSave = (
    data: import("../types/employee.types").EmployeeProfile,
    file: File | null
  ) => {
    updateProfile(data);
    setIsEditing(false);

    if (file) {
      // File is staged and available here for future upload handling.
      console.log("Selected avatar file ready to upload:", file.name);
    }
  };

  const profileUrl = profile
    ? `${window.location.origin}${ROUTES.PUBLIC_CARD(profile.id)}`
    : "";

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-mid-gray">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-destructive">
          Unable to load your profile.
        </p>
      </div>
    );
  }

  return (
    <EmployeeLayout
      title=""
      subtitle=""
      employee={profile}
    >
      <div className="w-full px-8 py-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy-500">
                {isEditing ? "Edit Profile Mode" : "My Profile View"}
              </h1>
              <p className="mt-1 text-sm text-mid-gray">
                Update your public information and preview how it appears to visitors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 flex flex-col h-full">
              <div className={isEditing ? "pr-1 h-full" : "pr-1 opacity-80 h-full"}>
                <ProfileForm
                  profile={profile}
                  isSaving={isSaving}
                  isEditing={isEditing}
                  onEdit={() => setIsEditing(true)}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col h-full">
              <Card className="flex flex-col p-3 h-full">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-navy-500">
                      Live Preview
                    </h2>
                    <p className="mt-1 text-sm text-mid-gray">
                      Public visitor card preview.
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-center rounded-xl border border-light-gray bg-off-white p-2 lg:min-h-[420px]">
                  <div className="flex w-full max-w-[280px] origin-top scale-[0.9] items-center justify-center rounded-[24px] border border-light-gray bg-white p-3 shadow-inner sm:scale-[0.95] lg:scale-100">
                    <BusinessCardPlaceholder />
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="mt-2 w-full"
                  onClick={() => setIsShareOpen(true)}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon icon={Share2} size={20} />
                    Share
                  </div>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isShareOpen}
        title="Share your card"
        onClose={() => setIsShareOpen(false)}
        className="max-w-xl"
      >
        <QrShareCard
          profileUrl={profileUrl}
          employeeName={profile.name}
          designation={profile.jobTitle}
        />
      </Modal>
    </EmployeeLayout>
  );
}
