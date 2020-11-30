import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import Header from '../../components/Header/Header';
import { ENGLISH, FRENCH, SPANISH } from '../../Constants';

describe('Header component', () => {
  let dictionary;
  let changeLanguageHandler;

  beforeEach(() => {
    dictionary = {ENGLISH_HINT: "English", 
                  FRENCH_HINT:  "French" , 
                  SPANISH_HINT: "Spanish"};
    changeLanguageHandler = jest.fn();
  });

  afterEach(cleanup);

  const renderHeader = () => {
    return render(
      <DictionaryContext.Provider value={{dictionary, changeLanguageHandler}}>
        <Header/>
      </DictionaryContext.Provider>
    );
  }

  test("renders the Header component correctly", () => {
    const { asFragment } = renderHeader();
    expect(asFragment()).toMatchSnapshot();
  })

  test("images's wrapper has the flags class", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('flags')).toHaveClass('flags');
  })

  test("dictionary is not fetched yet", () => {
    dictionary = '';
    const { queryByTestId } = renderHeader();
    expect(queryByTestId('flags')).toBeNull();
  })

  test("renders english image element", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('flags')).toContainElement(getByTestId('english'));
  })

  test("renders french image element", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('flags')).toContainElement(getByTestId('french'));
  })

  test("renders spanish image element", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('flags')).toContainElement(getByTestId('spanish'));
  })

  test("english image element alt attribute and value", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('english')).toHaveAttribute('alt', dictionary.ENGLISH_HINT);
  })

  test("french image element alt attribute and value", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('french')).toHaveAttribute('alt', dictionary.FRENCH_HINT);
  })

  test("spanish image element alt attribute and value", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('spanish')).toHaveAttribute('alt', dictionary.SPANISH_HINT);
  })

  test("english image element title attribute and value", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('english')).toHaveAttribute('title', dictionary.ENGLISH_HINT);
  })

  test("french image element title attribute and value", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('french')).toHaveAttribute('title', dictionary.FRENCH_HINT);
  })

  test("spanish image element title attribute and value", () => {
    const { getByTestId } = renderHeader();
    expect(getByTestId('spanish')).toHaveAttribute('title', dictionary.SPANISH_HINT);
  })

  test("should change the language to english", () => {
    const { getByTestId } = renderHeader();
    fireEvent.click(getByTestId('english'));

    expect(changeLanguageHandler).toHaveBeenCalledTimes(1);
    expect(changeLanguageHandler).toHaveBeenCalledWith(ENGLISH);
  });

  test("should change the language to french", () => {
    const { getByTestId } = renderHeader();
    fireEvent.click(getByTestId('french'));

    expect(changeLanguageHandler).toHaveBeenCalledTimes(1);
    expect(changeLanguageHandler).toHaveBeenCalledWith(FRENCH);
  });

  test("should change the language to spanish", () => {
    const { getByTestId } = renderHeader();
    fireEvent.click(getByTestId('spanish'));

    expect(changeLanguageHandler).toHaveBeenCalledTimes(1);
    expect(changeLanguageHandler).toHaveBeenCalledWith(SPANISH);
  });  
});