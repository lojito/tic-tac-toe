import React, { useContext } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import PropTypes             from 'prop-types';
import { USER, COMPUTER }    from '../../Constants';
import './StartGame.css';

const StartGame = React.memo(({disabled, onChangePlayer = () => {}}) => {
  const { dictionary, error } = useContext(DictionaryContext);
  
  if (error){
    return <div className="error" data-testid="error">{error}</div>
  }

  return dictionary ? (
    <div className="start" data-testid="startgame">
        <span title = {dictionary.START_TOOLTIP}>{dictionary.START}?</span>
        <select data-testid="select" onChange={(e) => {onChangePlayer(e.target.value * 1)}} disabled = {disabled} >
          <option data-testid="select-option" key={0}  value={USER}>{dictionary.YES   }</option>
          <option data-testid="select-option" key={1}  value={COMPUTER}>{dictionary.NO}</option>
        </select>
    </div>
  ) : (
    <div className="loading" data-testid="loading">Loading the StartGame page...</div>
  )
});

StartGame.propTypes = {
  disabled : PropTypes.bool,
  onChangePlayer : PropTypes.func
}

export default StartGame;