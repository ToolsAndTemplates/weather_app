'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import { WeatherData, ForecastData } from '@/types/weather';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const currentResponse = await fetch(`/api/weather?city=${encodeURIComponent(city)}&type=current`);

      if (!currentResponse.ok) {
        const errorData = await currentResponse.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }

      const currentData = await currentResponse.json();
      setWeatherData(currentData);

      // Fetch forecast
      const forecastResponse = await fetch(`/api/weather?city=${encodeURIComponent(city)}&type=forecast`);

      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-12 px-4">
      <div className="container mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Weather App
          </h1>
          <p className="text-xl text-blue-100">
            Get real-time weather information for any city
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={fetchWeather} isLoading={isLoading} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 max-w-md w-full">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 w-full max-w-md">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading weather data...</p>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {!isLoading && weatherData && (
          <>
            <WeatherCard data={weatherData} />
            {forecastData && <ForecastCard data={forecastData} />}
          </>
        )}

        {/* Initial State */}
        {!isLoading && !weatherData && !error && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🌤️</div>
            <p className="text-white text-lg">
              Enter a city name to get started
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-blue-100">
          <p className="text-sm">
            Powered by OpenWeatherMap API
          </p>
        </div>
      </div>
    </main>
  );
}
