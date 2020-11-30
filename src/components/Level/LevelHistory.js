import React, { useContext }  from 'react';
import { DictionaryContext }  from '../../contexts/DictionaryContext';
import { EASY, HARD}          from '../../Constants';
import './Level.css';

const LevelHistory = ({level}) => {
  const { dictionary } = useContext(DictionaryContext);
  
  return dictionary ? (
    <div className="level">
      {dictionary.LEVEL}:&nbsp;
      {level === EASY ? dictionary.LEVEL_EASY : ((level === HARD) ? dictionary.LEVEL_HARD : dictionary.LEVEL_NORMAL)}
    </div>
  ) : (null)
}

export default LevelHistory