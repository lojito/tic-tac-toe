import React            from 'react';
import Square           from './Square';
import * as constants   from '../../Constants';
import PropTypes        from 'prop-types';
import './Board.css';

const COMPUTER = constants.COMPUTER;
const USER     = constants.USER;

const BoardUIHistory = ({folder, imageUser, imageComputer, players, winners}) => {
    const board = players.map((square, ind) => {
      const player = (square === COMPUTER) ? `${folder}%2F${imageComputer}` : ((square === USER) ? `${folder}%2F${imageUser}` : 'default'); 
      const win = winners.indexOf(ind) !== -1 ? 'win' : '';

      return (<Square 
                key      = {ind} 
                player   = {player} 
                win      = {win}
                disabled = {true}
                id       = {ind}
              />
      ) 
    }); 
    
    return (
      <div className="board">
        {board}
      </div>
    )
 
}  

BoardUIHistory.propTypes = {
  folder : PropTypes.string,
  imageUser : PropTypes.number,
  imageComputer : PropTypes.number,
  players : PropTypes.array,
  winners : PropTypes.array
}

export default BoardUIHistory;