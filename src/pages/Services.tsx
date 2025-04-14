import { ArrowLeft, Search } from 'lucide-react';
import { Logo } from '../components/Logo';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
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
            placeholder="Search Services"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400"
          />
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Home Services</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/50 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1632833239869-a37e22b06b59?auto=format&fit=crop&w=300"
              alt="Pest Control"
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <p className="text-white font-semibold">PEST CONTROL</p>
            </div>
          </div>

          <div className="bg-black/50 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=300"
              alt="Packers & Movers"
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <p className="text-white font-semibold">PACKERS & MOVERS</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="bg-black/50 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300"
              alt="Deep Cleaning"
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <p className="text-white font-semibold">DEEP CLEANING</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};