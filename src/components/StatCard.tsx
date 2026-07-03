import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Card } from "./Card";
import { Icon } from "./Icon";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    direction: "up" | "down";
    value: string;
  };
  icon?: LucideIcon;
}

const trendConfig = {
  up: {
    icon: TrendingUp,
    color: "text-success",
  },
  down: {
    icon: TrendingDown,
    color: "text-destructive",
  },
};

export default function StatCard({
  label,
  value,
  trend,
  icon,
}: StatCardProps) {
  return (
    <Card padding="sm">
      <div className="flex flex-col gap-2">

        <div className="flex items-center gap-2">

          {icon && <Icon icon={icon} tone="secondary" size={24} />}

          <p className="text-xs text-mid-gray">
            {label}
          </p>

        </div>

        <h2 className="text-2xl font-bold text-navy-500">
          {value}
        </h2>

        {trend && (
          <div
            className={`flex items-center gap-1 ${trendConfig[trend.direction].color}`}
          >
            <Icon
              icon={trendConfig[trend.direction].icon}
              tone="secondary"
              size={16}
            />

            <span className="text-sm font-medium">
              {trend.value}
            </span>
          </div>
        )}

      </div>
    </Card>
  );
}