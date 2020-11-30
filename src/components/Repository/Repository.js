import React, { useContext, useEffect } from 'react';
import { CategoryContext }   from '../../contexts/CategoryContext';
import Category              from '../Category/Category';
import useCategory           from '../../hooks/useCategory';
import './Repository.css';

const Repository = () => {
  const { categories, error } = useContext(CategoryContext);
  const {category, changeCategoryHandler} = useCategory();
  const url = 'https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images';

  useEffect(() => {
    return () => {
      const chk = document.querySelector('input#menu');
      if (chk){
        chk.checked = false;
      }
    }
  });

  if (error){
    return <div className="error" data-testid="error">{error}</div>
  }

  return categories ? (
    <div className="repository" data-testid="repository">
      <Category onChangeCategory = {changeCategoryHandler}/>
      <div className="repository-images" data-testid="images">
      {Array(~~20).fill(1).map(
          (value, index) => {
            return (
              <div key={index}>
                <img src={`${url}%2F${category.folder}%2F${index}.jpg?alt=media`} alt="user" data-testid="image"/>
              </div>
            )
          })}
      </div>
    </div>
  ) : (
    <div className="loading" data-testid="loading">Loading the Repository page...</div>
  )
}

export default Repository;