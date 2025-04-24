import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar';
import { CategoryCard } from '../../components/CategoryCard';
import { Car, Home, Package, Briefcase, Wrench, ShoppingBag } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';

export const Welcome: React.FC = () => {
  const categories = [
    { 
      title: 'Vehicles', 
      icon: <Car size={24} />, 
      description: 'Cars, motorcycles, boats and more', 
      link: '/buy?category=vehicles',
      color: 'bg-blue-500'
    },
    { 
      title: 'Properties', 
      icon: <Home size={24} />, 
      description: 'Houses, apartments, land and more', 
      link: '/buy?category=properties',
      color: 'bg-green-500'
    },
    { 
      title: 'Other Items', 
      icon: <Package size={24} />, 
      description: 'Electronics, furniture, clothing and more', 
      link: '/buy?category=other',
      color: 'bg-purple-500'
    },
    { 
      title: 'Jobs', 
      icon: <Briefcase size={24} />, 
      description: 'Find your next career opportunity', 
      link: '/jobs',
      color: 'bg-orange-500'
    },
    { 
      title: 'Services', 
      icon: <Wrench size={24} />, 
      description: 'Professional services for your needs', 
      link: '/services',
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

  const featuredListings = [
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
      title: 'Marketing Manager',
      price: '$70-90K',
      location: 'Remote',
      date: '1 day ago',
      category: 'Jobs',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
      link: '/jobs/3',
      tags: ['Full-time', 'Marketing', 'Remote']
    },
    {
      id: 4,
      title: 'Professional Cleaning Service',
      price: 'From $99',
      location: 'Austin, TX',
      date: '5 days ago',
      category: 'Services',
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
      link: '/services/4',
      tags: ['Cleaning', 'Residential', 'Highly Rated']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              Your Marketplace for Everything
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Buy and sell items, find jobs, or hire services - all in one place
            </p>
            <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
              <SearchBar 
                placeholder="What are you looking for?"
                categories={['Vehicles', 'Properties', 'Jobs', 'Services', 'Other']}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Link to="/buy">
                <Button size="lg" variant="primary" icon={<ShoppingBag size={18} />}>
                  Start Browsing
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Sell Something
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
              Browse Categories
            </h2>
            <p className="text-navy-600 max-w-2xl mx-auto">
              Find exactly what you're looking for from our wide range of categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="animate-slide-up" style={{animationDelay: `${0.1 * index}s`}}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Listings Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
                Featured Listings
              </h2>
              <p className="text-navy-600">
                Discover our top picks selected just for you
              </p>
            </div>
            <Link to="/buy" className="hidden md:flex items-center text-accent-500 hover:text-accent-600 font-medium">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing, index) => (
              <div key={listing.id} className="animate-slide-up" style={{animationDelay: `${0.1 * index}s`}}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <Link to={listing.link} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={listing.image} 
                        alt={listing.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-navy-900/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {listing.category}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-accent-400 text-navy-900 font-bold px-3 py-1 rounded-full">
                        {typeof listing.price === 'number' ? `$${listing.price.toLocaleString()}` : listing.price}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-navy-900 group-hover:text-navy-700 transition-colors mb-1">
                        {listing.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {listing.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="bg-navy-100 text-navy-800 text-xs px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 text-xs text-navy-500">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {listing.location}
                        </span>
                        <span>{listing.date}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/buy">
              <Button variant="outline" size="lg">
                View All Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              How TradeX Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Three simple steps to get started on TradeX
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-navy-800 animate-slide-up">
              <div className="w-16 h-16 bg-accent-400 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-gray-300">
                Sign up for free and set up your profile to start using TradeX
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-navy-800 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-accent-400 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse or Post</h3>
              <p className="text-gray-300">
                Browse listings or post your own items, jobs, or services
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-navy-800 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-accent-400 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Trade</h3>
              <p className="text-gray-300">
                Contact sellers, apply for jobs, or hire service providers
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
              What Our Users Say
            </h2>
            <p className="text-navy-600 max-w-2xl mx-auto">
              Join thousands of satisfied users on TradeX
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900">Michael Johnson</h4>
                  <p className="text-sm text-navy-600">Car Seller</p>
                </div>
              </div>
              <p className="text-navy-700 mb-3">
                "I sold my car within 48 hours of listing it on TradeX. The process was incredibly simple and the buyer was serious. Highly recommend!"
              </p>
              <div className="flex text-accent-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900">Sarah Williams</h4>
                  <p className="text-sm text-navy-600">Job Seeker</p>
                </div>
              </div>
              <p className="text-navy-700 mb-3">
                "I found my dream job through TradeX! The job listings were relevant to my skills, and the application process was straightforward. Now I'm working at an amazing company."
              </p>
              <div className="flex text-accent-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900">David Chen</h4>
                  <p className="text-sm text-navy-600">Service Provider</p>
                </div>
              </div>
              <p className="text-navy-700 mb-3">
                "As a cleaning service provider, TradeX has been incredible for my business. I've gained many new clients and the platform makes scheduling and communication easy."
              </p>
              <div className="flex text-accent-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent-500 to-accent-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-navy-800 text-lg max-w-2xl mx-auto mb-8">
            Start buying, selling, finding jobs, and accessing services today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button 
                variant="secondary" 
                size="lg"
              >
                Sign Up Now
              </Button>
            </Link>
            <Link to="/buy">
              <Button 
                variant="outline" 
                size="lg"
                className="border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white"
              >
                Browse Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};