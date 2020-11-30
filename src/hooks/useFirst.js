import { useState, useCallback } from 'react';
import { USER } from '../Constants';

export default () => {
  const [first, setFirst] = useState(USER);
  
  const changeFirstHandler = useCallback(first => {
    setFirst(first);
  }, []);
  
  return { first, changeFirstHandler }
}