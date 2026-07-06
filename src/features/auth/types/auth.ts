import type { Role } from '@/types/common.types';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AccessRequestResponse {
  requestId: string;
  status: 'pending';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AccessRequestPayload {
  fullName: string;
  workEmail: string;
  employeeId: string;
  department: string;
}