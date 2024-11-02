import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useFavorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites.cities);

  // 로컬 스토리지 동기화
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return favorites;
};