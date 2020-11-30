import { useState, useCallback } from 'react';
import { ENGLISH } from '../Constants';

function useLanguage(lang = ENGLISH){
  const [language, setLanguage] = useState(lang);
  
  const changeLanguageHandler = useCallback(language => {
    setLanguage(language);
  }, []);
  
  return [language, changeLanguageHandler];
}

export default useLanguage;