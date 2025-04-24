import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { Settings, LogOut, Edit, Plus, ShoppingBag, BriefcaseIcon, Wrench } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import { Link } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
  views: number;
  price: string;
}

interface Job {
  id: string;
  title: string;
  status: string;
  created_at: string;
  requirements: string[]; // Replacing applicants_count with requirements
}

interface Service {
  id: string;
  title: string;
  status: string;
  created_at: string;
  availability: string[];
}


export const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [userServices, setUserServices] = useState<Service[]>([]);
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
      
      // Fetch user's listings
      const { data: listings, error: listingsError } = await supabase
        .from('product')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (listingsError) throw listingsError;
      setUserListings(listings || []);

      // Fetch user's jobs with applicants count
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select(`
          *,
          applicants_count: job_applications(count)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (jobsError) throw jobsError;
      setUserJobs(jobs || []);

      // Fetch user's services with requests count
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select(`
          *,
          requests_count: service_requests(count)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (servicesError) throw servicesError;
      setUserServices(services || []);

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const tabItems = [
    { name: "Listings", icon: <ShoppingBag size={18} />, count: userListings.length },
    { name: "Jobs", icon: <BriefcaseIcon size={18} />, count: userJobs.length },
    { name: "Services", icon: <Wrench size={18} />, count: userServices.length }
  ];

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
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 p-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center gap-5 mb-4 md:mb-0">
                  <div className="bg-accent-400 h-16 w-16 rounded-full flex items-center justify-center text-navy-900 text-2xl font-bold">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{user?.email?.split('@')[0] || "User"}</h1>
                    <p className="text-gray-300">{user?.email}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    icon={<Edit size={16} />}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline"
                    icon={<Settings size={16} />}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Settings
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-navy-50 rounded-xl p-4 text-center">
                  <h3 className="text-lg font-semibold mb-1">Listings</h3>
                  <p className="text-3xl font-bold text-navy-900">{userListings.length}</p>
                </div>
                <div className="bg-navy-50 rounded-xl p-4 text-center">
                  <h3 className="text-lg font-semibold mb-1">Jobs Posted</h3>
                  <p className="text-3xl font-bold text-navy-900">{userJobs.length}</p>
                </div>
                <div className="bg-navy-50 rounded-xl p-4 text-center">
                  <h3 className="text-lg font-semibold mb-1">Services Offered</h3>
                  <p className="text-3xl font-bold text-navy-900">{userServices.length}</p>
                </div>
              </div>
              
              <div className="flex border-b">
                {tabItems.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name.toLowerCase())}
                    className={`flex items-center gap-1.5 px-4 py-2 font-medium ${
                      activeTab === tab.name.toLowerCase()
                        ? 'text-accent-500 border-b-2 border-accent-500' 
                        : 'text-navy-600 hover:text-navy-900'
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                    <span className="bg-navy-100 text-navy-700 text-xs px-1.5 py-0.5 rounded-full ml-1">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="mt-6">
                {activeTab === 'listings' && (
                  <>
                    {userListings.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Title</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Category</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Status</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Date</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Views</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Price</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userListings.map((listing) => (
                              <tr key={listing.id} className="border-t border-gray-100">
                                <td className="py-3 px-4">{listing.title}</td>
                                <td className="py-3 px-4">{listing.category}</td>
                                <td className="py-3 px-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    listing.status === 'active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {listing.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-gray-500">{formatDate(listing.created_at)}</td>
                                <td className="py-3 px-4">{listing.views}</td>
                                <td className="py-3 px-4 font-medium">{listing.price}</td>
                                <td className="py-3 px-4">
                                  <div className="flex space-x-2">
                                    <button className="text-navy-600 hover:text-navy-900">
                                      <Edit size={16} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">You have no listings yet</p>
                        <Link to="/sell">
                          <Button 
                            variant="primary"
                            icon={<Plus size={16} />}
                          >
                            Create a Listing
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'jobs' && (
                  <>
                    {userJobs.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Title</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Status</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Date</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Applicants</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                          {userJobs.map((job) => (
                          <tr key={job.id} className="border-t border-gray-100">
                            <td className="py-3 px-4">{job.title}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                job.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {job.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-500">{formatDate(job.created_at)}</td>
                            <td className="py-3 px-4">
                              {job.requirements.length > 0 ? job.requirements.join(', ') : 'No requirements'}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button className="text-navy-600 hover:text-navy-900">
                                  <Edit size={16} />
                                </button>
                                <button className="text-red-600 hover:text-red-800">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">You haven't posted any jobs yet</p>
                        <Link to="/jobs/create">
                          <Button 
                            variant="primary"
                            icon={<Plus size={16} />}
                          >
                            Post a Job
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'services' && (
                  <>
                    {userServices.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Title</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Status</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Date</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Requests</th>
                              <th className="text-left py-3 px-4 text-navy-600 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                          {userServices.map((service) => (
                          <tr key={service.id} className="border-t border-gray-100">
                            <td className="py-3 px-4">{service.title}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                service.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {service.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-500">{formatDate(service.created_at)}</td>
                            <td className="py-3 px-4">
                              {service.availability.length > 0 ? service.availability.join(', ') : 'No availability'}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button className="text-navy-600 hover:text-navy-900">
                                  <Edit size={16} />
                                </button>
                                <button className="text-red-600 hover:text-red-800">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">You haven't offered any services yet</p>
                        <Link to="/services/create">
                          <Button 
                            variant="primary"
                            icon={<Plus size={16} />}
                          >
                            Offer a Service
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              icon={<LogOut size={16} />}
              onClick={signOut}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};