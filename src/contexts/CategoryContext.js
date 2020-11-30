import React, { createContext } from 'react';
import useFetchData from '../hooks/useFetchData';

export const CategoryContext = createContext();

const CategoryContextProvider = ({children}) => {
  let {data: categories, error} = useFetchData("categories");

  return (
    <CategoryContext.Provider value={{categories, error}}>
      {children}
    </CategoryContext.Provider>
  );

}
 
export default CategoryContextProvider;