import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { LogOut, Plus, ShoppingBag, BriefcaseIcon, Wrench } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import { Link } from 'react-router-dom';
import { TabContent } from '../../components/TabContent';
import { TabNavigation } from '../../components/TabNavigation';
import { ProfileHeader } from '../../components/ProfileHeader';

export const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [userListings, setUserListings] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('listings');

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const { data: listings } = await supabase
        .from('product')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      setUserListings(listings || []);

      const { data: jobs } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      setUserJobs(jobs || []);

      const { data: services } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      setUserServices(services || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabItems = [
    { name: 'Listings', icon: <ShoppingBag size={18} />, count: userListings.length },
    { name: 'Jobs', icon: <BriefcaseIcon size={18} />, count: userJobs.length },
    { name: 'Services', icon: <Wrench size={18} />, count: userServices.length },
  ];

  const columns = {
    listings: [
      { label: 'Title', key: 'title' },
      { label: 'Category', key: 'category' },
      { label: 'Status', key: 'status' },
      { label: 'Date', key: 'created_at' },
      { label: 'Views', key: 'views' },
      { label: 'Price', key: 'price' },
    ],
    jobs: [
      { label: 'Title', key: 'title' },
      { label: 'Status', key: 'status' },
      { label: 'Date', key: 'created_at' },
      { label: 'Applicants', key: 'requirements', render: (item) => item.requirements.join(', ') },
    ],
    services: [
      { label: 'Title', key: 'title' },
      { label: 'Status', key: 'status' },
      { label: 'Date', key: 'created_at' },
      { label: 'Requests', key: 'availability', render: (item) => item.availability.join(', ') },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <ProfileHeader user={user} />
          <TabNavigation tabs={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="mt-6">
            <TabContent
              items={
                activeTab === 'listings'
                  ? userListings
                  : activeTab === 'jobs'
                  ? userJobs
                  : userServices
              }
              columns={columns[activeTab]}
              emptyMessage={`You have no ${activeTab} yet`}
              createLink={`/${activeTab}/create`}
              createButtonLabel={`Create a ${activeTab.slice(0, -1)}`}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};