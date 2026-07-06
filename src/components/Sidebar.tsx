import type { ReactNode } from 'react';
import { cn } from '../lib/utils.ts';

interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  active?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  className?: string;
}

export function Sidebar({ items, title, className }: SidebarProps) {
  return (
    <aside className={cn("w-64 bg-white border-r border-light-gray shadow-sm", className)}>
      <div className="flex flex-col h-full">
        {title && (
          <div className="px-6 py-4 border-b border-light-gray">
            <h2 className="text-lg font-semibold text-navy-500">{title}</h2>
          </div>
        )}
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left font-medium",
                item.active
                  ? "bg-teal-50 text-teal-500 border border-teal-200"
                  : "text-navy-500 hover:bg-off-white"
              )}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
