import { NextRequest, NextResponse } from 'next/server';
import { GeocodingResult } from '@/types/weather';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const type = searchParams.get('type') || 'current';

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Step 1: Geocode the city name to get coordinates
    const geocodeUrl = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geocodeResponse = await fetch(geocodeUrl);

    if (!geocodeResponse.ok) {
      throw new Error(`Geocoding error: ${geocodeResponse.status}`);
    }

    const geocodeData = await geocodeResponse.json();

    if (!geocodeData.results || geocodeData.results.length === 0) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    const location: GeocodingResult = geocodeData.results[0];

    // Step 2: Fetch weather data using coordinates
    if (type === 'forecast') {
      const forecastUrl = `${WEATHER_URL}?latitude=${location.latitude}&longitude=${location.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=auto`;

      const weatherResponse = await fetch(forecastUrl);

      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();

      return NextResponse.json({
        name: location.name,
        country: location.country,
        daily: weatherData.daily,
      });
    } else {
      // Current weather with hourly and daily data
      const weatherUrl = `${WEATHER_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,surface_pressure&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weathercode&timezone=auto`;

      const weatherResponse = await fetch(weatherUrl);

      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();

      return NextResponse.json({
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
        current_weather: weatherData.current_weather,
        hourly: weatherData.hourly,
        daily: weatherData.daily,
      });
    }
  } catch (error) {
    console.error('Error fetching weather:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
