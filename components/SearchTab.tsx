
import React, { useState, useMemo } from 'react';
import { Dictionary, SearchResult } from '../types';
import SearchIcon from './icons/SearchIcon';

interface SearchTabProps {
  dictionaries: Dictionary[];
}

const MAX_RESULTS = 50;

const SearchTab: React.FC<SearchTabProps> = ({ dictionaries }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults: SearchResult[] = useMemo(() => {
    const trimmedSearch = searchTerm.trim().toLowerCase();
    if (!trimmedSearch) return [];

    const results: SearchResult[] = [];
    for (const dict of dictionaries) {
      for (const entry of dict.entries) {
        if (entry.word.trim().toLowerCase().startsWith(trimmedSearch)) {
          results.push({
            ...entry,
            dictionaryName: dict.name,
          });
          if (results.length >= MAX_RESULTS) {
            return results;
          }
        }
      }
    }
    return results;
  }, [searchTerm, dictionaries]);

  const hasMoreResults = searchResults.length >= MAX_RESULTS;

  return (
    <div className="p-4 md:p-6 animate-fade-in">
      <div className="relative mb-6">
        <input
          type="search"
          placeholder="Type a word to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 bg-slate-800 border-2 border-slate-700 rounded-lg text-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          autoCapitalize="none"
          autoCorrect="off"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
      </div>

      <div>
        {searchTerm.trim() && searchResults.length > 0 && (
          <div className="space-y-4">
            {hasMoreResults && (
              <div className="bg-blue-900/70 text-blue-200 p-3 rounded-lg text-center text-sm">
                <p>Showing the first {MAX_RESULTS} results. Please be more specific for a refined search.</p>
              </div>
            )}
            {searchResults.map((result) => (
              <div key={`${result.dictionaryName}-${result.word}`} className="bg-slate-800 p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-300">{result.word}</h3>
                <p className="text-slate-300 mt-1">{result.definition}</p>
                <span className="inline-block bg-slate-700 text-blue-300 text-xs font-semibold mt-3 px-2 py-1 rounded-full">{result.dictionaryName}</span>
              </div>
            ))}
          </div>
        )}
        {searchTerm.trim() && searchResults.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <p>No results found for "{searchTerm}".</p>
          </div>
        )}
        {!searchTerm.trim() && (
          <div className="text-center py-10 text-slate-400">
            <p>Start typing to search across all dictionaries.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTab;
