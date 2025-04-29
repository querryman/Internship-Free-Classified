import React from 'react';
import { Button } from './Button';
import { Edit, Settings } from 'lucide-react';

interface ProfileHeaderProps {
  user: { email: string | null };
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-navy-900 to-navy-800 p-8 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center gap-5 mb-4 md:mb-0">
          <div className="bg-accent-400 h-16 w-16 rounded-full flex items-center justify-center text-navy-900 text-2xl font-bold">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.email?.split('@')[0] || 'User'}</h1>
            <p className="text-gray-300">{user?.email}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={<Edit size={16} />} className="border-white/20 text-white hover:bg-white/10">
            Edit Profile
          </Button>
          <Button variant="outline" icon={<Settings size={16} />} className="border-white/20 text-white hover:bg-white/10">
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};