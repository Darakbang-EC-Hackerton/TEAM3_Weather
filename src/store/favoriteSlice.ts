// src/store/favoriteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteCity } from '../types/favorite.types';

interface FavoriteState {
  cities: FavoriteCity[];
}

// 로컬 스토리지에서 초기 상태 불러오기
const loadFavoritesFromStorage = (): FavoriteCity[] => {
  try {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};

const initialState: FavoriteState = {
  cities: loadFavoritesFromStorage(),
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteCity>) => {
      if (!state.cities.find(city => city.id === action.payload.id)) {
        state.cities.push(action.payload);
        // 로컬 스토리지 업데이트
      localStorage.setItem('favorites', JSON.stringify(state.cities));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
        // 로컬 스토리지 업데이트
      localStorage.setItem('favorites', JSON.stringify(state.cities));
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;