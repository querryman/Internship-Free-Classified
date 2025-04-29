import React from 'react';
import { Card } from './Card';

interface ListingSectionProps {
  title: string;
  listings: Array<{
    id: number;
    title: string;
    price: number | string;
    location: string;
    date: string;
    category: string;
    image: string;
    link: string;
    tags: string[];
  }>;
  variant?: 'listing' | 'job';
  viewAllLink: string;
}

export const ListingSection: React.FC<ListingSectionProps> = ({ title, listings, variant = 'listing', viewAllLink }) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
            {title}
          </h2>
          <a href={viewAllLink} className="text-accent-500 hover:text-accent-600 font-medium flex items-center">
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
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {listings.map((listing, index) => (
            <div key={listing.id} className="animate-fade-in" style={{ animationDelay: `${0.05 * index}s` }}>
              <Card {...listing} variant={variant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};