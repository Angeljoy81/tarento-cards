import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";

import type { VisitDataPoint } from "../types/employee.types";

export type VisitRange = "7d" | "30d" | "90d";

interface VisitsChartProps {
  data: VisitDataPoint[];
  range: VisitRange;
  onRangeChange: (range: VisitRange) => void;
}

const ranges: VisitRange[] = ["7d", "30d", "90d"];

export default function VisitsChart({
  data,
  range,
  onRangeChange,
}: VisitsChartProps) {
  const navigate = useNavigate();

  const totalVisits = data.reduce(
    (sum, item) => sum + item.visits,
    0
  );

  return (
    <Card>

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-xl font-semibold text-navy-500">
            Card Visits
          </h2>

          <p className="mt-1 text-mid-gray">
            Monitor how many people viewed your digital card.
          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          {ranges.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={
                range === item
                  ? "primary"
                  : "secondary"
              }
              onClick={() => onRangeChange(item)}
            >
              {item}
            </Button>
          ))}

        </div>

      </div>

      {/* Chart */}

      <div className="mt-8 h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="visits"
              stroke="var(--color-navy-500)"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Footer */}

      <div className="mt-8 flex flex-col gap-4 border-t border-light-gray pt-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm text-mid-gray">
            Total Visits
          </p>

          <h3 className="mt-1 text-3xl font-bold text-navy-500">
            {totalVisits}
          </h3>

        </div>

        <Button
          variant="secondary"
          onClick={() =>
            navigate("/employee/visit-locations")
          }
        >
          <div className="flex items-center gap-2">

            <Icon
              icon={MapPin}
              size={20}
            />

            View Locations

          </div>
        </Button>

      </div>

    </Card>
  );
}
