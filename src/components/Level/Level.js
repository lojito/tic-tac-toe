import React, { useContext }  from 'react';
import { DictionaryContext }  from '../../contexts/DictionaryContext';
import PropTypes              from 'prop-types';
import { EASY, HARD, NORMAL } from '../../Constants';
import './Level.css';

const Level = React.memo(({disabled, onChangeLevel = () => {}}) => {
  const { dictionary, error } = useContext(DictionaryContext);
  
  if (error){
    return <div className="error" data-testid="error">{error}</div>
  }

  return dictionary ? (
    <div className="level" data-testid="level">
      <span title = {dictionary.LEVEL_TOOLTIP}>{dictionary.LEVEL}?</span>
      <select data-testid="select" onChange={(e) => {onChangeLevel(e.target.value * 1)}} disabled = {disabled} >
        <option data-testid="select-option" key={EASY}   value={EASY}>   {dictionary.LEVEL_EASY  }</option>
        <option data-testid="select-option" key={NORMAL} value={NORMAL}> {dictionary.LEVEL_NORMAL}</option>
        <option data-testid="select-option" key={HARD}   value={HARD}>   {dictionary.LEVEL_HARD  }</option>
      </select>
    </div>
  ) : (
    <div className="loading" data-testid="loading">Loading the Level page...</div>
  )
}); 

Level.propTypes = {
  disabled : PropTypes.bool,
  onChangeLevel : PropTypes.func
}

export default Level;