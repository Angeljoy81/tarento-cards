import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../lib/utils.ts';

interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  active?: boolean;
  href?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  className?: string;
}

export function Sidebar({ items, title, className }: SidebarProps) {
  const location = useLocation();

  const resolvedItems = items.map((item) => ({
    ...item,
    active: item.active ?? item.href === location.pathname,
  }));

  return (
    <aside className={cn("w-64 bg-white border-r border-light-gray shadow-sm", className)}>
      <div className="flex flex-col h-full">
        {title && (
          <div className="px-6 py-4 border-b border-light-gray">
            <h2 className="text-lg font-semibold text-navy-500">{title}</h2>
          </div>
        )}
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {resolvedItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-md text-left font-medium transition-colors",
                item.active
                  ? "!bg-teal-600 !text-white shadow-sm border-l-4 border-teal-400 hover:!bg-teal-600 focus:!bg-teal-600 hover:!text-white focus:!text-white"
                  : "text-navy-500 hover:text-white hover:bg-white/10 focus:text-white focus:bg-navy-400"
              )}
            >
              {item.icon && (
                <span className={cn("shrink-0 text-current", item.active && "!text-white")}>
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
