// components/WeatherMap/WeatherMap.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { weatherApi } from '../services/weatherApi';
import styles from './WeatherMap.module.css';

interface CityWeather {
  id: string;
  name: string;
  country: string;
  weather: {
    temp: number;
    description: string;
    icon: string;
  };
  coordinates: {
    lat: number;
    lon: number;
  };
}

export const WeatherMap: React.FC = () => {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [recommendations, setRecommendations] = useState<CityWeather[]>([]);

  useEffect(() => {
    // 주요 도시들의 날씨 정보 불러오기
    loadCitiesWeather();
  }, []);

  const loadCitiesWeather = async () => {
    // API 호출 로직
  };

  const getRecommendations = () => {
    // 날씨 기반 여행지 추천 로직
    return cities.filter(city => city.weather.description.includes('clear'));
  };

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={[0, 0]} zoom={2}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker
            key={city.id}
            position={[city.coordinates.lat, city.coordinates.lon]}
          >
            <Popup>
              <div className={styles.popupContent}>
                <h3>{city.name}, {city.country}</h3>
                <img
                  src={`http://openweathermap.org/img/w/${city.weather.icon}.png`}
                  alt={city.weather.description}
                />
                <p>{city.weather.temp}°C</p>
                <p>{city.weather.description}</p>
                <button
                  onClick={() => dispatch(addFavorite(city))}
                  className={styles.addFavoriteBtn}
                >
                  즐겨찾기 추가
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className={styles.recommendations}>
        <h2>추천 여행지</h2>
        <div className={styles.recommendationList}>
          {recommendations.map(city => (
            <div key={city.id} className={styles.recommendationCard}>
              <h3>{city.name}</h3>
              <p>{city.weather.temp}°C</p>
              <p>{city.weather.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};