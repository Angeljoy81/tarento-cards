import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/Card';
import { Logo } from '../../../components/Logo';
import { ROUTES } from '../../../config/routes';
import { AdminLoginForm } from '../components/AdminLoginForm';
import { useLogin } from '../api/login';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  return (
    <div className="relative min-h-screen px-6 py-10 flex items-center justify-center overflow-hidden bg-off-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at top, rgba(23,40,60,0.10), transparent 40%), radial-gradient(circle at 80% 10%, rgba(30,143,142,0.12), transparent 28%), radial-gradient(circle at 20% 80%, rgba(240,165,0,0.10), transparent 24%)',
        }}
      />
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo variant="dark" size="md" />
        </div>

        <Card padding="lg" className="relative z-10">
          <div className="mb-6 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-500">Portal access</p>
            <h1 className="text-2xl font-semibold text-navy-500">Sign in to continue</h1>
            <p className="text-sm text-mid-gray">Use your credentials or Azure ID to log in.</p>
          </div>

          <AdminLoginForm
            onSubmit={(credentials) => {
              loginMutation.mutate(credentials, {
                onSuccess: (data) => {
                  if (data.user.role === 'admin') {
                    navigate(ROUTES.ADMIN_DASHBOARD);
                  } else {
                    navigate(ROUTES.EMPLOYEE_DASHBOARD);
                  }
                },
              });
            }}
            isLoading={loginMutation.isPending}
            error={loginMutation.error?.message}
          />
        </Card>
      </div>
    </div>
  );
}