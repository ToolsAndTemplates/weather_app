'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  textColor?: string;
}

export default function SearchBar({ onSearch, isLoading, textColor = 'text-white' }: SearchBarProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const isDark = textColor === 'text-white';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md lg:max-w-2xl mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/70' : 'text-gray-700'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 ${
              isDark
                ? 'border-white/30 bg-white/20 text-white placeholder-white/60'
                : 'border-gray-700/30 bg-gray-700/20 text-gray-900 placeholder-gray-700/60'
            } backdrop-blur-md focus:outline-none focus:ring-2 ${
              isDark ? 'focus:ring-white/50 focus:border-white/50' : 'focus:ring-gray-700/50 focus:border-gray-700/50'
            } disabled:opacity-50 text-base sm:text-lg font-medium transition-all`}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className={`px-6 sm:px-8 py-3 sm:py-4 ${
            isDark
              ? 'bg-white/20 hover:bg-white/30 text-white border-2 border-white/40'
              : 'bg-gray-700/20 hover:bg-gray-700/30 text-gray-900 border-2 border-gray-700/40'
          } backdrop-blur-md rounded-xl focus:outline-none focus:ring-2 ${
            isDark ? 'focus:ring-white/50' : 'focus:ring-gray-700/50'
          } disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm sm:text-base hover:scale-105 active:scale-95`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2 justify-center">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="hidden sm:inline">Searching...</span>
            </span>
          ) : (
            '🔍 Search'
          )}
        </button>
      </div>
    </form>
  );
}
