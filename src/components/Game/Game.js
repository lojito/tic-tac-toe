import React, { useState, useEffect, useContext, useCallback }  from 'react';
import { GameContext }       from '../../contexts/GameContext';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import Category              from '../Category/Category';
import Images                from '../Images/Images';
import StartGame             from '../StartGame/StartGame';
import Level                 from '../Level/Level';
import BoardUI               from '../Board/BoardUI';
import Result                from './Result';
import types                 from '../../reducers/types';
import useCategory           from '../../hooks/useCategory';
import useImages             from '../../hooks/useImages';
import useFirst              from '../../hooks/useFirst';
import useLevel              from '../../hooks/useLevel';
import './Game.css';

let result = "";
let showStartButton = true;
let over = false;

const Game = () => {
  const { dispatch } = useContext(GameContext);
  const { dictionary, error } = useContext(DictionaryContext);

  const {category, changeCategoryHandler} = useCategory();
  const {folder} = category;

  const {images, changeImagesHandler} = useImages();

  const {first, changeFirstHandler} = useFirst();
  const {level, changeLevelHandler} = useLevel();

  const [settings, setSettings] = useState(false);
  
  const [disableSquares, setDisableSquares] = useState(true);

  const gameOverHandler = useCallback((game) => {
    over = true;
    setSettings(false);
    setDisableSquares(true);
    result = game.result;
    dispatch({type: types.ADD_GAME, game});
  }, [dispatch]);

  const gameInitHandler = useCallback(() => {
    showStartButton = false;
    over = false;
    setSettings(true);
    setDisableSquares(false);
  }, []);
 
  useEffect(() => {
    showStartButton = true;
    over = false;

    return () => {
      const chk = document.querySelector('input#menu');
      if (chk){
        chk.checked = false;
      }
    }    
  }, [gameInitHandler])

  if (error){
    return <div className="error">{error}</div>
  }

  return dictionary ? (
    <div className="game text-center">

      <Category onChangeCategory = {changeCategoryHandler}/>

      <Images folder={folder} onChangeImages={changeImagesHandler}/>

      <div className="settings">
        <StartGame disabled={settings} onChangePlayer={changeFirstHandler} />
        <Level     disabled={settings} onChangeLevel ={changeLevelHandler} />
      </div>

      {showStartButton && (
        <div className="start-playing">
          <button onClick={gameInitHandler}>{dictionary.PLAY}</button>
        </div>)}

      <BoardUI categoryId={category.id}
               folder={folder} 
               imageUser={images.user}
               imageComputer={images.computer}
               first={first}
               level={level}
               disabledSquares={disableSquares}
               onGameOver={gameOverHandler}/>

      {over && ( 
        <div className="board-footer">  
          <span>{dictionary.GAME_OVER}: </span>
          <Result result = {result}/>
          <input  className="play-again" 
                  type="button" 
                  value={dictionary.PLAY_AGAIN} 
                  onClick={gameInitHandler} />
        </div>
      )}
    </div>
  ) : (
    <div className="loading">Loading the Game page...</div>
  )
}

export default Game