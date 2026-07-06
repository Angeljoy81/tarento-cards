import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

import EmployeeLayout from "../components/EmployeeLayout";
import ProfileForm from "../components/ProfileForm";
import { useEmployeeProfile } from "../hooks/useEmployeeProfile";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const {
    profile,
    isLoading,
    updateProfile,
    isSaving,
  } = useEmployeeProfile();

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
      <div className="mx-auto max-w-5xl space-y-8">

      {/* Back Button */}

      <Button
        variant="tertiary"
        onClick={() => navigate(-1)}
      >
        <div className="flex items-center gap-2">
          <Icon icon={ArrowLeft} size={20} />
          Back
        </div>
      </Button>

      {/* Page Header */}

      <div>

        <h1 className="text-3xl font-bold text-navy-500">
          Edit Profile
        </h1>

        <p className="mt-2 text-mid-gray">
          Update your About section and additional information shown on your
          digital business card.
        </p>

      </div>

      {/* Profile Form */}

      <ProfileForm
        profile={profile}
        isSaving={isSaving}
        onSave={updateProfile}
      />

      </div>
    </EmployeeLayout>
  );
}
