import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DictionaryContextProvider, { DictionaryContext } from '../../contexts/DictionaryContext';
import useFetchData from '../../hooks/useFetchData';
import * as constants from '../../Constants';

jest.mock('../../hooks/useFetchData');

const { ENGLISH, FRENCH } = constants;

afterEach(cleanup);

const renderTestComponent = (mockValue) => {
  useFetchData.mockReturnValue(mockValue);

  const TestComponent = () => {
    const { dictionary, error, changeLanguageHandler } = useContext(DictionaryContext);

    if (error){
      return <div className="error" data-testid="error">{error}</div>
    }

    return dictionary ? (
     <div>
         <div data-testid="vancouver">{dictionary['VANCOUVER_LANDMARKS']}</div>
         <button onClick={() => changeLanguageHandler(FRENCH)}>Change language</button>
      </div>
    ): (null)
  };

  return render(
    <DictionaryContextProvider>
      <TestComponent />
    </DictionaryContextProvider>
  );
}

test("loads dictionary without any error", () => {
  const mockValue = {
    data: [
      {VANCOUVER_LANDMARKS: "Vancouver landmarks"},
      {VANCOUVER_LANDMARKS: "Monuments de Vancouver"},
      {VANCOUVER_LANDMARKS: "Monumentos de Vancouver"}
    ],
    error: ''
  };
  const { getByTestId, queryByTestId } = renderTestComponent(mockValue);

  expect(getByTestId('vancouver')).toHaveTextContent(mockValue.data[ENGLISH]['VANCOUVER_LANDMARKS']);
  expect(queryByTestId('error')).toBeNull();  
})

test("change language from english to french", () => {
  const mockValue = {
    data: [
      {VANCOUVER_LANDMARKS: "Vancouver landmarks"},
      {VANCOUVER_LANDMARKS: "Monuments de Vancouver"},
      {VANCOUVER_LANDMARKS: "Monumentos de Vancouver"}
    ],
    error: ''
  };
  const { getByTestId, getByText } = renderTestComponent(mockValue);

  expect(getByTestId('vancouver')).toHaveTextContent(mockValue.data[ENGLISH]['VANCOUVER_LANDMARKS']);
  fireEvent.click(getByText('Change language'));
  expect(getByTestId('vancouver')).toHaveTextContent(mockValue.data[FRENCH]['VANCOUVER_LANDMARKS']);
})


test("error", () => {
  const mockValue = {
    data: [],
    error: 'Error while fetching the dictionary.json file from the Google Cloud'
  };
  const { getByTestId, queryByTestId } = renderTestComponent(mockValue); 

  expect(queryByTestId('vancouver')).toBeNull();
  expect(getByTestId('error')).toHaveTextContent(mockValue.error);
})