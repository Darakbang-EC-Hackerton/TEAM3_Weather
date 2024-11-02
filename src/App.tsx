import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchBar } from './components/SearchBar';
import { WeatherInfo } from './components/WeatherInfo';
import { ForecastList } from './components/ForecastList';
import { weatherApi } from './services/weatherApi';
import { WeatherData, ForecastData } from './types/weather.types';
import styles from './App.module.css';
import { FavoriteList } from './components/FavoriteList';
import { addFavorite } from './store/favoriteSlice';
import { useFavorites } from './hooks/useFavorites';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const favorites = useFavorites();


  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      // 현재 날씨와 예보 데이터를 동시에 가져오기
      const [weather, forecast] = await Promise.all([
        weatherApi.getWeatherByCity(city),
        weatherApi.getForecastByCity(city)
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(`(${city})의 날씨 정보를 불러오는데 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  // FavoriteList로 전달할 함수
  const handleCitySelect = (cityName: string) => {
    handleSearch(cityName);  // 선택된 도시의 날씨 정보 검색
  };

  // 즐겨찾기 추가 함수
  const handleAddFavorite = () => {
    if (weatherData) {
      dispatch(addFavorite({
        id: weatherData.id.toString(),
        name: weatherData.name,
      }));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>날씨 검색</h1>
      <SearchBar onSearch={handleSearch} />

      {/* 즐겨찾기 목록 */}
      {favorites.length === 0
      ? <div className={styles.emptyMessage}>
      즐겨찾기한 도시가 없습니다.
    </div>
    : <FavoriteList onCitySelect={handleCitySelect} />}
      <div className={styles.divider}></div>
      {loading 
      ? <div className={styles.loading}>날씨 정보를 불러오는 중...</div>
    : <div>
      {weatherData && <div className={styles.card}>
          <button className={styles.favoriteButton} onClick={handleAddFavorite}>
          ☆ 즐겨찾기
          </button>
          <WeatherInfo
            weatherData={weatherData}
          />
          <div className={styles.divider}></div>
          {forecastData && (
            <ForecastList forecasts={forecastData.list} />
          )}
      </div>}
    </div>
    }
      {error && <div className={styles.error}>{error}</div>}
      
      
      <div>
      </div>
    </div>
  );
};

export default App;