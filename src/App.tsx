import React, { useState } from 'react';
import { Search, MapPin, Store, Coffee, Pizza, Car, Cut, Book } from 'lucide-react';
import SearchResults from './components/SearchResults';
import SearchBox from './components/SearchBox';
import ModelInfo from './components/ModelInfo';
import TrendsWidget from './components/TrendsWidget';
import { useGeolocation } from './hooks/useGeolocation';
import { SearchResult } from './types';

function App() {
  const { location, error: locationError } = useGeolocation();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Simulated API call - replace with your actual search API
      const response = await fetch('your-search-api-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          location: location ? {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
            city: location.city
          } : null
        })
      });
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            חיפוש עסקים חכם באיזי
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            מנוע חיפוש סמנטי לעסקים מקומיים
          </p>
          <div className="flex justify-center">
            <ModelInfo />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SearchBox onSearch={handleSearch} location={location} />
            
            {locationError && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg text-red-700">
                <p>שגיאה בקבלת המיקום: {locationError}</p>
              </div>
            )}

            <SearchResults results={searchResults} loading={loading} />
          </div>
          
          <div className="lg:col-span-1">
            <TrendsWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;