import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherInfo } from './components/WeatherInfo';
import { ForecastList } from './components/ForecastList';
import { weatherApi } from './services/weatherApi';
import { WeatherData, ForecastData } from './types/weather.types';
import styles from './App.module.css';
import { FavoriteList } from './components/FavoriteList';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      setError('날씨 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // FavoriteList로 전달할 함수
  const handleCitySelect = (cityName: string) => {
    handleSearch(cityName);  // 선택된 도시의 날씨 정보 검색
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>날씨 검색</h1>
      <SearchBar onSearch={handleSearch} />

      {/* 즐겨찾기 목록 */}
      <FavoriteList onCitySelect={handleCitySelect} />
      
      {loading && <div className={styles.loading}>로딩 중...</div>}
      {error && <div className={styles.error}>{error}</div>}
      
      {weatherData && <div className={styles.card}>
          <WeatherInfo
            weatherData={weatherData}
            isLoading={loading}
            error={error}
          />
          <div className={styles.divider}></div>
          {forecastData && (
            <ForecastList forecasts={forecastData.list} />
          )}
      </div>}
      <div>
      </div>
    </div>
  );
};

export default App;