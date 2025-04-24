import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient'; // Ensure supabase is correctly imported
import {Navbar} from '../../components/Navbar';
import {Footer} from '../../components/Footer';
import {Card} from '../../components/Card';
import {Button} from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  condition: string;
  description: string;
  location: string;
  images: string[]; // Assuming images is an array of strings
  user_id: string;
  created_at: string; // Assuming created_at is a string (e.g., ISO string)
}



export interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


type Category = 'vehicles' | 'properties' | 'other' | ''; // Categories that you might have

export const BuyList: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category>('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [location_, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Use the Product type for listings
  const [listings, setListings] = useState<Product[]>([]);  // Now it's an array of Product

  useEffect(() => {
    // Fetch products from Supabase with filters
    const fetchProducts = async () => {
      let query = supabase
        .from('product')
        .select('*')
        .gte('price', priceRange[0])
        .lte('price', priceRange[1]);

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      if (location_) {
        query = query.ilike('location', `%${location_}%`);
      }
      if (searchKeyword) {
        query = query.ilike('title', `%${searchKeyword}%`);
      }

      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'priceLowToHigh') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'priceHighToLow') {
        query = query.order('price', { ascending: false });
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setListings(data as Product[]);  // Cast the data to Product[]
      }
    };

    fetchProducts();
  }, [selectedCategory, priceRange, location_, sortBy, searchKeyword]);

  const resetFilters = () => {
    setPriceRange([0, 1000000]);
    setLocation('');
    setSortBy('newest');
    setSelectedCategory('');
    setSearchKeyword('');
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
              placeholder="Search listings by title..."
              onSearch={(query) => setSearchKeyword(query)}
              categories={['Electronics', 'Furniture', 'Books']} // optional
            />
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters and Sort */}
            <div className="hidden lg:block w-64 bg-white rounded-xl shadow-sm p-6">
              {/* Categories, Price, Location, Sort */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Categories</h2>
                <ul>
                  <li>
                    <Button variant="outline" onClick={() => setSelectedCategory('vehicles')}>Vehicles</Button>
                  </li>
                  <li>
                    <Button variant="outline" onClick={() => setSelectedCategory('properties')}>Properties</Button>
                  </li>
                  <li>
                    <Button variant="outline" onClick={() => setSelectedCategory('other')}>Other Items</Button>
                  </li>
                  <li>
                    <Button variant="outline" onClick={() => setSelectedCategory('')}>All</Button>
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Price Range</h2>
                <input 
                  type="range" 
                  min={0} 
                  max={1000000} 
                  step={100} 
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                />
                <input 
                  type="range" 
                  min={0} 
                  max={1000000} 
                  step={100} 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
                <p>{`Price: $${priceRange[0]} - $${priceRange[1]}`}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Location</h2>
                <input 
                  type="text" 
                  value={location_} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="Enter location"
                  className="p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Sort By</h2>
                <Button variant="outline" onClick={() => setSortBy('newest')}>Newest</Button>
                <Button variant="outline" onClick={() => setSortBy('priceLowToHigh')}>Price: Low to High</Button>
                <Button variant="outline" onClick={() => setSortBy('priceHighToLow')}>Price: High to Low</Button>
              </div>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </div>
            
            {/* Listings */}
            <div className="flex-1">
              {listings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {listings.map((listing) => (
                    <Card
                      key={listing.id}
                      title={listing.title}
                      price={listing.price}
                      location={listing.location}
                      date={listing.created_at}
                      image={listing.images[0]}
                      link={`/buy/${listing.category}/${listing.id}`}
                      tags={listing.tags || []}
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
