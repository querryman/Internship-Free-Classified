import React, { useState } from 'react';
import { Button } from './Button';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  location: string;
  onLocationChange: (location: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange = [0, 1000000],
  onPriceChange,
  location,
  onLocationChange,
  sortBy,
  onSortChange,
  onReset,
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const range = value as [number, number];
      setLocalPriceRange(range);
    }
  };

  const handleSliderAfterChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const range = value as [number, number];
      setLocalPriceRange(range);
      onPriceChange(range);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Button
                variant="outline"
                onClick={() => onCategoryChange(category)}
                className={selectedCategory === category ? 'bg-gray-200' : ''}
              >
                {category}
              </Button>
            </li>
          ))}
          <li>
            <Button
              variant="outline"
              onClick={() => onCategoryChange('')}
              className={selectedCategory === '' ? 'bg-gray-200' : ''}
            >
              All
            </Button>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Price Range</h2>
        <Slider
          range
          min={0}
          max={1000000}
          step={100}
          value={localPriceRange}
          onChange={handleSliderChange}
          onAfterChange={handleSliderAfterChange} // Trigger only after mouse release
        />
        <p>{`Price: $${localPriceRange[0]} - $${localPriceRange[1]}`}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Location</h2>
        <input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Enter location"
          className="p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Sort By</h2>
        <Button
          variant="outline"
          onClick={() => onSortChange('newest')}
          className={sortBy === 'newest' ? 'bg-gray-200' : ''}
        >
          Newest
        </Button>
        <Button
          variant="outline"
          onClick={() => onSortChange('priceLowToHigh')}
          className={sortBy === 'priceLowToHigh' ? 'bg-gray-200' : ''}
        >
          Price: Low to High
        </Button>
        <Button
          variant="outline"
          onClick={() => onSortChange('priceHighToLow')}
          className={sortBy === 'priceHighToLow' ? 'bg-gray-200' : ''}
        >
          Price: High to Low
        </Button>
      </div>

      <Button variant="outline" onClick={onReset}>Reset Filters</Button>
    </div>
  );
};