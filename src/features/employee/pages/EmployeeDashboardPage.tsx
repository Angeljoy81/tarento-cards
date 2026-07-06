import { useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import { ROUTES } from "@/config/routes";
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
      title=""
      subtitle=""
      employee={profile}
    >
      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-navy-500">
            Good Morning,
          </h1>

          <p className="mt-1 text-base text-mid-gray">
            {profile.name}
          </p>

          <p className="mt-1 text-sm text-mid-gray">
            Here's what's happening with your digital
            business card today.
          </p>

        </div>

      </div>

      {/* Dashboard Content */}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

          <div className="flex min-h-0 flex-col overflow-hidden rounded-card border border-light-gray bg-white p-3 shadow-[0_12px_30px_rgba(23,40,60,0.06)]">
            <div className="flex-1 min-h-0">
              <VisitsChart
                data={visits}
                range={range}
                onRangeChange={setRange}
              />
            </div>
          </div>
        </div>

        <section className="col-span-12 lg:col-span-4 flex min-h-0 flex-col rounded-card border border-light-gray bg-white p-3 shadow-[0_12px_30px_rgba(23,40,60,0.06)]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-navy-500">
                Live Preview
              </h2>

              <p className="mt-1 text-xs text-mid-gray">
                Public visitor card preview.
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                navigate(ROUTES.EMPLOYEE_EDIT_PROFILE)
              }
            >
              Edit Profile
            </Button>
          </div>

          <div className="flex-1 overflow-auto">
            <BusinessCardPlaceholder />
          </div>
        </section>
      </div>
    </div>
  </div>
    </EmployeeLayout>
  );
}
