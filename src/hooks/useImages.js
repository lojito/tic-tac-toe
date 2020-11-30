import { useState, useCallback } from 'react';
import { imagesPerCategory } from '../Constants';

export default (user = 0, computer = 1) => {
  const [images, setImages] = useState({user, computer});
  
  const changeImagesHandler = useCallback(images => {
    setImages(images);
  }, []);

  const randomImage = useCallback(() => {
    let image = Math.floor(Math.random() * imagesPerCategory);
    while ( image === images.computer || image === images.user ){
      image = Math.floor(Math.random() * imagesPerCategory);
    }
    return image;
  }, [images.computer, images.user])

  const refreshImageUser = useCallback(() => {
    setImages({
      user : randomImage(),
      computer: images.computer,
    })
  }, [images.computer, randomImage])

  const refreshImageComputer = useCallback(() => {
    setImages({
      user : images.user,
      computer: randomImage()
    })
  }, [images.user, randomImage])

  if (images.user === images.computer) {
    refreshImageUser();
  }

  return { images, changeImagesHandler, randomImage, refreshImageUser, refreshImageComputer }
}  