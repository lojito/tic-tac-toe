import React     from 'react';
import PropTypes from 'prop-types';
import './Board.css';

const Square = React.memo(({win, disabled, handleClick = () => {}, id, player}) => {
  const firebaseUrl = `url(https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images%2F${player}.jpg?alt=media)`;

  return (
    <button style     = {{backgroundImage : firebaseUrl}}
            className = {win}
            disabled  = {disabled}
            onClick   = {(e) => { handleClick(e) }}
            id        = {id}>
    </button>
  )
});

Square.propTypes = {
  win : PropTypes.string,
  disabled : PropTypes.bool,
  handleClick : PropTypes.func,
  id : PropTypes.number,
  player : PropTypes.string
}

export default Square;