import Avatar from "@/components/Avatar";

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
    <header className="flex min-h-16 shrink-0 flex-col gap-3 border-b border-light-gray bg-white px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <h1 className="text-xl font-bold text-navy-500">
          {title}
        </h1>

        <p className="mt-1 text-xs text-mid-gray">
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
    </header>
  );
}
