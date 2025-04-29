import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';
import { FilterPanel } from '../../components/FilterPanel';
import { ListingGrid } from '../../components/ListingGrid';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  created_at: string;
}

type Category = 'engineering' | 'marketing' | 'sales' | ''; // Example categories

export const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>('');
  const [location_, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory, location_, sortBy, searchKeyword]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('jobs')
        .select('*');

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
      } else if (sortBy === 'salaryLowToHigh') {
        query = query.order('salary', { ascending: true });
      } else if (sortBy === 'salaryHighToLow') {
        query = query.order('salary', { ascending: false });
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setLocation('');
    setSortBy('newest');
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
              {selectedCategory || 'All Jobs'}
            </h1>
            <SearchBar
              placeholder="Search jobs by title..."
              onSearch={(query) => setSearchKeyword(query)}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <FilterPanel
              categories={['engineering', 'marketing', 'sales']}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              location={location_}
              onLocationChange={setLocation}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onReset={resetFilters}
            />

            <div className="flex-1">
              {jobs.length > 0 ? (
                <ListingGrid
                  items={jobs.map((job) => ({
                    id: job.id,
                    title: job.title,
                    price: job.salary,
                    location: job.location,
                    date: job.created_at,
                    link: `/jobs/${job.id}`,
                    tags: [job.company],
                    variant: "job" // Specify the variant
                  }))}
                />
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any jobs matching your search criteria.
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