import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, LogOut, UserCircle2 } from 'lucide-react';
import { Logo } from '../../components/Logo';
import { Icon } from '../../components/Icon';
import { ROUTES } from '../../config/routes';
import { cn } from '../../lib/utils';
import { useAuth } from '../../features/auth/hooks/useAuth';

export function AdminLayout() {
  const { user, logout } = useAuth();

  const navItems = [
    { to: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { to: ROUTES.ADMIN_PROFILE, label: 'Admin profile', icon: UserCircle2 },
    { to: ROUTES.ADMIN_EMPLOYEES, label: 'Employees', icon: Users },
    { to: ROUTES.ADMIN_COMPANY_PROFILE, label: 'Company profile', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-off-white flex flex-col md:flex-row">
      {/* Sidebar / Top Nav */}
      <aside className="bg-navy-500 text-off-white w-full md:w-64 md:min-h-screen flex flex-col shrink-0">
        <div className="p-4 md:p-6 flex items-center justify-between md:justify-center border-b border-navy-400 md:border-none">
          <Logo variant="dark" size="sm" className="md:hidden" />
          <Logo variant="dark" size="md" className="hidden md:flex" />
        </div>
        
        <nav className="flex-1 px-4 py-2 md:py-6 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-button font-sans text-sm font-semibold transition-colors whitespace-nowrap',
                  isActive ? 'bg-navy-400 text-white' : 'text-navy-100 hover:bg-navy-600 hover:text-white'
                )
              }
            >
              <Icon icon={item.icon} tone="disabled" className="inherit-color text-current" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-light-gray h-16 px-6 flex items-center justify-end shrink-0 gap-4">
          <span className="text-sm font-semibold text-navy-500">{user?.name ?? 'Admin User'}</span>
          <button type="button" onClick={logout} className="p-2 text-mid-gray hover:text-destructive transition-colors">
            <Icon icon={LogOut} className="text-inherit" />
          </button>
        </header>
        <div className="p-6 md:p-8 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}