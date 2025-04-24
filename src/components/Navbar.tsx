import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, Briefcase, Wrench, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { name: 'Buy', icon: <ShoppingCart size={18} />, path: '/buy' },
    { name: 'Sell', icon: <ShoppingCart size={18} />, path: '/sell' },
    { name: 'Jobs', icon: <Briefcase size={18} />, path: '/jobs' },
    { name: 'Services', icon: <Wrench size={18} />, path: '/services' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors
                  ${isActive(item.path) 
                    ? 'bg-accent-400 text-navy-900 font-medium' 
                    : 'text-navy-800 hover:bg-navy-100'}`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy-100 hover:bg-navy-200 transition-colors"
                >
                  <User size={18} />
                  Profile
                </Link>
                <button 
                  onClick={signOut}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy-100 hover:bg-navy-200 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="px-6 py-2 rounded-full border border-navy-200 hover:border-navy-300 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2 rounded-full bg-accent-400 text-navy-900 hover:bg-accent-500 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 p-3 rounded-lg transition-colors
                  ${isActive(item.path) 
                    ? 'bg-accent-400 text-navy-900 font-medium' 
                    : 'text-navy-800 hover:bg-navy-100'}`}
                onClick={closeMenu}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <div className="border-t border-gray-200 pt-3 mt-3">
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 p-3 rounded-lg text-navy-800 hover:bg-navy-100"
                    onClick={closeMenu}
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                    className="w-full flex items-center gap-2 p-3 rounded-lg text-navy-800 hover:bg-navy-100"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link 
                    to="/login" 
                    className="block w-full text-center p-3 rounded-lg border border-navy-200"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block w-full text-center p-3 rounded-lg bg-accent-400 text-navy-900"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};