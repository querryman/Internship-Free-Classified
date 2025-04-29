import React from 'react';

interface TabNavigationProps {
  tabs: { name: string; icon: React.ReactNode; count: number }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(tab.name.toLowerCase())}
          className={`flex items-center gap-1.5 px-4 py-2 font-medium ${
            activeTab === tab.name.toLowerCase()
              ? 'text-accent-500 border-b-2 border-accent-500'
              : 'text-navy-600 hover:text-navy-900'
          }`}
        >
          {tab.icon}
          {tab.name}
          <span className="bg-navy-100 text-navy-700 text-xs px-1.5 py-0.5 rounded-full ml-1">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};