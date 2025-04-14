import { ArrowLeft, Search, Heart } from 'lucide-react';
import { Logo } from '../components/Logo';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

export const Shopping = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-900 pb-20">
      <div className="bg-yellow-400 p-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <Logo />
        <div className="w-6" /> {/* Empty div for spacing */}
      </div>

      <div className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400"
          />
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Keep Shopping For</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/50 rounded-xl overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300"
                alt="Crocs Shoes"
                className="w-full h-40 object-cover"
              />
              <Heart className="absolute top-2 right-2 w-6 h-6 text-white" />
            </div>
            <div className="p-3">
              <p className="text-2xl font-bold text-white">₹4,499</p>
              <p className="text-sm text-gray-300">Crocs Shoes</p>
              <p className="text-xs text-gray-400">Kanminike</p>
            </div>
          </div>

          <div className="bg-black/50 rounded-xl overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=300"
                alt="TONE WINNER"
                className="w-full h-40 object-cover"
              />
              <Heart className="absolute top-2 right-2 w-6 h-6 text-white" />
            </div>
            <div className="p-3">
              <p className="text-2xl font-bold text-white">₹55,000</p>
              <p className="text-sm text-gray-300">TONE WINNER-AD-...</p>
              <p className="text-xs text-gray-400">Kangeri</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};