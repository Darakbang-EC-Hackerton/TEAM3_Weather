import React, { useState } from 'react';
import styles from '../assets/styles/SearchBar.module.css'
import { SearchBarProps } from '../types/weather.types';

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="찾고자 하는 도시 이름"
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        검색
      </button>
    </form>
  );
};

export default SearchBar;