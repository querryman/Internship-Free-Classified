import React from 'react';
import { CategoryCard } from './CategoryCard';

interface CategorySectionProps {
  categories: Array<{
    title: string;
    icon: React.ReactNode;
    description: string;
    link: string;
    color: string;
  }>;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
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
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${0.1 * index}s` }}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};