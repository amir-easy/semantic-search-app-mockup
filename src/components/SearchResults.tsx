import React from 'react';
import { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {results.map((result, index) => (
        <div
          key={result.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <iframe
            src={result.url}
            title={result.title}
            className="w-full h-96 border-0"
            loading={index < 5 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
}

export default SearchResults;