import React, { useState, useCallback, useEffect, memo}  from 'react';
import {EMPTY, USER, COMPUTER, LOST, WON, DRAW }         from '../../Constants';
import Board     from '../Board/Board';
import Computer  from '../Board/Computer';
import Square    from './Square';
import PropTypes from 'prop-types';
import './Board.css';

const board = new Board();
const computer = new Computer(board);
let winners; 
let player;
let over = false;

const BoardUI = memo(({categoryId, folder, imageUser, imageComputer, first, level, disabledSquares, onGameOver = () => {}}) => {
  const [players, setPlayers] = useState(() => {
    board.level = level;
    board.first = first;
    player = first;
    over = false;
    board.reset();
    winners = [];
    return board.players;
  });

  const gameInfo = useCallback(() => {
    return {
      categoryId,
      imageUser,
      imageComputer,
      first,
      level,
      board: [...board.players],
      winners
    }
  }, [categoryId, imageUser, imageComputer, first, level]);

  const play = useCallback((e) => {
    if (!over){
      if (player === COMPUTER){
        if (typeof e !== "undefined"){
          return;
        }
        computer.play();
      } else {
          board.place(USER, e.target.id); 
      }
      setPlayers(board.players);
      if (board.isAWinner(player)){
        over = true;
        winners = board.getWinningSquares();
        onGameOver({
          ...gameInfo(),
          result: player === COMPUTER ? LOST : WON
        })
      } else if (board.isFull){
        over = true;
        winners = board.getWinningSquares();
        onGameOver({
          ...gameInfo(),
          result: DRAW
        })
      } else {
        player = player === COMPUTER ? USER : COMPUTER;
        if (player === COMPUTER){
          window.setTimeout(play, 2);
        }
      }
    }
  }, [gameInfo, onGameOver]);

  useEffect(() => {
    board.level = level;
    board.first = first;
    player = first;
    if (!disabledSquares){
      if (over){
        over = false;
        board.reset();
        winners = [];
        setPlayers(board.players);
      }
      if (first === COMPUTER){
        play();
      }
    }
  }, [first, level, disabledSquares, play]);

  const squares = players.map((square, ind) => {
    const player = (square === COMPUTER) ? `${folder}%2F${imageComputer}` : ((square === USER) ? `${folder}%2F${imageUser}` : 'default'); 
    const win = over ? (winners.indexOf(ind) !== -1 ? 'win' : '') : '';
    const disabled = disabledSquares ? true : (over ? true : (square !== EMPTY ? true : false));

    return (<Square 
              key         = {ind} 
              player      = {player} 
              win         = {win}
              disabled    = {disabled}
              id          = {ind}
              handleClick = {play}
            />
    ) 
  }); 
  
  return (
    <div className="board">
      {squares}
    </div>
  )
 
});

BoardUI.propTypes = {
  categoryId : PropTypes.number,
  folder : PropTypes.string,
  imageUser : PropTypes.number,
  imageComputer : PropTypes.number,
  first : PropTypes.number,
  level : PropTypes.number,
  disabledSquares : PropTypes.bool,
  onGameOver : PropTypes.func
}

export default BoardUI