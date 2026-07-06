import { useState } from "react";
import { ArrowLeft, Pencil, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const {
    profile,
    isLoading,
    updateProfile,
    isSaving,
  } = useEmployeeProfile();

  const handleSave = (data: import("../types/employee.types").EmployeeProfile) => {
    updateProfile(data);
    setIsEditing(false);
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
      title="My Profile"
      subtitle="Update the public information visitors see on your card."
      employee={profile}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        <Button
          variant="tertiary"
          onClick={() => navigate(-1)}
        >
          <div className="flex items-center gap-2">
            <Icon icon={ArrowLeft} size={20} />
            Back
          </div>
        </Button>

        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-500">
              {isEditing ? "Edit Profile Mode" : "My Profile View"}
            </h1>
            <p className="mt-1 text-sm text-mid-gray">
              Update your public information and preview how it appears to visitors.
            </p>
          </div>

          {!isEditing && (
            <Button
              variant="secondary"
              onClick={() => setIsEditing(true)}
            >
              <div className="flex items-center gap-2">
                <Icon icon={Pencil} size={20} />
                Edit Profile
              </div>
            </Button>
          )}
        </div>

        <div className="grid gap-3 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className={isEditing ? "overflow-y-auto pr-1" : "pointer-events-none overflow-y-auto pr-1 opacity-80"}>
              <ProfileForm
                profile={profile}
                isSaving={isSaving}
                isEditing={isEditing}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="flex flex-col p-3 lg:min-h-[540px]">
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
