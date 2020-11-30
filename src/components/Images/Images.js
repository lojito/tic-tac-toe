import React, { useContext, useEffect }    from 'react';
import { DictionaryContext }               from '../../contexts/DictionaryContext';
import useImages                           from '../../hooks/useImages';
import {COMPUTER, USER, imagesPerCategory} from '../../Constants';
import PropTypes                           from 'prop-types';
import './Images.css';

const Images = React.memo(({folder, onChangeImages = () => {}}) => {
  const { dictionary } = useContext(DictionaryContext);
  const {images, refreshImageUser, refreshImageComputer} = useImages(Math.floor(Math.random() * imagesPerCategory), Math.floor(Math.random() * imagesPerCategory));
  const {user: imageUser, computer: imageComputer} = images;

  const url = 'https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images';
 
  useEffect(() => {
    onChangeImages({
      user: imageUser,
      computer: imageComputer
    });
  }, [imageUser, imageComputer, onChangeImages]);

  return dictionary ? (
    <div className={"images"}>

      <div className='user-image'>
        <span>{dictionary.YOU}: </span>
        <img className="image-token" 
            src={`${url}%2F${folder}%2F${imageUser}.jpg?alt=media`} 
            alt="user" 
            title={dictionary.USER_IMAGE_TOOLTIP}/>
        <img className='refresh' 
              src={`${url}%2Frefresh.png?alt=media`} 
              alt="refresh" 
              onClick={()=>refreshImageUser(USER)}
              title={dictionary.REFRESH_TOOLTIP} />
      </div>

      <div className='computer-image'>
        <span>{dictionary.OPPONENT}: </span>
        <img className="image-token"
            src={`${url}%2F${folder}%2F${imageComputer}.jpg?alt=media`}
            alt="computer"
            title={dictionary.COMPUTER_IMAGE_TOOLTIP}/>
        <img className='refresh'
            src={`${url}%2Frefresh.png?alt=media`} 
            alt="refresh" 
            onClick={()=>refreshImageComputer(COMPUTER)}
            title={dictionary.REFRESH_TOOLTIP} />
      </div>
      
    </div>
  ) : (null)
  
});

Images.propTypes = {
  folder : PropTypes.string,
  onChangeImages : PropTypes.func
}

export default Images;