import React, { useContext, useEffect }  from 'react';
import {CategoryContext}      from '../../contexts/CategoryContext';
import { DictionaryContext }  from '../../contexts/DictionaryContext';
import { GameContext }        from '../../contexts/GameContext';
import CategoryHistory        from '../Category/CategoryHistory';
import StartGameHistory       from '../StartGame/StartGameHistory';
import LevelHistory           from '../Level/LevelHistory';
import ImagesHistory          from '../Images/ImagesHistory';
import BoardUIHistory         from '../Board/BoardUIHistory';
import Result                 from './Result';
import types                  from '../../reducers/types';
import './GameHistory.css';

const GameHistory = (props) => {
  const { dictionary, error } = useContext(DictionaryContext);  
  const { categories } = useContext(CategoryContext);
  const { getGame, dispatch } = useContext(GameContext); 

  let categoryId, imageComputer, imageUser, first, level, players, winners, result;

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

  const gameId = props.match.params.id * 1;
  let game = getGame(gameId);
  if (game){
    ({categoryId, imageComputer, imageUser, first, level, board: players, winners, result } = game);
  }

  return game && categories && dictionary ? (
    <div className="text-center">

        <CategoryHistory categoryId = {categoryId}/>

        <ImagesHistory imageUser={imageUser} imageComputer={imageComputer} folder={categories[categoryId].folder}/>

        <div className="settings">
          <StartGameHistory  first = {first} /> 
          <LevelHistory      level = {level} />
        </div>

        <BoardUIHistory
          imageUser      = {imageUser}
          imageComputer  = {imageComputer}
          players        = {players}
          winners        = {winners}
          folder         = {categories[categoryId].folder}
        />
        
        <div className="board-footer">
          <Result result = {result}/>

          <input  type="button"
                  value={dictionary.DELETE_GAME} 
                  onClick={(e) => { 
                    dispatch({type: types.REMOVE_GAME, id: gameId}); 
                    props.history.push('/history')
                  }} 
                  className="delete-game"/>

          <input  type="button" 
                  value={dictionary.BACK}
                  onClick={(e) => {
                    props.history.push('/history')
                  }}
                  className="back"/>
        </div>
    </div>
  ) : (  
    <div className="loading">Loading the Game History page...</div>
  )
}

export default GameHistory;