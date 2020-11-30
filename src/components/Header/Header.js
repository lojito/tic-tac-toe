import React, { useContext} from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import * as constants from '../../Constants';
import './Header.css';

const { ENGLISH, FRENCH, SPANISH } = constants;

const Header = () => {
  const { dictionary, changeLanguageHandler } = useContext(DictionaryContext);
  
  if (dictionary){
    const url = 'https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images';    
    const english = dictionary['ENGLISH_HINT'];
    const french  = dictionary['FRENCH_HINT' ];
    const spanish = dictionary['SPANISH_HINT'];

    return (
      <header>
          <div className="flags" data-testid="flags">
            <img data-testid="english" src={`${url}%2Fflags%2Fusa.jpg?alt=media`}   onClick={() => { changeLanguageHandler(ENGLISH); }} alt={english}  title={english}/>
            <img data-testid="french" src={`${url}%2Fflags%2Ffrance.jpg?alt=media`} onClick={() => { changeLanguageHandler(FRENCH);  }} alt={french}  title={french}/>
            <img data-testid="spanish" src={`${url}%2Fflags%2Fspain.jpg?alt=media`} onClick={() => { changeLanguageHandler(SPANISH); }} alt={spanish}  title={spanish}/>
          </div>
      </header>
    )    
  } else {
    return (null)
  }
}

export default Header;