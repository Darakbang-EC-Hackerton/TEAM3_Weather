import React from 'react';
import styles from '../assets/styles/WeatherInfo.module.css';
import { WeatherInfoProps } from '../types/weather.types';

export const WeatherInfo: React.FC<WeatherInfoProps> = ({weatherData}) => {
  if (!weatherData) {
    return null;
  }

  return (
    <div>
      <h2 className={styles.cityName}>{weatherData.name}</h2>
      <div className={styles.weatherMain}>
        <img
          src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
          className={styles.weatherIcon}
        />
        <div className={styles.temperature}>
          {Math.round(weatherData.main.temp)}°C
        </div>
        <div className={styles.minMax}>
          {Math.round(weatherData.main.temp_max)}°C/
          {Math.round(weatherData.main.temp_min)}°C
          </div>
      </div>
      <div className={styles.weatherDetails}>
        <div className={styles.detail}>
          <span>날씨:</span>
          <span>{weatherData.weather[0].description}</span>
        </div>
        <div className={styles.detail}>
          <span>습도:</span>
          <span>{weatherData.main.humidity}%</span>
        </div>
        <div className={styles.detail}>
          <span>풍속:</span>
          <span>{weatherData.wind.speed}m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;