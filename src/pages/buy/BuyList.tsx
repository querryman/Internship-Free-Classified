import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient'; // Ensure supabase is correctly imported
import {Navbar} from '../../components/Navbar';
import {Footer} from '../../components/Footer';
import {Button} from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';
import { FilterPanel } from '../../components/FilterPanel';
import { ListingGrid } from '../../components/ListingGrid';

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [location_, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, priceRange, location_, sortBy, searchKeyword]);

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
      setListings(data as Product[] || []);
    }
    setLoading(false);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000000]);
    setLocation('');
    setSortBy('newest');
    setSelectedCategory('');
    setSearchKeyword('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {selectedCategory || 'All Categories'}
            </h1>
            <SearchBar
              placeholder="Search listings by title..."
              onSearch={(query) => setSearchKeyword(query)}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <FilterPanel
              categories={['vehicles', 'properties', 'other']}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              location={location_}
              onLocationChange={setLocation}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onReset={resetFilters}
              onPriceChange={setPriceRange}
            />

            <div className="flex-1">
              {listings.length > 0 ? (
                <ListingGrid
                  items={listings.map((listing) => ({
                    id: parseInt(listing.id, 10), // Ensure id is a number
                    title: listing.title,
                    price: listing.price,
                    location: listing.location,
                    date: listing.created_at,
                    image: listing.images[0],
                    link: `/buy/${listing.category}/${listing.id}`,
                    tags: Array.isArray(listing.tags) ? listing.tags : [], // Ensure tags is a string array
                    category: listing.category,
                  }))}
                />
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
