export const ROUTES = {
  // Static routes are fine as strings
  COMPONENT_TEST: '/components-test',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PROFILE: '/admin/profile',
  ADMIN_EMPLOYEES: '/admin/employees',
  ADMIN_COMPANY_PROFILE: '/admin/company-profile',
  
  EMPLOYEE_ACCESS_REQUEST: '/employee/request-access',
  EMPLOYEE_DASHBOARD: '/employee/dashboard',
  EMPLOYEE_EDIT_PROFILE: '/employee/profile/edit',
  EMPLOYEE_SHARE: '/employee/share',

  // Dynamic routes MUST be functions
  PUBLIC_CARD: (slug: string) => `/c/${slug}`,
} as const;
