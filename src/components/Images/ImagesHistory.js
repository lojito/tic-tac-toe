import React, { useContext }  from 'react';
import { DictionaryContext }  from '../../contexts/DictionaryContext';
import './Images.css';

const ImageHistory = ({folder, imageUser, imageComputer}) => {
  const { dictionary } = useContext(DictionaryContext);
  
  const url = 'https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images';
  
  return dictionary ? (
    <div className={"images"}>

      <div className='user-image'>
        <span>{dictionary.YOU}: </span>
        <img className="image-token" 
            src={`${url}%2F${folder}%2F${imageUser}.jpg?alt=media`} 
            alt="user" />
      </div>

      <div className='computer-image'>
        <span>{dictionary.OPPONENT}: </span>
        <img className="image-token"
            src={`${url}%2F${folder}%2F${imageComputer}.jpg?alt=media`}
            alt="computer" />
      </div>
      
    </div>
  ) : (null)
}

export default ImageHistory