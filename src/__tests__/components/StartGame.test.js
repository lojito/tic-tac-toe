import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import StartGame from '../../components/StartGame/StartGame';
import { USER, COMPUTER }    from '../../Constants';

describe('StartGame component', () => {
  let dictionary;
  let error;
  let playerChangeHandler;

  beforeEach(() => {
    dictionary = {START: "You Start",
                  START_TOOLTIP: "Who starts playing the game: You or the computer?",
                  YES: "Yes",
                  NO: "No"};
    error = '';
    playerChangeHandler = jest.fn();
  });

  afterEach(cleanup);

  const renderStartGame = () => {
    return render(
      <DictionaryContext.Provider value={{dictionary, error}}>
        <StartGame onChangePlayer={playerChangeHandler}/>
      </DictionaryContext.Provider>
    );
  }

  test("renders the StartGame component correctly", () => {
    const { asFragment } = renderStartGame();
    expect(asFragment()).toMatchSnapshot();
  })

  test("dictionary is not fetched yet", () => {
    dictionary = '';
    const { queryByTestId, getByTestId } = renderStartGame();

    expect(getByTestId('loading')).toHaveTextContent('Loading the StartGame page...');
    expect(queryByTestId('startgame')).toBeNull();
  })

  test("dictionary was fetched", () => {
    const { getByTestId } = renderStartGame();
    expect(getByTestId('startgame')).not.toBeNull();
    expect(getByTestId('startgame')).toHaveClass('start');
  })

  test("error fetching the dictionary.json file", () => {
    dictionary = '';
    error = "Error while fetching the dictionary.json file from the Google Cloud";
    const { getByTestId } = renderStartGame();

    expect(getByTestId('error')).toHaveTextContent(error);
  })

  test("simulates selection", () => {
    const { getByTestId, getAllByTestId } = renderStartGame();
    fireEvent.change(getByTestId('select'), { target: { value: COMPUTER } });
    let options = getAllByTestId('select-option');
    
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
  })

  test("should change the current starting player", () => {
    const { getByTestId } = renderStartGame();
    fireEvent.change(getByTestId('select'), { target: { value: COMPUTER } });

    expect(playerChangeHandler).toHaveBeenCalledTimes(1);
    expect(playerChangeHandler).toHaveBeenCalledWith(COMPUTER);
  });   
})