import React, { createContext } from 'react';
import useLocalStorage          from '../hooks/useLocalStorage';
export const GameContext = createContext();

const GameContextProvider = ({children}) => {

  const {games, dispatch} = useLocalStorage('tictactoe', []);

  const getGame = (id) => {
    if (games.length > 0){
      return games.filter((game) => game.id === id)[0];
    } else {
      return false;
    }
  }

  return (
    <GameContext.Provider value={{games, dispatch, getGame}}>
      {children}
    </GameContext.Provider>
  );

}
 
export default GameContextProvider;