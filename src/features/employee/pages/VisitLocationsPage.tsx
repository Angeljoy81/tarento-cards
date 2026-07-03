import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";

import EmployeeLayout from "../components/EmployeeLayout";
import { useEmployeeProfile } from "../hooks/useEmployeeProfile";

const locations = [
  {
    city: "Bengaluru",
    visits: 142,
  },
  {
    city: "Kochi",
    visits: 84,
  },
  {
    city: "Chennai",
    visits: 63,
  },
  {
    city: "Hyderabad",
    visits: 41,
  },
  {
    city: "Pune",
    visits: 29,
  },
];

export default function VisitLocationsPage() {
  const navigate = useNavigate();

  const {
    profile,
    isLoading,
  } = useEmployeeProfile();

  const totalVisits = locations.reduce(
    (sum, item) => sum + item.visits,
    0
  );

  const maxVisits = Math.max(
    ...locations.map((item) => item.visits)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20">
        Unable to load profile.
      </div>
    );
  }

  return (
    <EmployeeLayout
      title="Card Visit Locations"
      subtitle="See where your digital card has been viewed."
      employee={profile}
    >
      <div className="mx-auto w-full max-w-6xl space-y-6">

      <Button
        variant="tertiary"
        onClick={() => navigate(-1)}
      >
        <div className="flex items-center gap-2">
          <Icon
            icon={ArrowLeft}
            size={20}
          />
          Back
        </div>
      </Button>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
        <Card>
          <p className="text-sm font-semibold uppercase text-mid-gray">
            Total location visits
          </p>

          <div className="mt-3 flex items-end gap-3">
            <span className="text-4xl font-bold text-navy-500">
              {totalVisits}
            </span>

            <span className="pb-1 text-sm text-mid-gray">
              visits across {locations.length} cities
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
            <Icon
              icon={MapPin}
              tone="secondary"
              size={24}
            />
          </div>

          <div>
            <p className="text-sm text-mid-gray">
              Top city
            </p>

            <p className="font-semibold text-navy-500">
              {locations[0].city}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-navy-500">
            Card visit locations
          </h2>

          <p className="mt-1 text-sm text-mid-gray">
            Where people scanned or opened your digital card in the last 30 days.
          </p>
        </div>

        <div className="space-y-5">

          {locations.map((location) => (

            <div
              key={location.city}
              className="grid gap-3 md:grid-cols-[160px_minmax(0,1fr)_90px] md:items-center"
            >

              <div className="flex items-center gap-3">

                <Icon
                  icon={MapPin}
                  tone="secondary"
                  size={20}
                />

                <span className="font-medium text-navy-500">
                  {location.city}
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-off-white">
                <div
                  className="h-full rounded-full bg-teal-500"
                  style={{
                    width: `${Math.round(
                      (location.visits / maxVisits) * 100
                    )}%`,
                  }}
                />
              </div>

              <span className="text-right text-sm font-medium text-mid-gray">
                {location.visits} visits
              </span>

            </div>

          ))}

        </div>

      </Card>

      </div>
    </EmployeeLayout>
  );
}
