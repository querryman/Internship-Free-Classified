import { Home, Grid, Camera, MessageCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-3">
      <Link to="/home" className={`${location.pathname === '/home' ? 'text-yellow-400' : 'text-gray-500'}`}>
        <Home className="w-6 h-6" />
      </Link>
      <Link to="/categories" className={`${location.pathname === '/categories' ? 'text-yellow-400' : 'text-gray-500'}`}>
        <Grid className="w-6 h-6" />
      </Link>
      <Link to="/post" className={`${location.pathname === '/post' ? 'text-yellow-400' : 'text-gray-500'}`}>
        <Camera className="w-6 h-6" />
      </Link>
      <Link to="/messages" className={`${location.pathname === '/messages' ? 'text-yellow-400' : 'text-gray-500'}`}>
        <MessageCircle className="w-6 h-6" />
      </Link>
      <Link to="/profile" className={`${location.pathname === '/profile' ? 'text-yellow-400' : 'text-gray-500'}`}>
        <User className="w-6 h-6" />
      </Link>
    </div>
  );
};