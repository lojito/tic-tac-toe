import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import Level from '../../components/Level/Level';
import { NORMAL } from '../../Constants';

describe('Level component', () => {
  let dictionary;
  let error;
  let changeLevelHandler;

  beforeEach(() => {
    dictionary = {LEVEL: "Level",
                  LEVEL_EASY: "Easy",
                  LEVEL_HARD: "Hard",
                  LEVEL_NORMAL: "Normal",
                  LEVEL_TOOLTIP: "How much thinking the computer does before playing."};
    error = '';
    changeLevelHandler = jest.fn();
  });

  afterEach(cleanup);

  const renderLevel = () => {
    return render(
      <DictionaryContext.Provider value={{dictionary, error}}>
        <Level onChangeLevel={changeLevelHandler}/>
      </DictionaryContext.Provider>
    );
  }

  test("renders the Level component correctly", () => {
    const { asFragment } = renderLevel();
    expect(asFragment()).toMatchSnapshot();
  })

  test("dictionary is not fetched yet", () => {
    dictionary = '';
    const { queryByTestId, getByTestId } = renderLevel();

    expect(getByTestId('loading')).toHaveTextContent('Loading the Level page...');
    expect(queryByTestId('level')).toBeNull();
  })

  test("dictionary was fetched", () => {
    const { getByTestId } = renderLevel();
    expect(getByTestId('level')).not.toBeNull();
    expect(getByTestId('level')).toHaveClass('level');
  })

  test("error fetching the dictionary.json file", () => {
    dictionary = '';
    error = "Error while fetching the dictionary.json file from the Google Cloud";
    const { getByTestId } = renderLevel();

    expect(getByTestId('error')).toHaveTextContent(error);
  })

  test("simulates selection", () => {
    const { getByTestId, getAllByTestId } = renderLevel();
    fireEvent.change(getByTestId('select'), { target: { value: NORMAL } });
    let options = getAllByTestId('select-option');
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
  })

  test("should change the current level", () => {
    const { getByTestId } = renderLevel();
    fireEvent.change(getByTestId('select'), { target: { value: NORMAL } });

    expect(changeLevelHandler).toHaveBeenCalledTimes(1);
    expect(changeLevelHandler).toHaveBeenCalledWith(NORMAL);
  });  
})