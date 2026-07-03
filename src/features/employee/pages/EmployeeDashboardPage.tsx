import { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import StatCard from "@/components/StatCard";

import BusinessCardPlaceholder from "../components/BusinessCardPlaceholder";
import EmployeeLayout from "../components/EmployeeLayout";
import VisitsChart, {
  type VisitRange,
} from "../components/VisitsChart";

import { useEmployeeProfile } from "../hooks/useEmployeeProfile";
import { useCardVisits } from "../hooks/useCardVisits";

export default function EmployeeDashboardPage() {
  const navigate = useNavigate();

  const [range, setRange] =
    useState<VisitRange>("30d");

  const {
    profile,
    isLoading: profileLoading,
  } = useEmployeeProfile();

  const {
    visits,
    isLoading: visitsLoading,
  } = useCardVisits(range);

  if (profileLoading || visitsLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        Loading dashboard...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-24 text-center">
        Unable to load employee profile.
      </div>
    );
  }

  const totalVisits = visits.reduce(
    (sum, item) => sum + item.visits,
    0
  );

  return (
    <EmployeeLayout
      title="Tarento Card"
      subtitle="Track and manage your digital business card."
      employee={profile}
    >
      <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-navy-500">
            Good Morning,
          </h1>

          <p className="mt-2 text-lg text-mid-gray">
            {profile.name}
          </p>

          <p className="mt-1 text-mid-gray">
            Here's what's happening with your digital
            business card today.
          </p>

        </div>

        <div className="mt-6 flex gap-3 lg:mt-0">

          <Button
            variant="secondary"
            onClick={() =>
              navigate("/employee/my-profile")
            }
          >
            <div className="flex items-center gap-2">
              <Pencil size={18} />
              Edit Profile
            </div>
          </Button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          label="Total Visits"
          value={totalVisits}
          icon={Eye}
          trend={{
            direction: "up",
            value: "+18%",
          }}
        />

        <StatCard
          label="This Week"
          value={84}
          icon={Eye}
        />

        <StatCard
          label="Today's Visits"
          value={12}
          icon={Eye}
        />

      </div>

      {/* Visits */}

      <VisitsChart
        data={visits}
        range={range}
        onRangeChange={setRange}
      />

      {/* Live Preview */}

      <section>

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-navy-500">
              Live Preview
            </h2>

            <p className="mt-1 text-mid-gray">
              This is exactly how your business card
              will appear to visitors.
            </p>

          </div>

          <Button
            variant="secondary"
            onClick={() =>
              navigate("/employee/my-profile")
            }
          >
            Edit Profile
          </Button>

        </div>

        <div className="flex justify-center rounded-card border border-light-gray bg-off-white p-10">

          <BusinessCardPlaceholder />

        </div>

      </section>

      </div>
    </EmployeeLayout>
  );
}
