'use client';

import { WeatherData } from '@/types/weather';
import Image from 'next/image';

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      {/* Location */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {data.name}, {data.sys.country}
        </h2>
        <p className="text-gray-500 mt-1">
          {new Date(data.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <Image
            src={iconUrl}
            alt={data.weather[0].description}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <div className="text-6xl font-bold text-gray-800">
            {Math.round(data.main.temp)}°C
          </div>
          <p className="text-xl text-gray-600 capitalize mt-2">
            {data.weather[0].description}
          </p>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm">Feels Like</p>
          <p className="text-2xl font-semibold text-gray-800">
            {Math.round(data.main.feels_like)}°C
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm">Humidity</p>
          <p className="text-2xl font-semibold text-gray-800">
            {data.main.humidity}%
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm">Wind Speed</p>
          <p className="text-2xl font-semibold text-gray-800">
            {Math.round(data.wind.speed)} m/s
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm">Pressure</p>
          <p className="text-2xl font-semibold text-gray-800">
            {data.main.pressure} hPa
          </p>
        </div>
      </div>

      {/* Min/Max Temp */}
      <div className="flex justify-between text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">↓ Min:</span>
          <span className="font-semibold">{Math.round(data.main.temp_min)}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">↑ Max:</span>
          <span className="font-semibold">{Math.round(data.main.temp_max)}°C</span>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="flex justify-between text-gray-600 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm">🌅 Sunrise:</span>
          <span className="font-semibold">{formatTime(data.sys.sunrise)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">🌇 Sunset:</span>
          <span className="font-semibold">{formatTime(data.sys.sunset)}</span>
        </div>
      </div>
    </div>
  );
}
