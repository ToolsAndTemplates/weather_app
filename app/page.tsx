'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import { WeatherData, ForecastData } from '@/types/weather';
import { getWeatherTheme } from '@/lib/weatherThemes';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bgGradient, setBgGradient] = useState('from-blue-400 via-blue-500 to-blue-600');

  useEffect(() => {
    if (weatherData) {
      const theme = getWeatherTheme(weatherData.current_weather.weathercode);
      setBgGradient(theme.gradient);
    }
  }, [weatherData]);

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
    <main className={`min-h-screen bg-gradient-to-br ${bgGradient} py-6 sm:py-12 px-4 sm:px-6 lg:px-8 theme-transition overflow-x-hidden`}>
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 drop-shadow-2xl">
            ⛅ Weather App
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-white/90 drop-shadow-lg px-4">
            Real-time weather information worldwide
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full animate-slide-up">
          <SearchBar onSearch={fetchWeather} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/90 backdrop-blur-sm border border-red-300 text-white px-4 sm:px-6 py-4 rounded-xl mb-6 max-w-md w-full animate-fade-in shadow-lg">
            <p className="font-bold text-lg mb-1">⚠️ Error</p>
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="glass rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-md animate-fade-in">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mb-4"></div>
                <div className="absolute top-0 left-0 animate-ping rounded-full h-16 w-16 border-4 border-white/30"></div>
              </div>
              <p className="text-white text-base sm:text-lg font-semibold">Loading weather data...</p>
              <p className="text-white/70 text-sm mt-2">Please wait</p>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {!isLoading && weatherData && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <WeatherCard data={weatherData} />
            {forecastData && <ForecastCard data={forecastData} />}
          </div>
        )}

        {/* Initial State */}
        {!isLoading && !weatherData && !error && (
          <div className="glass rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 max-w-md w-full text-center animate-pulse-slow">
            <div className="text-7xl sm:text-8xl mb-4 sm:mb-6 animate-bounce">🌤️</div>
            <p className="text-white text-lg sm:text-xl font-semibold mb-2">
              Welcome to Weather App
            </p>
            <p className="text-white/80 text-sm sm:text-base">
              Enter a city name above to get started
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => fetchWeather('London')}
                className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs sm:text-sm transition-all hover:scale-105"
              >
                London
              </button>
              <button
                onClick={() => fetchWeather('New York')}
                className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs sm:text-sm transition-all hover:scale-105"
              >
                New York
              </button>
              <button
                onClick={() => fetchWeather('Tokyo')}
                className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs sm:text-sm transition-all hover:scale-105"
              >
                Tokyo
              </button>
              <button
                onClick={() => fetchWeather('Paris')}
                className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs sm:text-sm transition-all hover:scale-105"
              >
                Paris
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center text-white/80">
          <p className="text-xs sm:text-sm drop-shadow-lg">
            Powered by Open-Meteo API • No API key required
          </p>
          <p className="text-xs mt-1 sm:mt-2 text-white/60">
            Free & unlimited weather data
          </p>
        </div>
      </div>
    </main>
  );
}
