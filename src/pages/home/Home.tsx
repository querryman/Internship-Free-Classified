import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SearchBar } from '../../components/SearchBar';
import { CategoryCard } from '../../components/CategoryCard';
import { Card } from '../../components/Card';
import { Car, Home as HomeIcon, Package, Briefcase, Wrench, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    // Check if user just registered
    if (location.state && (location.state as any).registered) {
      setShowWelcome(true);
      
      // Clear the state after showing the welcome message
      window.history.replaceState({}, document.title);
      
      // Hide the welcome message after 5 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  const categories = [
    { 
      title: 'Vehicles', 
      icon: <Car size={24} />, 
      description: 'Cars, motorcycles, boats and more', 
      link: '/buy?category=vehicles',
      count: 124,
      color: 'bg-blue-500'
    },
    { 
      title: 'Properties', 
      icon: <HomeIcon size={24} />, 
      description: 'Houses, apartments, land and more', 
      link: '/buy?category=properties',
      count: 89,
      color: 'bg-green-500'
    },
    { 
      title: 'Other Items', 
      icon: <Package size={24} />, 
      description: 'Electronics, furniture, clothing and more', 
      link: '/buy?category=other',
      count: 213,
      color: 'bg-purple-500'
    },
    { 
      title: 'Jobs', 
      icon: <Briefcase size={24} />, 
      description: 'Find your next career opportunity', 
      link: '/jobs',
      count: 67,
      color: 'bg-orange-500'
    },
    { 
      title: 'Services', 
      icon: <Wrench size={24} />, 
      description: 'Professional services for your needs', 
      link: '/services',
      count: 98,
      color: 'bg-red-500'
    },
    { 
      title: 'Sell', 
      icon: <ShoppingBag size={24} />, 
      description: 'List your items or services for sale', 
      link: '/sell',
      color: 'bg-accent-500'
    }
  ];

  const recentListings = [
    {
      id: 1,
      title: '2021 Tesla Model 3',
      price: 42000,
      location: 'San Francisco, CA',
      date: '2 days ago',
      category: 'Vehicles',
      image: 'https://images.pexels.com/photos/7813177/pexels-photo-7813177.jpeg',
      link: '/buy/vehicle/1',
      tags: ['Electric', 'Sedan', 'Like New']
    },
    {
      id: 2,
      title: 'Modern 2 Bedroom Apartment',
      price: 450000,
      location: 'New York, NY',
      date: '3 days ago',
      category: 'Properties',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      link: '/buy/property/2',
      tags: ['Apartment', 'City Center', '2 Bedroom']
    },
    {
      id: 3,
      title: 'iPhone 14 Pro Max - 256GB',
      price: 899,
      location: 'Chicago, IL',
      date: '1 day ago',
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
      link: '/buy/electronics/3',
      tags: ['Apple', 'Smartphone', 'Excellent Condition']
    },
    {
      id: 4,
      title: 'Modern Leather Sofa',
      price: 1200,
      location: 'Los Angeles, CA',
      date: '4 days ago',
      category: 'Furniture',
      image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
      link: '/buy/furniture/4',
      tags: ['Living Room', 'Leather', 'Like New']
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      price: '$120-150K',
      location: 'Remote',
      date: '1 day ago',
      category: 'Jobs',
      image: 'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg',
      link: '/jobs/1',
      tags: ['Full-time', 'Tech', 'Remote']
    },
    {
      id: 2,
      title: 'Marketing Manager',
      price: '$70-90K',
      location: 'New York, NY',
      date: '2 days ago',
      category: 'Jobs',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
      link: '/jobs/2',
      tags: ['Full-time', 'Marketing', 'Office']
    }
  ];

  const recentServices = [
    {
      id: 1,
      title: 'Professional Cleaning Service',
      price: 'From $99',
      location: 'Austin, TX',
      date: '5 days ago',
      category: 'Cleaning',
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
      link: '/services/1',
      tags: ['Residential', 'Commercial', 'Highly Rated']
    },
    {
      id: 2,
      title: 'Expert Pest Control',
      price: 'From $75',
      location: 'Denver, CO',
      date: '1 day ago',
      category: 'Pest Control',
      image: 'https://images.pexels.com/photos/8539722/pexels-photo-8539722.jpeg',
      link: '/services/2',
      tags: ['Residential', 'Commercial', 'Same-Day']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {showWelcome && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-accent-400 text-navy-900 px-6 py-3 rounded-lg shadow-lg animate-slide-down">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">Welcome to TradeX! Your account has been created successfully.</p>
          </div>
        </div>
      )}
      
      {/* Hero Section with Search */}
      <section className="pt-24 pb-10 md:pt-32 md:pb-12 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find What You're Looking For
            </h1>
            <SearchBar 
              placeholder="Search for anything..."
              categories={['Vehicles', 'Properties', 'Jobs', 'Services', 'Other']}
            />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Browse Categories
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category, index) => (
              <div key={index} className="animate-fade-in" style={{animationDelay: `${0.05 * index}s`}}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Listings Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Recent Listings
            </h2>
            <Link to="/buy" className="text-accent-500 hover:text-accent-600 font-medium flex items-center">
              View All
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentListings.map((listing, index) => (
              <div key={listing.id} className="animate-fade-in" style={{animationDelay: `${0.05 * index}s`}}>
                <Card {...listing} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Jobs Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Recent Jobs
            </h2>
            <Link to="/jobs" className="text-accent-500 hover:text-accent-600 font-medium flex items-center">
              View All
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentJobs.map((job, index) => (
              <div key={job.id} className="animate-fade-in" style={{animationDelay: `${0.05 * index}s`}}>
                <Card {...job} />
              </div>
            ))}
          </div>
          
          {user ? (
            <div className="text-center mt-8">
              <Link to="/jobs/create">
                <Button variant="primary" icon={<Briefcase size={18} />}>
                  Post a Job
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center mt-8">
              <Link to="/login">
                <Button variant="outline">
                  Sign in to Post a Job
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Recent Services Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Popular Services
            </h2>
            <Link to="/services" className="text-accent-500 hover:text-accent-600 font-medium flex items-center">
              View All
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentServices.map((service, index) => (
              <div key={service.id} className="animate-fade-in" style={{animationDelay: `${0.05 * index}s`}}>
                <Card {...service} />
              </div>
            ))}
          </div>
          
          {user ? (
            <div className="text-center mt-8">
              <Link to="/services/create">
                <Button variant="primary" icon={<Wrench size={18} />}>
                  Offer a Service
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center mt-8">
              <Link to="/login">
                <Button variant="outline">
                  Sign in to Offer a Service
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-navy-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Have Something to Sell?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            List your items, create job postings, or offer your services to thousands of potential customers
          </p>
          {user ? (
            <Link to="/sell">
              <Button variant="primary" size="lg">
                Post Your Listing
              </Button>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link to="/signup">
                <Button variant="primary">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};