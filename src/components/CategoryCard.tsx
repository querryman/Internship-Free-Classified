import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  count?: number;
  color?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  icon,
  description,
  link,
  count,
  color = 'bg-accent-400'
}) => {
  return (
    <Link
      to={link}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-6"
    >
      <div className="flex items-start space-x-4">
        <div className={`${color} p-3 rounded-lg text-white`}>
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-navy-900 group-hover:text-accent-500 transition-colors">
              {title}
            </h3>
            {count !== undefined && (
              <span className="bg-navy-100 text-navy-800 text-xs px-2 py-1 rounded-full">
                {count} listings
              </span>
            )}
          </div>
          
          <p className="text-navy-600 text-sm mt-1">
            {description}
          </p>
          
          <span className="inline-flex items-center mt-3 text-accent-500 text-sm font-medium group-hover:underline">
            Browse {title}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};