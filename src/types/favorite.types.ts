export interface FavoriteCity {
    id: string;
    name: string;
}

export interface FavoriteListProps {
    onCitySelect: (cityName: string) => void;  // App.tsx로부터 전달받는 prop
}

export interface FavoriteState {
    cities: FavoriteCity[];
  }