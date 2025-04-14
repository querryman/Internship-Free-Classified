import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { supabase } from '../lib/supabaseClient';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="bg-navy-900 rounded-3xl p-8 space-y-6 w-full max-w-md">
        <div className="text-white space-y-2">
          <h1 className="text-4xl font-bold">Hello!</h1>
          <p>Welcome to TradeX</p>
        </div>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="flex-1 bg-yellow-400 text-center py-2 rounded-full font-semibold"
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

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-full bg-white/10 text-white placeholder-gray-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-full bg-white/10 text-white placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 p-3 rounded-full font-semibold"
          >
            Login
          </button>
        </form>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-full">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white p-3 rounded-full">
            <img
              src="https://www.facebook.com/favicon.ico"
              alt="Facebook"
              className="w-5 h-5"
            />
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};
