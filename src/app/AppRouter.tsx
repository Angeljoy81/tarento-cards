import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { ROLES } from '../config/auth';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { EmployeeLayout } from './layouts/EmployeeLayout';
import { AdminLoginPage } from '../features/auth/pages/AdminLoginPage';
import { EmployeeAccessRequestPage } from '../features/auth/pages/EmployeeAccessRequestPage';
import TestPage from '../pages/TestPage';

export function AppRouter() {
  return (
    <Routes>
        <Route path={ROUTES.COMPONENT_TEST} element={<TestPage />} />

        {/* Public / Unauthenticated Routes */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.PUBLIC_CARD(':slug')} element={<div className="p-8 text-almost-black">Public Card Page Stub</div>} />
          <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
          <Route path={ROUTES.EMPLOYEE_ACCESS_REQUEST} element={<EmployeeAccessRequestPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={
          <ProtectedRoute allowedRole={ROLES.ADMIN}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<div className="p-8 text-almost-black">Admin Dashboard Page Stub</div>} />
          <Route path={ROUTES.ADMIN_APPROVALS} element={<div className="p-8 text-almost-black">Approval Requests Page Stub</div>} />
          <Route path={ROUTES.ADMIN_EMPLOYEES} element={<div className="p-8 text-almost-black">Employee Directory Page Stub</div>} />
          <Route path={ROUTES.ADMIN_COMPANY_PROFILE} element={<div className="p-8 text-almost-black">Company Profile Page Stub</div>} />
        </Route>

        {/* Employee Routes */}
        <Route element={
          <ProtectedRoute allowedRole={ROLES.EMPLOYEE}>
            <EmployeeLayout />
          </ProtectedRoute>
        }>
          <Route path={ROUTES.EMPLOYEE_DASHBOARD} element={<div className="p-8 text-almost-black">Employee Dashboard Page Stub</div>} />
          <Route path={ROUTES.EMPLOYEE_EDIT_PROFILE} element={<div className="p-8 text-almost-black">Edit Profile Page Stub</div>} />
          <Route path={ROUTES.EMPLOYEE_SHARE} element={<div className="p-8 text-almost-black">Share QR Card Page Stub</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.ADMIN_LOGIN} replace />} />
      </Routes>
  );
}
