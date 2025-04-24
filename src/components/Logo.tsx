import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-accent-400 p-2 rounded-full">
        <ShoppingBag className="h-6 w-6 text-navy-900" />
      </div>
      <span className="text-2xl font-bold text-navy-900">TradeX</span>
    </Link>
  );
};