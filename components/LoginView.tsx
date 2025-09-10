import React, { useState } from 'react';
import { Button } from './Button';

interface LoginViewProps {
  onLogin: (password: string) => boolean; // Returns true on success, false on failure
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = onLogin(password);
    if (!success) {
      setError('Invalid password. Please try again.');
    }
    
    // Simulate a brief delay to give feedback to the user
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">Admin Login</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
        Enter the password to access the admin dashboard.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            // FIX: Corrected a typo in the onChange event handler. `e.dark.value` should be `e.target.value`.
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-white"
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};
