import React, { useContext, useEffect } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import { GameContext }       from '../../contexts/GameContext';
import GamesHistory          from './GamesHistory';

const History = () => {
  const { dictionary, error } = useContext(DictionaryContext);  
  const { games } = useContext(GameContext);
  let historyGames;

  useEffect(() => {
    return () => {
      const chk = document.querySelector('input#menu');
      if (chk){
        chk.checked = false;
      }
    }
  });

  if (error){
    return <div className="error">{error}</div>
  }

  if (dictionary){
    if (games && games.length > 0){
      historyGames = games.map((game) => {
        return (<GamesHistory 
                  key            = {game.id}
                  imageUser      = {game.imageUser}
                  imageComputer  = {game.imageComputer}
                  categoryId     = {game.categoryId}
                  id             = {game.id}
                  first          = {game.first}
                  level          = {game.level}
                  result         = {game.result}
                />
          )
      });
    } else {
      historyGames = (
        <div className="board-footer"> 
          {dictionary && dictionary.NO_HISTORY_YET}
        </div>
      )
    }

    return (
      <div className="text-center">
          {historyGames}
      </div> 
    )
  } else {
    return <div className="loading">Loading the Historical page...</div>
  }

}

export default History;