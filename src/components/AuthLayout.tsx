import React from 'react';
import { Logo } from './Logo';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="bg-navy-900 rounded-3xl p-8 space-y-6 w-full max-w-md">
        <div className="text-white space-y-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p>{subtitle}</p>
        </div>

        {children}

        {footer && (
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-600 w-full"></div>
            <span className="bg-navy-900 px-3 text-sm text-gray-400 absolute">
              or continue with
            </span>
          </div>
        )}

        {footer}
      </div>
    </div>
  );
};