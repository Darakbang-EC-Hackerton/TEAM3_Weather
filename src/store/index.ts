import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favoriteSlice';

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer
  }
});

// 타입 내보내기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;