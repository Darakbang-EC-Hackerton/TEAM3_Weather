import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteCity } from '../types/favorite.types';

interface FavoriteState {
  cities: FavoriteCity[];
}

const initialState: FavoriteState = {
  cities: [],
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteCity>) => {
      if (!state.cities.find(city => city.id === action.payload.id)) {
        state.cities.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
    },
  },
});