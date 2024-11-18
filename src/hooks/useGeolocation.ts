import { useState, useEffect } from 'react';

interface LocationInfo {
  coords: GeolocationCoordinates;
  city: string;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCityName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=he`
      );
      const data = await response.json();
      return data.city || data.locality || 'לא ידוע';
    } catch (error) {
      console.error('Error fetching city:', error);
      return 'לא ידוע';
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('הדפדפן שלך לא תומך באיתור מיקום');
      return;
    }

    const success = async (position: GeolocationPosition) => {
      const city = await getCityName(
        position.coords.latitude,
        position.coords.longitude
      );
      setLocation({
        coords: position.coords,
        city
      });
      setError(null);
    };

    const error = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    const watchId = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error };
};