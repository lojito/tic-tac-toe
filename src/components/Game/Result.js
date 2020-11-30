import React, { useContext}  from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import PropTypes             from 'prop-types';
import * as constants        from '../../Constants';

const { LOST, WON } = constants;

const Result = ({result}) => {
  const { dictionary } = useContext(DictionaryContext);
  let message = '';

  if (dictionary){
    if (result === LOST){
      message = dictionary.MESSAGE_LOST;
    } else if (result === WON){
      message = dictionary.MESSAGE_WON;
    } else {
      message = dictionary.MESSAGE_DRAW;
    }
    return (
      <span>{message}</span>
    )
  } else {
    return (null)
  }

}

Result.propTypes = {
  result : PropTypes.number
}

export default Result