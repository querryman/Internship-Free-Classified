import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between p-8">
      <div className="w-full flex justify-center pt-8">
        <Logo />
      </div>
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Everything you<br />need in go</h1>
        <p className="text-gray-600">Easily buy & sell products, find jobs, and discover<br />local services, all in one app!</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors"
        >
          Get started
        </button>
      </div>

      <div className="w-full">
        <img 
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600"
          alt="Person working"
          className="w-full max-w-md mx-auto rounded-t-3xl"
        />
      </div>
    </div>
  );
};