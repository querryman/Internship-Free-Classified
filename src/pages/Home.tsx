import { Search, MapPin, ArrowRight, Menu } from 'lucide-react';
import { Logo } from '../components/Logo';
import { BottomNav } from '../components/BottomNav';
import { useState } from 'react';
import { LocationModal } from '../components/LocationModal';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [location, setLocation] = useState('Bengaluru 12345, Karnataka');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="bg-yellow-400 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Search className="w-6 h-6" />
          <Logo />
          <button onClick={() => navigate('/profile')}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <button 
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-2 text-sm"
        >
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-orange-500 font-semibold">5% OFF</p>
            <p className="text-sm text-gray-600">Car Rental Discount<br />until May 21st 2015</p>
            <p className="text-xs text-gray-500">DISCOUNT CODE: SOFTWT1</p>
          </div>
          <div className="flex items-center gap-2 text-orange-500">
            <span>GET IT NOW</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <div className="bg-red-600 text-white p-4 rounded-lg">
            <h3 className="font-bold">WE ARE HIRING!</h3>
            <p className="text-sm">JOB POSITION</p>
            <ul className="text-xs list-disc ml-4 mt-2">
              <li>Competitive high salary</li>
              <li>Experience: 5 years</li>
              <li>Job at any time</li>
            </ul>
            <button className="bg-white text-red-600 px-4 py-1 rounded mt-2 text-sm font-bold">
              APPLY NOW!
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Fresh Recommendations for you</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300"
                alt="MICHEAL Michael kors"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <p className="font-bold">₹16,500</p>
              <p className="text-sm text-gray-600">MICHEAL Michael kors Crossbody bag women</p>
            </div>
            <div className="bg-white p-3 rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300"
                alt="Samsung Washing Machine"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <p className="font-bold">₹6,000</p>
              <p className="text-sm text-gray-600">SAMSUNG Front Load Washing Machine with warranty</p>
            </div>
          </div>
        </div>
      </div>

      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSave={setLocation}
      />

      <BottomNav />
    </div>
  );
};