import { StringMappingType } from "typescript";

// 날씨 정보 데이터
export interface WeatherData {
  dt: number;
    name: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: {
      all: number;
    }
    wind: {
      speed: number;
    };
    dt_txt: string;
  }
  
  export interface SearchBarProps {
    onSearch: (city: string) => void;
  }
  
  export interface WeatherInfoProps {
    weatherData: WeatherData | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface ForecastData {
    list: WeatherData[];
    city: {
      id: number;
      name: string;
      country: string;
      sunrise: number;
      sunset: number;
    };
  }
  
  export interface ForecastItemProps {
    forecast: {
      date: string;
      temp: number;
      temp_max: number;
      temp_min: number;
      weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
      };
    }
  }
  
  export interface ForecastListProps {
    forecasts: WeatherData[];
  }