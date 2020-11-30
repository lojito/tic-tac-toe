import React, { useContext }   from 'react';
import { Link }                from 'react-router-dom';
import {CategoryContext}       from '../../contexts/CategoryContext';
import { DictionaryContext }   from '../../contexts/DictionaryContext';
import { GameContext }         from '../../contexts/GameContext';
import CategoryHistory         from '../Category/CategoryHistory';
import ImagesHistory           from '../Images/ImagesHistory';
import StartGameHistory        from '../StartGame/StartGameHistory';
import LevelHistory            from '../Level/LevelHistory';
import Result                  from './Result';
import PropTypes               from 'prop-types';
import './GameHistory.css';

const GamesHistory = ({categoryId, imageUser, imageComputer, result, id, first, level}) => {

  const { dictionary } = useContext(DictionaryContext);  
  const { categories } = useContext(CategoryContext);  
  const { dispatch}  = useContext(GameContext);
  
  return categories && dictionary ? (
    <div>

      <CategoryHistory categoryId = {categoryId}/>

      <ImagesHistory imageUser={imageUser} imageComputer={imageComputer} folder={categories[categoryId].folder}/>

      <div className="settings">
        <StartGameHistory  first = {first}/>
        <LevelHistory      level = {level}/>
      </div>
      
      <div className="board-footer">
        <Result result = {result}/>
        
        <button className="see-game">
          <Link to={`/${id}`}>{dictionary.SEE_GAME}</Link>
        </button>

        <input type="button" 
               value={dictionary.DELETE_GAME}
               onClick={(e) => { 
                dispatch({type: 'REMOVE_GAME', id });
               }} 
               className="delete-game"/>
      </div>

      <hr/>

    </div>
  ) : (
    <div className="loading">Loading the Historical page...</div>
  )
}

GamesHistory.propTypes = {
  categoryId : PropTypes.number,
  imageUser : PropTypes.number,
  imageComputer : PropTypes.number,
  first : PropTypes.number,
  level : PropTypes.number,
  result : PropTypes.number,
  id : PropTypes.number
}

export default GamesHistory;