'use client';

import { ForecastData } from '@/types/weather';
import Image from 'next/image';

interface ForecastCardProps {
  data: ForecastData;
}

export default function ForecastCard({ data }: ForecastCardProps) {
  // Group forecasts by day and get one forecast per day (noon time preferably)
  const dailyForecasts = data.list.reduce((acc: any[], item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    const hour = new Date(item.dt * 1000).getHours();

    // Only add if we don't have this day yet, or if this is closer to noon
    const existingIndex = acc.findIndex(
      (f) => new Date(f.dt * 1000).toLocaleDateString() === date
    );

    if (existingIndex === -1) {
      acc.push(item);
    } else if (Math.abs(hour - 12) < Math.abs(new Date(acc[existingIndex].dt * 1000).getHours() - 12)) {
      acc[existingIndex] = item;
    }

    return acc;
  }, []).slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl mt-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-semibold text-gray-700 mb-2">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <div className="relative w-16 h-16 mx-auto mb-2">
                <Image
                  src={iconUrl}
                  alt={day.weather[0].description}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-gray-600 capitalize mb-3 h-8">
                {day.weather[0].description}
              </p>
              <div className="flex justify-center gap-2 text-sm">
                <span className="font-bold text-gray-800">
                  {Math.round(day.main.temp_max)}°
                </span>
                <span className="text-gray-500">
                  {Math.round(day.main.temp_min)}°
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                💧 {day.main.humidity}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
