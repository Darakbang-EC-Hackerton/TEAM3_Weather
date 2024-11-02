import React from 'react';
import styles from '../assets/styles/ForecastList.module.css';
import { ForecastListProps } from '../types/weather.types';
import ForecastItem from './ForecastItem';

export const ForecastList: React.FC<ForecastListProps> = ({ forecasts }) => {
    // 날짜별로 예보 데이터 그룹화
    const groupedForecasts = forecasts.reduce((acc, forecast) => {
      const date = forecast.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(forecast);
      return acc;
    }, {} as Record<string, typeof forecasts>);
  
    // 각 날짜의 첫 번째 예보만 사용
    const dailyForecasts = Object.entries(groupedForecasts)
      .slice(0, 5) // 5일치만 표시
      .map(([date, dayForecasts]) => {
        const forecast = dayForecasts[0];
        return {
          date: new Date(date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit'
          }),
          temp: Math.round(forecast.main.temp),
          temp_max: Math.round(forecast.main.temp_max),
          temp_min: Math.round(forecast.main.temp_min),
          weather: forecast.weather[0]
        };
      });
  
      return (
        <div>
          <div className={styles.title}>5일 간의 날씨</div>
          <div className={styles.forecastContent}>
            {dailyForecasts.map((day) => (
              <div key={day.date} className={styles.dayForecast}>
                <ForecastItem forecast={day}/>
              </div>
            ))}
          </div>
        </div>
      );
  };
  
  export default ForecastList;