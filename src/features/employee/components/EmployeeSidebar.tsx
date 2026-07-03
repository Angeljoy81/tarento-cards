import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Menu,
  UserCircle,
  X,
} from "lucide-react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

const navItems = [
  {
    to: "/employee/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/employee/my-profile",
    label: "My Profile",
    icon: UserCircle,
  },
];

export default function EmployeeSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const sidebar = (
    <aside className="flex h-full w-64 flex-col bg-navy-500 text-off-white">
      <div className="border-b border-navy-400 px-6 py-5">
        <p className="text-xl font-bold leading-tight">
          Tarento Enterprise
        </p>

        <p className="mt-1 text-sm text-navy-100">
          Admin Portal
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-button px-4 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-navy-400 text-white"
                  : "text-navy-100 hover:bg-navy-400 hover:text-white"
              )
            }
          >
            <Icon
              icon={item.icon}
              size={20}
              className="text-current"
            />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  return (
    <>
      <div className="border-b border-light-gray bg-white p-3 md:hidden">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center gap-2">
            <Icon icon={Menu} size={20} />
            Menu
          </div>
        </Button>
      </div>

      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:block">
        {sidebar}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close employee navigation"
            className="absolute inset-0 bg-almost-black/40"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative h-full">
            {sidebar}

            <button
              type="button"
              aria-label="Close employee navigation"
              className="absolute right-4 top-4 rounded-full bg-white p-2 text-navy-500 shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              <Icon icon={X} size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
