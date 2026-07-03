import type { ReactNode } from "react";

import EmployeeSidebar from "./EmployeeSidebar";
import EmployeeTopBar from "./EmployeeTopBar";

interface EmployeeLayoutProps {
  title: string;
  subtitle: string;
  employee: {
    avatar?: string;
    name: string;
    jobTitle: string;
  };
  children: ReactNode;
}

export default function EmployeeLayout({
  title,
  subtitle,
  employee,
  children,
}: EmployeeLayoutProps) {
  return (
    <div className="min-h-screen bg-off-white">
      <EmployeeSidebar />

      <main className="min-w-0 md:pl-64">
        <div className="space-y-6 p-4 md:p-8">
          <EmployeeTopBar
            title={title}
            subtitle={subtitle}
            employee={employee}
          />

          {children}
        </div>
      </main>
    </div>
  );
}
