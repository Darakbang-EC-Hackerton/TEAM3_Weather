import React from 'react';
import {  useDispatch } from 'react-redux';
import { FavoriteCity, FavoriteListProps } from '../types/favorite.types';
import styles from '../assets/styles/FavoriteList.module.css';
import { removeFavorite } from '../store/favoriteSlice';
import { useFavorites } from '../hooks/useFavorites';

export const FavoriteList: React.FC<FavoriteListProps> = ({onCitySelect}) => {
  const dispatch = useDispatch();
  const favorites = useFavorites();
  const handleCityClick = async (city: FavoriteCity) => {
    onCitySelect(city.name)
  };
  
  return (
    <div className={styles.favoriteList}>
      <h2>즐겨찾기 목록</h2>
      <div className={styles.cities}>
        {favorites.map((city: FavoriteCity) => (
          <div key={city.id} className={styles.cityCard}>
            <div className={styles.cityInfo} onClick={() => handleCityClick(city)}>
              <h3>{city.name}</h3>
            </div>
            <button
              onClick={() => dispatch(removeFavorite(city.id))}
              className={styles.removeBtn}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};