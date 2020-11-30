import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import About from '../../components/About/About';

describe('About component', () => {
  let dictionary;
  let error;

  beforeEach(() => {
    dictionary = {GAME_WRITTEN_WITH : "This game has been developed with:",
                  SOURCE_CODE       : "Source Code:",
                  OTHER_GAMES       : "Other projects:"};
    error = '';
  });

  afterEach(cleanup);

  const renderAbout = () => {
    return render(
      <DictionaryContext.Provider value={{dictionary, error}}>
        <About/>
      </DictionaryContext.Provider>
    );
  }

  test("renders the About component correctly", () => {
    const { asFragment } = renderAbout();
    expect(asFragment()).toMatchSnapshot();
  })

  test("dictionary is not fetched yet", () => {
    dictionary = '';
    const { queryByTestId, getByTestId } = renderAbout();

    expect(getByTestId('loading')).toHaveTextContent('Loading the About page...');
    expect(queryByTestId('about')).toBeNull();
  })

  test("dictionary was fetched", () => {
    const { getByTestId } = renderAbout();
    expect(getByTestId('about')).not.toBeNull();
    expect(getByTestId('about')).toHaveClass('about');
  })

  test("error fetching the dictionary.json file", () => {
    dictionary = '';
    error = "Error while fetching the dictionary.json file from the Google Cloud";
    const { getByTestId } = renderAbout();

    expect(getByTestId('error')).toHaveTextContent(error);
  })

  test("GAME_WRITTEN_WITH, SOURCE_CODE and OTHER_GAMES descriptions", () => {
    const { getByTestId } = renderAbout();

    expect(getByTestId('gameWrittenWith')).toHaveTextContent(dictionary['GAME_WRITTEN_WITH']);
    expect(getByTestId('sourceCode')).toHaveTextContent(dictionary['SOURCE_CODE']);
    expect(getByTestId('otherGames')).toHaveTextContent(dictionary['OTHER_GAMES']);
  })

  test("techStack", () => {
    const { getByTestId } = renderAbout();

    expect(getByTestId('techStack').children.length).toBe(11);
  })

  test("source", () => {
    const { getByTestId } = renderAbout();

    expect(getByTestId('source')).toHaveTextContent('https://github.com/lojito/tic-tac-toe');
  })  

  test("games", () => {
    const { getByTestId } = renderAbout();

    expect(getByTestId('games').children.length).toBe(6);
  })  
})