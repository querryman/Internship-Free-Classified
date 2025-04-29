import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { AuthLayout } from '../../components/AuthLayout';
import { OAuthButtons } from '../../components/OAuthButtons';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, signInWithOAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        // Redirect to home with a success state
        navigate('/home', { state: { registered: true } });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: 'google' | 'facebook') => {
    setError('');
    setLoading(true);
    
    try {
      const { error } = await signInWithOAuth(provider);
      
      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError(err.message || `Failed to sign up with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join TradeX today"
      footer={<OAuthButtons onOAuthClick={handleOAuthSignup} loading={loading} />}
    >
      <div className="flex gap-4">
        <Link
          to="/login"
          className="flex-1 border border-gray-400 text-white text-center py-2 rounded-full"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="flex-1 bg-accent-400 text-center py-2 rounded-full font-semibold text-navy-900"
        >
          Sign up
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-full bg-white/10 text-white placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-full bg-white/10 text-white placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-full bg-white/10 text-white placeholder-gray-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-xs text-gray-400">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-accent-400 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-accent-400 hover:underline">
            Privacy Policy
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={loading}
        >
          Create Account
        </Button>
      </form>
    </AuthLayout>
  );
};