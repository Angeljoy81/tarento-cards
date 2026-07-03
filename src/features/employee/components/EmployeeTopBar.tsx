import Avatar from "@/components/Avatar";
import { Card } from "@/components/Card";

interface EmployeeTopBarProps {
  title: string;
  subtitle: string;
  employee: {
    avatar?: string;
    name: string;
    jobTitle: string;
  };
}

export default function EmployeeTopBar({
  title,
  subtitle,
  employee,
}: EmployeeTopBarProps) {
  return (
    <Card
      padding="sm"
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold text-navy-500 md:text-3xl">
          {title}
        </h1>

        <p className="mt-1 text-sm text-mid-gray md:text-base">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Avatar
          src={employee.avatar}
          name={employee.name}
          size="sm"
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-navy-500">
            {employee.name}
          </p>

          <p className="truncate text-xs text-mid-gray">
            {employee.jobTitle}
          </p>
        </div>
      </div>
    </Card>
  );
}
