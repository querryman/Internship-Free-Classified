import React from 'react';
import { Card } from './Card';

interface ListingGridProps {
  items: Array<{
    id: number; // Changed to match ListingSection
    title: string;
    price: number | string;
    location: string;
    date: string;
    image: string; // Made mandatory to match ListingSection
    link: string;
    tags: string[]; // Made mandatory to match ListingSection
    category: string; // Made mandatory to match ListingSection
  }>;
}

export const ListingGrid: React.FC<ListingGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item, index) => (
        <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${0.05 * index}s` }}> {/* Added animation to match ListingSection */}
          <Card
            {...item} // Spread props to match ListingSection
            variant="listing" // Specify the variant
          />
        </div>
      ))}
    </div>
  );
};