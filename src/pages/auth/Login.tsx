import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { AuthLayout } from '../../components/AuthLayout';
import { OAuthButtons } from '../../components/OAuthButtons';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signInWithOAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setError(error.message);
      } else {
        navigate('/home');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    setError('');
    setLoading(true);
    
    try {
      const { error } = await signInWithOAuth(provider);
      
      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Hello!"
      subtitle="Welcome to TradeX"
      footer={<OAuthButtons onOAuthClick={handleOAuthLogin} loading={loading} />}
    >
      <div className="flex gap-4">
        <Link
          to="/login"
          className="flex-1 bg-accent-400 text-center py-2 rounded-full font-semibold text-navy-900"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="flex-1 border border-gray-400 text-white text-center py-2 rounded-full"
        >
          Sign up
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
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

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-accent-400 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={loading}
        >
          Login
        </Button>
      </form>
    </AuthLayout>
  );
};