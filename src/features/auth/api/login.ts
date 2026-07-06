import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../stores/authStore';
import type { AuthResponse, LoginCredentials } from '../types/auth';

export async function login(credentials?: LoginCredentials): Promise<AuthResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Azure ID Bypass (No credentials provided)
      if (!credentials) {
        resolve({
          user: { id: 'emp-01', name: import.meta.env.VITE_DEMO_EMPLOYEE_NAME, email: import.meta.env.VITE_DEMO_EMPLOYEE_EMAIL, role: 'employee' },
          token: 'mock-azure-jwt',
        });
        return;
      }

      if (
        credentials.email === import.meta.env.VITE_DEMO_ADMIN_EMAIL &&
        credentials.password === import.meta.env.VITE_DEMO_ADMIN_PASSWORD
      ) {
        resolve({
          user: { id: 'admin-01', name: import.meta.env.VITE_DEMO_ADMIN_NAME, email: credentials.email, role: 'admin' },
          token: 'mock-admin-jwt',
        });
        return;
      }

      if (
        credentials.email === import.meta.env.VITE_DEMO_EMPLOYEE_EMAIL &&
        credentials.password === import.meta.env.VITE_DEMO_EMPLOYEE_PASSWORD
      ) {
        resolve({
          user: { id: 'emp-01', name: import.meta.env.VITE_DEMO_EMPLOYEE_NAME, email: credentials.email, role: 'employee' },
          token: 'mock-emp-jwt',
        });
        return;
      }

      reject(new Error('Invalid credentials provided.'));
    }, 800);
  });
}

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginCredentials | undefined>({
    mutationFn: login,
    onSuccess: (data) => {
      // Pass the role explicitly from the matched user object
      useAuthStore.getState().setSession(data.user, data.user.role, data.token);
    },
  });
}