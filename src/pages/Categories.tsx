import { ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';
import { BottomNav } from '../components/BottomNav';
import { Link, useNavigate } from 'react-router-dom';

export const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="bg-yellow-400 p-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <Logo />
        <div className="w-6" /> {/* Empty div for spacing */}
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Categories</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <Link to="/shopping" className="bg-white p-6 rounded-xl text-center">
            <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100"
                alt="Buy"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <p className="font-semibold">Buy</p>
          </Link>
          
          <Link to="/sell" className="bg-white p-6 rounded-xl text-center">
            <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2">
              <img 
                src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=100"
                alt="Sell"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <p className="font-semibold">Sell</p>
          </Link>
          
          <Link to="/jobs" className="bg-white p-6 rounded-xl text-center">
            <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2">
              <img 
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=100"
                alt="Jobs"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <p className="font-semibold">Jobs</p>
          </Link>
          
          <Link to="/services" className="bg-white p-6 rounded-xl text-center">
            <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100"
                alt="Services"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <p className="font-semibold">Services</p>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};