import { useState, useCallback } from 'react';
import { EASY } from '../Constants';

export default () => {
  const [level, setLevel] = useState(EASY);
  
  const changeLevelHandler = useCallback(level => {
    setLevel(level);
  }, []);  
  
  return { level, changeLevelHandler }
}