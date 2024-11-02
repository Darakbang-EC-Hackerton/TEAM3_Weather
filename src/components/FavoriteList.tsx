import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FavoriteCity } from '../types/favorite.types';
import styles from '../assets/styles/FavoriteList.module.css';

export const FavoriteList: React.FC = () => {
  const favorites = useSelector((state: any) => state.favorites.cities);
  const dispatch = useDispatch();

  const handleCityClick = (city: FavoriteCity) => {
    // 날씨 정보 조회 로직
  };

    function removeFavorite(id: string): any {
        throw new Error('Function not implemented.');
    }

  return (
    <div className={styles.favoriteList}>
      <h2>즐겨찾기 목록</h2>
      <div className={styles.cities}>
        {favorites.map((city: FavoriteCity) => (
          <div key={city.id} className={styles.cityCard}>
            <div className={styles.cityInfo} onClick={() => handleCityClick(city)}>
              <h3>{city.name}</h3>
              <p>{city.country}</p>
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