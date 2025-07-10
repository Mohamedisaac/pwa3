import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dictionary } from '../types';

interface BrowseTabProps {
  dictionaries: Dictionary[];
}

const ENTRIES_PER_PAGE = 50;

const BrowseTab: React.FC<BrowseTabProps> = ({ dictionaries }) => {
  const [selectedDictionary, setSelectedDictionary] = useState<Dictionary | null>(null);
  const [visibleCount, setVisibleCount] = useState(ENTRIES_PER_PAGE);

  const observer = useRef<IntersectionObserver | null>(null);

  const loaderRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    if (node) {
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + ENTRIES_PER_PAGE);
        }
      });
      observer.current.observe(node);
    }
  }, []);

  // When a new dictionary is selected, reset the visible count
  useEffect(() => {
    setVisibleCount(ENTRIES_PER_PAGE);
  }, [selectedDictionary]);

  if (selectedDictionary) {
    const hasMore = visibleCount < selectedDictionary.entries.length;

    return (
      <div className="p-4 md:p-6 animate-fade-in">
        <button 
          onClick={() => setSelectedDictionary(null)}
          className="mb-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Dictionaries
        </button>
        <h2 className="text-3xl font-bold text-white mb-4">{selectedDictionary.name}</h2>
        <div className="space-y-3">
          {selectedDictionary.entries.slice(0, visibleCount).map((entry) => (
            <div key={entry.word} className="bg-slate-800 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-300">{entry.word}</h3>
              <p className="text-slate-300">{entry.definition}</p>
            </div>
          ))}
        </div>

        {hasMore && (
          <div ref={loaderRef} className="flex justify-center items-center p-8">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-4">All Dictionaries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dictionaries.map((dict) => (
          <button 
            key={dict.name}
            onClick={() => setSelectedDictionary(dict)}
            className="bg-slate-800 p-6 rounded-lg text-left hover:bg-slate-700 hover:ring-2 hover:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <h3 className="text-xl font-bold text-blue-300">{dict.name}</h3>
            <p className="text-slate-400 mt-1">{dict.entries.length} entries</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrowseTab;