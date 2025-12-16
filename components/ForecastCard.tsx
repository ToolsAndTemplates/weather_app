'use client';

import { ForecastData } from '@/types/weather';
import { getWeatherInfo } from '@/lib/weatherCodes';

interface ForecastCardProps {
  data: ForecastData;
}

export default function ForecastCard({ data }: ForecastCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 w-full max-w-6xl mt-6 animate-fade-in">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">7-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {data.daily.time.map((date, index) => {
          const weatherInfo = getWeatherInfo(data.daily.weathercode[index]);
          const dateObj = new Date(date);

          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 text-center hover:scale-105 transition-all duration-300"
            >
              <p className="text-xs sm:text-sm font-semibold text-white mb-1">
                {index === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-[10px] sm:text-xs text-white/70 mb-2 sm:mb-3">
                {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">
                {weatherInfo.icon}
              </div>
              <p className="text-[10px] sm:text-xs text-white/80 capitalize mb-2 sm:mb-3 min-h-[28px] sm:min-h-[32px] leading-tight">
                {weatherInfo.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-2 text-xs sm:text-sm mb-2">
                <span className="font-bold text-white">
                  {Math.round(data.daily.temperature_2m_max[index])}°
                </span>
                <span className="text-white/70">
                  {Math.round(data.daily.temperature_2m_min[index])}°
                </span>
              </div>
              {data.daily.precipitation_probability_max && (
                <div className="text-[10px] sm:text-xs text-blue-300">
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
