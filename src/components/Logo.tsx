import { ShoppingBag } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="w-8 h-8 text-yellow-400" />
      <span className="text-xl font-bold text-yellow-400">TRADEX</span>
    </div>
  );
};