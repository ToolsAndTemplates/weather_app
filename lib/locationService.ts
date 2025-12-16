// Service to detect user location from IP address

export interface LocationData {
  city: string;
  country: string;
  ip: string;
  latitude: number;
  longitude: number;
}

/**
 * Detects user's location based on their IP address
 * Uses ipapi.co free service (no API key required)
 * Falls back to null if detection fails
 */
export async function detectUserLocation(): Promise<LocationData | null> {
  try {
    // Use ipapi.co for IP-based geolocation (free, no key needed)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('IP geolocation failed:', response.status);
      return null;
    }

    const data = await response.json();

    // Check if we got valid data
    if (!data.city || !data.country) {
      console.warn('Invalid geolocation data:', data);
      return null;
    }

    return {
      city: data.city,
      country: data.country_name || data.country,
      ip: data.ip,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error('Error detecting user location:', error);
    return null;
  }
}

/**
 * Alternative: Get location using ip-api.com (backup)
 */
export async function detectUserLocationBackup(): Promise<LocationData | null> {
  try {
    const response = await fetch('http://ip-api.com/json/', {
      method: 'GET',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.status !== 'success' || !data.city) {
      return null;
    }

    return {
      city: data.city,
      country: data.country,
      ip: data.query,
      latitude: data.lat,
      longitude: data.lon,
    };
  } catch (error) {
    console.error('Backup location detection failed:', error);
    return null;
  }
}
