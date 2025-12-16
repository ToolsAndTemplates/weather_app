'use client';

import { WeatherData } from '@/types/weather';
import { getWeatherInfo } from '@/lib/weatherCodes';

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const weatherInfo = getWeatherInfo(data.current_weather.weathercode);

  // Get current hour index for hourly data
  const currentTime = new Date(data.current_weather.time);
  const currentHourIndex = data.hourly.time.findIndex(time =>
    new Date(time).getHours() === currentTime.getHours()
  );

  // Get current hourly data (fallback to first index if not found)
  const hourIndex = currentHourIndex >= 0 ? currentHourIndex : 0;
  const currentHumidity = data.hourly.relativehumidity_2m[hourIndex];
  const currentPressure = data.hourly.surface_pressure[hourIndex];
  const feelsLike = data.hourly.apparent_temperature[hourIndex];

  // Today's min/max from daily data
  const todayMin = data.daily.temperature_2m_min[0];
  const todayMax = data.daily.temperature_2m_max[0];

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-md lg:max-w-lg hover:shadow-3xl transition-shadow duration-300">
      {/* Location */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
          📍 {data.name}, {data.country}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
          {new Date(data.current_weather.time).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="text-7xl sm:text-8xl md:text-9xl animate-bounce">
          {weatherInfo.icon}
        </div>
        <div className="text-center sm:text-left">
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {Math.round(data.current_weather.temperature)}°C
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 capitalize mt-1 sm:mt-2">
            {weatherInfo.description}
          </p>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg sm:text-xl">🌡️</span>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Feels Like</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">
            {Math.round(feelsLike)}°C
          </p>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg sm:text-xl">💧</span>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Humidity</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">
            {Math.round(currentHumidity)}%
          </p>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg sm:text-xl">💨</span>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Wind Speed</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">
            {Math.round(data.current_weather.windspeed)} km/h
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg sm:text-xl">🔽</span>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Pressure</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">
            {Math.round(currentPressure)} hPa
          </p>
        </div>
      </div>

      {/* Min/Max Temp */}
      <div className="flex justify-around bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">❄️</span>
          <div>
            <p className="text-xs text-gray-500">Min</p>
            <p className="text-lg sm:text-xl font-bold text-blue-600">{Math.round(todayMin)}°C</p>
          </div>
        </div>
        <div className="w-px bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🔥</span>
          <div>
            <p className="text-xs text-gray-500">Max</p>
            <p className="text-lg sm:text-xl font-bold text-red-600">{Math.round(todayMax)}°C</p>
          </div>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="flex justify-around bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 rounded-xl p-3 sm:p-4">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl mb-1">🌅</div>
          <p className="text-xs text-gray-500 mb-1">Sunrise</p>
          <p className="text-sm sm:text-base font-semibold text-gray-700">{formatTime(data.daily.sunrise[0])}</p>
        </div>
        <div className="w-px bg-gray-300"></div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl mb-1">🌇</div>
          <p className="text-xs text-gray-500 mb-1">Sunset</p>
          <p className="text-sm sm:text-base font-semibold text-gray-700">{formatTime(data.daily.sunset[0])}</p>
        </div>
      </div>
    </div>
  );
}
