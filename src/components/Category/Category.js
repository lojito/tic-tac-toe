import React, { useContext } from 'react';
import { CategoryContext }   from '../../contexts/CategoryContext';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import './Category.css';
import PropTypes             from 'prop-types';

const Category = React.memo(({onChangeCategory = () => {}}) => {
  const { categories } = useContext(CategoryContext);  
  const { dictionary } = useContext(DictionaryContext);

  return dictionary && categories ? (
    <div className="categories" data-testid="categories">
      <span data-testid="description">{dictionary.CATEGORY}: </span>
      <select data-testid="select" onChange={(e) => {onChangeCategory(categories[e.target.value])}}>
      {categories.map((category) => {
          return (
            <option key={category.id} value={category.id} data-testid='select-option'>{dictionary[category.name]}</option>
          )
      })}
      </select>
    </div>
  ) : (null)
})

Category.propTypes = {
  onChangeCategory: PropTypes.func
}

export default Category;
