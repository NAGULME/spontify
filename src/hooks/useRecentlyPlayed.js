import { useState, useEffect } from 'react';

export const useRecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const stored = sessionStorage.getItem('recentlyPlayed');
    if (stored) {
      setRecentlyPlayed(JSON.parse(stored));
    }
  }, []);

  const addToRecentlyPlayed = (song) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      const newList = [song, ...filtered].slice(0, 10);
      sessionStorage.setItem('recentlyPlayed', JSON.stringify(newList));
      return newList;
    });
  };

  return [recentlyPlayed, addToRecentlyPlayed];
};