'use client';

import React from 'react';

export interface TabNavigationProps {
  activeTab: 'swap' | 'twap' | 'limit' | 'chart';
  onTabChange: (tab: 'swap' | 'twap' | 'limit' | 'chart') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'swap' as const, label: 'Swap' },
    { id: 'twap' as const, label: 'TWAP' },
    { id: 'limit' as const, label: 'Limit' },
    { id: 'chart' as const, label: '📊', isIcon: true },
  ];

  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 border border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-6 py-2.5 rounded-xl font-medium transition-all duration-200
            min-w-[44px] min-h-[44px]
            ${
              activeTab === tab.id
                ? 'bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-lg scale-105'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }
          `}
          aria-label={tab.isIcon ? 'Chart' : tab.label}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
