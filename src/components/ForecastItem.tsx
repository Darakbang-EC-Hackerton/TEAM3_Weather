import React from 'react';
import styles from '../assets/styles/ForecastItem.module.css';
import { ForecastItemProps } from '../types/weather.types';

export const ForecastItem: React.FC<ForecastItemProps> = ({forecast}) => {
  return (
    <div className={styles.forecastItem}>

      <div className={styles.dateTime}>{forecast.date}</div>
      <div >
        <img
          src={`http://openweathermap.org/img/w/${forecast.weather.icon}.png`}
          alt={forecast.weather.description}
          className={styles.weatherIcon}
        />
        <div>
          <div>
            <span className={styles.temp}>
              {Math.round(forecast.temp)}°C
            </span>
            <span className={styles.minMax}>
              {Math.round(forecast.temp_min)}° / 
              {Math.round(forecast.temp_max)}°
            </span>
          </div>
          <div className={styles.description}>
            {forecast.weather.description}
          </div>
        </div>
      </div>
      </div>

  );
};

export default ForecastItem;