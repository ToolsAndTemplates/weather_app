// Dynamic background themes based on weather conditions
export interface WeatherTheme {
  gradient: string;
  textColor: string;
  accentColor: string;
}

export function getWeatherTheme(weatherCode: number): WeatherTheme {
  // Clear sky
  if (weatherCode === 0) {
    return {
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      textColor: 'text-white',
      accentColor: 'text-yellow-300',
    };
  }

  // Mainly clear / Partly cloudy
  if (weatherCode >= 1 && weatherCode <= 2) {
    return {
      gradient: 'from-cyan-400 via-blue-400 to-blue-500',
      textColor: 'text-white',
      accentColor: 'text-yellow-200',
    };
  }

  // Overcast
  if (weatherCode === 3) {
    return {
      gradient: 'from-gray-400 via-gray-500 to-gray-600',
      textColor: 'text-white',
      accentColor: 'text-gray-200',
    };
  }

  // Fog
  if (weatherCode === 45 || weatherCode === 48) {
    return {
      gradient: 'from-gray-500 via-gray-600 to-gray-700',
      textColor: 'text-white',
      accentColor: 'text-gray-200',
    };
  }

  // Drizzle / Light rain
  if ((weatherCode >= 51 && weatherCode <= 57) || weatherCode === 61 || weatherCode === 80) {
    return {
      gradient: 'from-slate-400 via-slate-500 to-slate-600',
      textColor: 'text-white',
      accentColor: 'text-blue-200',
    };
  }

  // Rain / Heavy rain
  if ((weatherCode >= 63 && weatherCode <= 67) || weatherCode === 81 || weatherCode === 82) {
    return {
      gradient: 'from-slate-600 via-slate-700 to-slate-800',
      textColor: 'text-white',
      accentColor: 'text-blue-300',
    };
  }

  // Snow
  if (weatherCode >= 71 && weatherCode <= 77 || weatherCode === 85 || weatherCode === 86) {
    return {
      gradient: 'from-slate-500 via-slate-600 to-slate-700',
      textColor: 'text-white',
      accentColor: 'text-blue-300',
    };
  }

  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) {
    return {
      gradient: 'from-indigo-800 via-purple-900 to-slate-900',
      textColor: 'text-white',
      accentColor: 'text-yellow-400',
    };
  }

  // Default
  return {
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    textColor: 'text-white',
    accentColor: 'text-blue-100',
  };
}
