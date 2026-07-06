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
    <div className="fixed inset-0 flex overflow-hidden bg-off-white">
      <EmployeeSidebar />

      <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
        <EmployeeTopBar
          title={title}
          subtitle={subtitle}
          employee={employee}
        />

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
