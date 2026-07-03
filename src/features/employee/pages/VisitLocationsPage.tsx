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
      <div className="space-y-8">

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

      <div>

        <h1 className="text-3xl font-bold text-navy-500">
          Visit Locations
        </h1>

        <p className="text-mid-gray mt-2">
          Your digital card has been viewed from
          {` `}
          <span className="font-medium text-navy-500">
            {totalVisits}
          </span>
          {` `}
          locations.
        </p>

      </div>

      <Card>

        <div className="divide-y divide-light-gray">

          {locations.map((location) => (

            <div
              key={location.city}
              className="flex items-center justify-between py-5"
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

              <span className="text-mid-gray">
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
