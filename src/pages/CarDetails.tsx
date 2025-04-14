import { ArrowLeft, Camera } from 'lucide-react';
import { Logo } from '../components/Logo';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

export const CarDetails = () => {
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
        <h1 className="text-2xl font-bold text-white mb-6">Car Details</h1>
        
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 rounded-lg bg-black/50 text-white placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select className="w-full p-3 rounded-lg bg-black/50 text-white">
              <option value="">Select Year</option>
              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select className="w-full p-3 rounded-lg bg-black/50 text-white">
              <option value="">Select Brand</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="ford">Ford</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select className="w-full p-3 rounded-lg bg-black/50 text-white">
              <option value="">Select Model</option>
            </select>

            <input
              type="number"
              placeholder="Price"
              className="w-full p-3 rounded-lg bg-black/50 text-white placeholder-gray-400"
            />
          </div>

          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 rounded-lg bg-black/50 text-white placeholder-gray-400"
          />

          <textarea
            placeholder="Write description about your car"
            rows={4}
            className="w-full p-3 rounded-lg bg-black/50 text-white placeholder-gray-400"
          />

          <button type="button" className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-black/50 text-white">
            <Camera className="w-5 h-5" />
            Upload Images/Video
          </button>

          <button type="submit" className="w-full bg-yellow-400 text-gray-900 p-3 rounded-lg font-semibold">
            Sell Your Car
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
};