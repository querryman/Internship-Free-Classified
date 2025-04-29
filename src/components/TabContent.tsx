import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

interface TabContentProps {
  items: any[];
  columns: { label: string; key: string; render?: (item: any) => React.ReactNode }[];
  emptyMessage: string;
  createLink: string;
  createButtonLabel: string;
}

export const TabContent: React.FC<TabContentProps> = ({ items, columns, emptyMessage, createLink, createButtonLabel }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">{emptyMessage}</p>
        <Link to={createLink}>
          <Button variant="primary">{createButtonLabel}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((col, index) => (
              <th key={index} className="text-left py-3 px-4 text-navy-600 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-t border-gray-100">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-3 px-4">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};