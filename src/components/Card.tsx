import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  price?: number | string;
  location?: string;
  date?: string;
  link: string;
  tags?: string[];
  category?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  price,
  location,
  date,
  link,
  tags,
  category
}) => {
  return (
    <Link 
      to={link}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {category && (
            <span className="absolute top-3 left-3 bg-navy-900/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {category}
            </span>
          )}
          {price && (
            <span className="absolute bottom-3 right-3 bg-accent-400 text-navy-900 font-bold px-3 py-1 rounded-full">
              {typeof price === 'number' ? `$${price.toLocaleString()}` : price}
            </span>
          )}
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-navy-900 group-hover:text-navy-700 transition-colors mb-1 line-clamp-1">
          {title}
        </h3>
        
        {description && (
          <p className="text-navy-600 text-sm line-clamp-2 mb-3">
            {description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-1 mt-2">
          {tags && tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-navy-100 text-navy-800 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-navy-500">
          {location && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {location}
            </span>
          )}
          
          {date && (
            <span>{date}</span>
          )}
        </div>
      </div>
    </Link>
  );
};