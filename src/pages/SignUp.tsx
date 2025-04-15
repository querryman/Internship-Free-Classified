import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { supabase } from '../lib/supabaseClient';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for confirmation.');
      navigate('/login');
    }
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="bg-gray-900 rounded-3xl p-8 space-y-6 w-full max-w-md">
        <div className="flex gap-4">
          <Link
            to="/login"
            className="flex-1 border border-gray-400 text-white text-center py-2 rounded-full"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="flex-1 bg-yellow-400 text-center py-2 rounded-full font-semibold"
          >
            Sign up
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-full bg-white/10 text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-full bg-white/10 text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-3 rounded-full"
          >
            Sign Up
          </button>
        </form>

        <div className="space-y-4">
          <button
            onClick={() => handleOAuth('google')}
            className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-full"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
          <button
            onClick={() => handleOAuth('facebook')}
            className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white p-3 rounded-full"
          >
            <img
              src="https://www.facebook.com/favicon.ico"
              alt="Facebook"
              className="w-5 h-5"
            />
            Sign up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};
