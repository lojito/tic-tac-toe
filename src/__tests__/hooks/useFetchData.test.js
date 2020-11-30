import { renderHook, act } from '@testing-library/react-hooks'
import { cleanup} from '@testing-library/react';
import mockAxios from "axios";
import useFetchData from '../../hooks/useFetchData';

describe('useFetchData', () => {
  const jsonFile = "dictionary";
  const url = `https://tic-tac-toe-974b0.firebaseio.com/${jsonFile}.json`;
  const error = `Error while fetching the ${jsonFile}.json file from the Google Cloud`;

  afterEach(cleanup);

  test('fetching data does not result in an error', async () => {
    const dictionary = [{
      ENGLISH_HINT: "English",
      FRENCH_HINT : "French",
      SPANISH_HINT: "Spanish"
    }];
    const promise = Promise.resolve({data: dictionary});
    mockAxios.get.mockImplementationOnce(() => promise);

    await act(async () => renderHook(() => useFetchData(jsonFile) ));

    expect(mockAxios.get).toBeCalledTimes(1);
    expect(mockAxios.get).toBeCalledWith(url);
    expect(promise).resolves.toEqual({data: dictionary});
  })

  test('fetching data results in an error', async () => {
    const promise = Promise.reject(new Error(error));
    mockAxios.get.mockImplementationOnce(() => promise);

    await act(async () => renderHook(() => useFetchData(jsonFile) ));

    expect(mockAxios.get).toBeCalledTimes(1);
    expect(mockAxios.get).toBeCalledWith(url);
    expect(promise).rejects.toThrow(error);
  })

  test('set data and error accordingly when there was no error loading the dictionary.json file', async () => {
    const dictionary = [{
      ENGLISH_HINT: "English", 
      FRENCH_HINT:  "French", 
      SPANISH_HINT: "Spanish"
    }];
    const promise = Promise.resolve({data: dictionary});
    mockAxios.get.mockImplementationOnce(() => promise);
    let result;

    await act(async () => renderHook(() => {
      result = useFetchData(jsonFile);
      return result;
    }));

    expect(result.data).toEqual(dictionary);
    expect(result.error).toBe('');
  })

  test('set data and error accordingly when there was an error loading the dictionary.json file', async () => {
    const promise = Promise.reject(new Error(error));
    mockAxios.get.mockImplementationOnce(() => promise);
    let result;

    await act(async () => renderHook(() => {
      result = useFetchData(jsonFile);
      return result;
    }));

    expect(result.data).toBe('');
    expect(result.error).toBe(error);
  })

});