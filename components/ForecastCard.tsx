'use client';

import { ForecastData } from '@/types/weather';
import { getWeatherInfo } from '@/lib/weatherCodes';

interface ForecastCardProps {
  data: ForecastData;
}

export default function ForecastCard({ data }: ForecastCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-6xl mt-6 animate-fade-in">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">7-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {data.daily.time.map((date, index) => {
          const weatherInfo = getWeatherInfo(data.daily.weathercode[index]);
          const dateObj = new Date(date);

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-3 sm:p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                {index === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">
                {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">
                {weatherInfo.icon}
              </div>
              <p className="text-[10px] sm:text-xs text-gray-600 capitalize mb-2 sm:mb-3 min-h-[28px] sm:min-h-[32px] leading-tight">
                {weatherInfo.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-2 text-xs sm:text-sm mb-2">
                <span className="font-bold text-gray-800">
                  {Math.round(data.daily.temperature_2m_max[index])}°
                </span>
                <span className="text-gray-500">
                  {Math.round(data.daily.temperature_2m_min[index])}°
                </span>
              </div>
              {data.daily.precipitation_probability_max && (
                <div className="text-[10px] sm:text-xs text-blue-600">
                  💧 {data.daily.precipitation_probability_max[index]}%
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
