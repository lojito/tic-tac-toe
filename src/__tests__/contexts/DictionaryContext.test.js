import React, { useContext } from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mockAxios from "axios";
import DictionaryContextProvider, { DictionaryContext } from '../../contexts/DictionaryContext';
import * as constants from '../../Constants';

const { ENGLISH, FRENCH } = constants;
let dictionary;
let promise;

beforeEach(() => {
  dictionary = [
    {VANCOUVER_LANDMARKS: "Vancouver landmarks"},
    {VANCOUVER_LANDMARKS: "Monuments de Vancouver"},
    {VANCOUVER_LANDMARKS: "Monumentos de Vancouver"}];
  promise = Promise.resolve({data: dictionary});
  mockAxios.get.mockImplementationOnce(() => promise);
});

afterEach(cleanup);

const renderTestComponent = () => {
  const TestComponent = () => {
    const { dictionary, changeLanguageHandler } = useContext(DictionaryContext);

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

test("loads dictionary", async () => {
  const { getByTestId } = renderTestComponent();
  await act(() => promise);

  expect(getByTestId('vancouver')).toHaveTextContent(dictionary[ENGLISH]['VANCOUVER_LANDMARKS']);
})

test("change language from english to french", async () => {
  const { getByTestId, getByText } = renderTestComponent();
  await act(() => promise);

  expect(getByTestId('vancouver')).toHaveTextContent(dictionary[ENGLISH]['VANCOUVER_LANDMARKS']);
  fireEvent.click(getByText('Change language'));
  expect(getByTestId('vancouver')).toHaveTextContent(dictionary[FRENCH]['VANCOUVER_LANDMARKS']);
})