import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import type { LoginCredentials } from '../types/auth';

interface AdminLoginFormProps {
  onSubmit: (credentials?: LoginCredentials) => void;
  isLoading?: boolean;
  error?: string;
}

export function AdminLoginForm({ onSubmit, isLoading = false, error }: AdminLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="space-y-6">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="name@company.com"
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          required
        />

        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

        <Button variant="primary" type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-light-gray" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-mid-gray">Or continue with</span>
        </div>
      </div>

      <Button 
        variant="secondary" 
        type="button" 
        className="w-full" 
        onClick={() => onSubmit()} 
        disabled={isLoading}
      >
        Sign in with Azure ID (Employee)
      </Button>
    </div>
  );
}