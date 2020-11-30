import { useState, useCallback } from 'react';

export default () => {
  const [category, setCategory] = useState({id: 0, folder: 'habana', name: 'HAVANA_LANDMARKS'});
  
  const changeCategoryHandler = useCallback(category => {
    setCategory(category);
  }, []);
  
  return { category, changeCategoryHandler }
}