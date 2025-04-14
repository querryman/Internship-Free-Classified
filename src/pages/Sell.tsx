import { ArrowLeft, Car, Home, Grid2X2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { BottomNav } from '../components/BottomNav';

export const Sell = () => {
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
        <h1 className="text-2xl font-bold text-white mb-8">What are you offering to sell?</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <Link to="/sell/car" className="bg-black/50 p-6 rounded-xl text-center">
            <div className="flex items-center justify-center mb-4">
              <Car className="w-12 h-12 text-white" />
            </div>
            <p className="text-white font-semibold">Vehicles</p>
          </Link>
          
          <Link to="/sell/property" className="bg-black/50 p-6 rounded-xl text-center">
            <div className="flex items-center justify-center mb-4">
              <Home className="w-12 h-12 text-white" />
            </div>
            <p className="text-white font-semibold">Properties</p>
          </Link>
        </div>

        <Link to="/sell/others" className="mt-4 block">
          <div className="bg-black/50 p-6 rounded-xl text-center">
            <div className="flex items-center justify-center mb-4">
              <Grid2X2 className="w-12 h-12 text-white" />
            </div>
            <p className="text-white font-semibold">Others</p>
          </div>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
};