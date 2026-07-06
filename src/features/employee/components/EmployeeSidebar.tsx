import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Menu,
  UserCircle,
  X,
} from "lucide-react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";
import { ROUTES } from "@/config/routes";

const navItems = [
  {
    to: ROUTES.EMPLOYEE_DASHBOARD,
    path: ROUTES.EMPLOYEE_DASHBOARD,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: ROUTES.EMPLOYEE_EDIT_PROFILE,
    path: ROUTES.EMPLOYEE_EDIT_PROFILE,
    label: "My Profile",
    icon: UserCircle,
  },
];

export default function EmployeeSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const items = navItems.map((item) => ({
    id: item.to,
    label: item.label,
    href: item.path,
    active: location.pathname === item.path,
    icon: (
      <Icon
        icon={item.icon}
        size={20}
        className="text-current"
      />
    ),
    onClick: () => {
      navigate(item.to);
      setIsOpen(false);
    },
  }));

  const sidebar = (
    <aside className="flex h-full w-full flex-col bg-navy-500 text-off-white md:w-60">
      <div className="flex items-center gap-3 border-b border-navy-400 px-5 py-5">
        <Logo
          variant="dark"
          size="sm"
          className="shrink-0 rounded-button bg-white p-1.5"
        />

        <div>
          <p className="text-lg font-bold leading-tight">
            Tarento Enterprise
          </p>

          <p className="mt-1 text-xs text-navy-100">
            Admin Portal
          </p>
        </div>
      </div>

      <Sidebar
        items={items}
        className="h-full w-full border-r-0 bg-navy-500 shadow-none [&_nav]:px-3 [&_nav]:py-5 [&_button]:border-transparent [&_button]:text-navy-100 [&_button]:hover:bg-navy-400 [&_button]:hover:text-white [&_button.bg-teal-50]:bg-navy-400 [&_button.bg-teal-50]:text-white"
      />
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

      <div className="hidden h-full shrink-0 md:block">
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

          <div className="relative h-full w-64">
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
