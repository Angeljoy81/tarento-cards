import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-navy-700">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-navy-500 max-w-2xl">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center">{actions}</div>}
      </div>
    </div>
  );
}
