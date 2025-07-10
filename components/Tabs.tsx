
import React from 'react';
import { Tab } from '../types';
import SearchIcon from './icons/SearchIcon';
import BookOpenIcon from './icons/BookOpenIcon';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabStyles = 'flex-1 py-3 px-2 text-center font-semibold transition-colors duration-300 ease-in-out flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-400';
  const activeTabStyles = 'bg-blue-600 text-white';
  const inactiveTabStyles = 'bg-slate-800 text-slate-300 hover:bg-slate-700';

  return (
    <div className="flex sticky top-[76px] z-10 bg-slate-800 shadow-lg">
      <button
        onClick={() => setActiveTab(Tab.Search)}
        className={`${tabStyles} ${activeTab === Tab.Search ? activeTabStyles : inactiveTabStyles}`}
      >
        <SearchIcon />
        Search
      </button>
      <button
        onClick={() => setActiveTab(Tab.Browse)}
        className={`${tabStyles} ${activeTab === Tab.Browse ? activeTabStyles : inactiveTabStyles}`}
      >
        <BookOpenIcon />
        Show All
      </button>
    </div>
  );
};

export default Tabs;
