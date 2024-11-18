import React, { useState, useRef } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

const searchExamples = [
  'מסעדות איטלקיות כשרות בסביבה',
  'מספרות פתוחות עכשיו',
  'בתי קפה עם WiFi חינם',
  'חנויות ספרים יד שנייה',
  'מוסכים עם ביקורות טובות'
];

const surpriseQueries = [
  'בית קפה מיוחד עם אווירה ביתית',
  'מסעדה רומנטית עם נוף',
  'חנות וינטג׳ מגניבה',
  'מקום לארוחת בוקר שווה',
  'בר עם אווירה טובה ומוזיקה חיה'
];

interface SearchBoxProps {
  onSearch: (query: string) => void;
  location: { coords: GeolocationCoordinates; city: string; } | null;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, location }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const displayText = useTypewriter(searchExamples);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSurpriseMe = () => {
    const randomQuery = surpriseQueries[Math.floor(Math.random() * surpriseQueries.length)];
    setQuery(randomQuery);
    onSearch(randomQuery);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={displayText}
            className="w-full px-6 py-4 text-lg rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300 pr-12 placeholder-gray-400"
          />
          <button
            type="submit"
            className="absolute left-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <Search className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="absolute left-14 p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
            title="הפתע אותי!"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        </div>
      </form>

      {location && (
        <div className="absolute -bottom-8 right-0 flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>
            מיקום נוכחי: {location.city}
          </span>
        </div>
      )}
    </div>
  );
}

export default SearchBox;