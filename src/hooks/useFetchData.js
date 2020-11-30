import { useState, useEffect } from 'react';
import axios from 'axios'

export default (jsonFile) => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`https://tic-tac-toe-974b0.firebaseio.com/${jsonFile}.json`);
        setData(res.data);
        setError('');
      } catch(e) {
        setError(`Error while fetching the ${jsonFile}.json file from the Google Cloud`);
        setData('');
        console.log('ERROR: ', e.message);
      }
    }
    fetchData();
  }, [jsonFile]);

  return {data, error};
}