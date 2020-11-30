import { useReducer, useEffect } from 'react';
import { gameReducer } from '../reducers/gameReducer';

let isLoading;
export default (key, initialValue) => {
  const [games, dispatch] = useReducer(gameReducer, [], () => {
    try {
      isLoading = true;
      const gamesJson = window.localStorage.getItem(key);
      return gamesJson ? JSON.parse(gamesJson) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isLoading){
      isLoading = false;
      return;
    }
    localStorage.setItem(key, JSON.stringify(games));
  },[key, games]);
  
  return {games, dispatch};
}