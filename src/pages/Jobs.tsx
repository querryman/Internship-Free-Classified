import { ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

export const Jobs = () => {
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
          <input
            type="text"
            placeholder="Start Job Search"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400"
          />
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Top Picks</h2>
        
        <div className="space-y-4">
          <JobCard
            logo="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=50"
            title="UX/UI Design Intern"
            company="Winvesta"
            location="Mumbai Metropolitan Region"
            type="(On - Site)"
            time="2 months ago"
          />
          
          <JobCard
            logo="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=50"
            title="UX/UI Intern"
            company="Plugzmart"
            location="Chennai, Tamil Nadu, India"
            type="(On - Site)"
            time="2 months ago"
          />
          
          <JobCard
            logo="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=50"
            title="Web Designer"
            company="Next Labs"
            location="Bengaluru, Karnataka, India"
            type="(On - Site)"
            time="1 year ago"
          />
          
          <JobCard
            logo="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=50"
            title="Graphic & UI/UX Designer"
            company="Swivl"
            location="Bengaluru, Karnataka, India"
            type="(On-Site)"
            time="1 month ago"
          />
          
          <JobCard
            logo="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=50"
            title="Freelance UI/UX Designer"
            company="G360 India"
            location="Bengaluru, Karnataka, India"
            type="(Remote)"
            time="11 months ago"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

interface JobCardProps {
  logo: string;
  title: string;
  company: string;
  location: string;
  type: string;
  time: string;
}

const JobCard = ({ logo, title, company, location, type, time }: JobCardProps) => (
  <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4">
    <img src={logo} alt={company} className="w-12 h-12 rounded-lg" />
    <div className="flex-1">
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="text-gray-400 text-sm">{company}</p>
      <p className="text-gray-400 text-sm">{location} {type}</p>
      <p className="text-gray-500 text-xs mt-1">{time}</p>
    </div>
    <button className="text-gray-400">×</button>
  </div>
);