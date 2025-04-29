import React from 'react';

interface OAuthButtonsProps {
  onOAuthClick: (provider: 'google' | 'facebook') => void;
  loading: boolean;
}

export const OAuthButtons: React.FC<OAuthButtonsProps> = ({ onOAuthClick, loading }) => {
  return (
    <div className="space-y-4">
      <button
        onClick={() => onOAuthClick('google')}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-full transition-opacity disabled:opacity-70"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </button>
      <button
        onClick={() => onOAuthClick('facebook')}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white p-3 rounded-full transition-opacity disabled:opacity-70"
      >
        <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
        Sign in with Facebook
      </button>
    </div>
  );
};