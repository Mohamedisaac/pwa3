
import React, { useState, useEffect } from 'react';
import { Dictionary, Tab } from './types';
import { loadAllDictionaries } from './services/dictionaryService';
import Header from './components/Header';
import Tabs from './components/Tabs';
import SearchTab from './components/SearchTab';
import BrowseTab from './components/BrowseTab';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Search);
  const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDictionaries = async () => {
      try {
        const loadedDictionaries = await loadAllDictionaries();
        setDictionaries(loadedDictionaries);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDictionaries();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <div className="text-center p-8 text-red-400 bg-red-900/20 rounded-lg m-4">{error}</div>;
    }

    switch (activeTab) {
      case Tab.Search:
        return <SearchTab dictionaries={dictionaries} />;
      case Tab.Browse:
        return <BrowseTab dictionaries={dictionaries} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-4xl mx-auto pb-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
