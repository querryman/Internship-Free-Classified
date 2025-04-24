import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SearchBar } from '../../components/SearchBar';
import { Card } from '../../components/Card';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../components/Button';

type Category = 'vehicles' | 'properties' | 'other' | '';

export const BuyList: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category>('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [location_, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Get category from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') as Category;
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  // Sample listings data
  const allListings = [
    // Vehicles
    {
      id: 1,
      title: '2021 Tesla Model 3',
      price: 42000,
      location: 'San Francisco, CA',
      date: '2 days ago',
      category: 'vehicles',
      image: 'https://images.pexels.com/photos/7813177/pexels-photo-7813177.jpeg',
      link: '/buy/vehicle/1',
      tags: ['Electric', 'Sedan', 'Like New']
    },
    {
      id: 2,
      title: '2019 BMW X5',
      price: 38500,
      location: 'Los Angeles, CA',
      date: '3 days ago',
      category: 'vehicles',
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg',
      link: '/buy/vehicle/2',
      tags: ['SUV', 'Luxury', 'Well Maintained']
    },
    {
      id: 3,
      title: '2022 Honda Civic',
      price: 24000,
      location: 'Seattle, WA',
      date: '1 day ago',
      category: 'vehicles',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      link: '/buy/vehicle/3',
      tags: ['Sedan', 'Economical', 'New']
    },
    
    // Properties
    {
      id: 4,
      title: 'Modern 2 Bedroom Apartment',
      price: 450000,
      location: 'New York, NY',
      date: '3 days ago',
      category: 'properties',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      link: '/buy/property/4',
      tags: ['Apartment', 'City Center', '2 Bedroom']
    },
    {
      id: 5,
      title: 'Spacious Family Home with Garden',
      price: 750000,
      location: 'Denver, CO',
      date: '5 days ago',
      category: 'properties',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      link: '/buy/property/5',
      tags: ['House', 'Suburban', '4 Bedroom']
    },
    {
      id: 6,
      title: 'Downtown Studio Loft',
      price: 320000,
      location: 'Chicago, IL',
      date: '2 days ago',
      category: 'properties',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      link: '/buy/property/6',
      tags: ['Studio', 'Urban', 'Modern']
    },
    
    // Other items
    {
      id: 7,
      title: 'iPhone 14 Pro Max - 256GB',
      price: 899,
      location: 'Chicago, IL',
      date: '1 day ago',
      category: 'other',
      image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
      link: '/buy/other/7',
      tags: ['Electronics', 'Apple', 'Smartphone']
    },
    {
      id: 8,
      title: 'Modern Leather Sofa',
      price: 1200,
      location: 'Los Angeles, CA',
      date: '4 days ago',
      category: 'other',
      image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
      link: '/buy/other/8',
      tags: ['Furniture', 'Living Room', 'Leather']
    },
    {
      id: 9,
      title: 'Canon EOS R5 Camera',
      price: 3500,
      location: 'Austin, TX',
      date: '6 days ago',
      category: 'other',
      image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
      link: '/buy/other/9',
      tags: ['Electronics', 'Camera', 'Professional']
    },
    {
      id: 10,
      title: 'Vintage Turntable',
      price: 450,
      location: 'Portland, OR',
      date: '1 week ago',
      category: 'other',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
      link: '/buy/other/10',
      tags: ['Electronics', 'Audio', 'Vintage']
    }
  ];

  // Filter listings based on selected category and other filters
  const filteredListings = allListings
    .filter(listing => 
      !selectedCategory || listing.category === selectedCategory
    )
    .filter(listing => 
      listing.price >= priceRange[0] && listing.price <= priceRange[1]
    )
    .filter(listing => 
      !location_ || listing.location.toLowerCase().includes(location_.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        // This is just a mock implementation since we don't have actual dates
        return -1;
      } else if (sortBy === 'oldest') {
        return 1;
      } else if (sortBy === 'price_high') {
        return b.price - a.price;
      } else if (sortBy === 'price_low') {
        return a.price - b.price;
      }
      return 0;
    });

  const resetFilters = () => {
    setPriceRange([0, 1000000]);
    setLocation('');
    setSortBy('newest');
  };

  // Get the category title
  const getCategoryTitle = () => {
    switch(selectedCategory) {
      case 'vehicles':
        return 'Vehicles';
      case 'properties':
        return 'Properties';
      case 'other':
        return 'Other Items';
      default:
        return 'All Categories';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {getCategoryTitle()}
            </h1>
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                placeholder="Search listings..."
                categories={['All Categories', 'Vehicles', 'Properties', 'Electronics', 'Furniture']}
              />
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="text-accent-500 focus:ring-accent-500"
                    />
                    <span className="ml-2">All Categories</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === 'vehicles'}
                      onChange={() => setSelectedCategory('vehicles')}
                      className="text-accent-500 focus:ring-accent-500"
                    />
                    <span className="ml-2">Vehicles</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === 'properties'}
                      onChange={() => setSelectedCategory('properties')}
                      className="text-accent-500 focus:ring-accent-500"
                    />
                    <span className="ml-2">Properties</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === 'other'}
                      onChange={() => setSelectedCategory('other')}
                      className="text-accent-500 focus:ring-accent-500"
                    />
                    <span className="ml-2">Other Items</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full">
                    <span className="text-gray-500 mr-1">$</span>
                    <input 
                      type="number"
                      min="0"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="bg-transparent w-full focus:outline-none"
                      placeholder="Min"
                    />
                  </div>
                  <span>-</span>
                  <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full">
                    <span className="text-gray-500 mr-1">$</span>
                    <input 
                      type="number"
                      min="0"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="bg-transparent w-full focus:outline-none"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Location</h3>
                <input 
                  type="text"
                  value={location_}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="City, State"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Sort By</h3>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="price_low">Price: Low to High</option>
                </select>
              </div>
              
              <button 
                onClick={resetFilters}
                className="w-full py-2 text-navy-600 hover:text-navy-900 flex items-center justify-center gap-1"
              >
                <X size={16} />
                Reset Filters
              </button>
            </div>
            
            {/* Filters - Mobile */}
            <div className="lg:hidden mb-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Filter size={20} />
                  <span className="font-medium">Filters & Sort</span>
                </div>
                {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {showFilters && (
                <div className="bg-white rounded-xl shadow-sm p-6 mt-2">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Categories</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="category-mobile"
                          checked={selectedCategory === ''}
                          onChange={() => setSelectedCategory('')}
                          className="text-accent-500 focus:ring-accent-500"
                        />
                        <span className="ml-2">All Categories</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="category-mobile"
                          checked={selectedCategory === 'vehicles'}
                          onChange={() => setSelectedCategory('vehicles')}
                          className="text-accent-500 focus:ring-accent-500"
                        />
                        <span className="ml-2">Vehicles</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="category-mobile"
                          checked={selectedCategory === 'properties'}
                          onChange={() => setSelectedCategory('properties')}
                          className="text-accent-500 focus:ring-accent-500"
                        />
                        <span className="ml-2">Properties</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="category-mobile"
                          checked={selectedCategory === 'other'}
                          onChange={() => setSelectedCategory('other')}
                          className="text-accent-500 focus:ring-accent-500"
                        />
                        <span className="ml-2">Other Items</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full">
                        <span className="text-gray-500 mr-1">$</span>
                        <input 
                          type="number"
                          min="0"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          className="bg-transparent w-full focus:outline-none"
                          placeholder="Min"
                        />
                      </div>
                      <span>-</span>
                      <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full">
                        <span className="text-gray-500 mr-1">$</span>
                        <input 
                          type="number"
                          min="0"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="bg-transparent w-full focus:outline-none"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <input 
                      type="text"
                      value={location_}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Sort By</h3>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="price_low">Price: Low to High</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={resetFilters}
                      className="flex-1 py-2 border border-gray-300 rounded-lg text-navy-600 hover:text-navy-900 flex items-center justify-center gap-1"
                    >
                      <X size={16} />
                      Reset
                    </button>
                    <Button 
                      onClick={() => setShowFilters(false)}
                      variant="primary"
                      className="flex-1"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Listings */}
            <div className="flex-1">
              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredListings.map((listing) => (
                    <Card
                      key={listing.id}
                      title={listing.title}
                      price={listing.price}
                      location={listing.location}
                      date={listing.date}
                      image={listing.image}
                      link={listing.link}
                      tags={listing.tags}
                      category={listing.category}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No listings found</h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any listings matching your search criteria.
                  </p>
                  <Button onClick={resetFilters} variant="outline">
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};