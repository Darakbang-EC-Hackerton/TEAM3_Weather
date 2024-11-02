import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather.types';
import { API_KEY } from '../API_KEY';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = {
  getWeatherByCity: async (city: string): Promise<WeatherData> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  },
  getForecastByCity: async (city: string): Promise<ForecastData> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch forecast data');
    }
  },
  
};