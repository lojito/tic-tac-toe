import React, { createContext } from 'react';
import useFetchData from '../hooks/useFetchData';
import useLanguage from '../hooks/useLanguage';
import * as constants from '../Constants';

export const DictionaryContext = createContext();

const DictionaryContextProvider = ({children}) => {
  let {data: dictionary, error} = useFetchData("dictionary");
  const [language, changeLanguageHandler] = useLanguage(constants.ENGLISH);

  dictionary = dictionary[language];

  return (
    <DictionaryContext.Provider value={{dictionary, error, changeLanguageHandler}}>
      {children}
    </DictionaryContext.Provider>
  );

}
 
export default DictionaryContextProvider;