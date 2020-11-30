import React, { useContext } from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameContextProvider, { GameContext } from '../../contexts/GameContext';

afterEach(cleanup);

const renderTestComponent = (jsonGames) => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => jsonGames),
      setItem: jest.fn(() => null)
    },
    writable: true
  });

  const TestComponent = () => {
    const { games, getGame } = useContext(GameContext);

    if (games.length){
      const {categoryId, imageUser, imageComputer, first, level, board: players, winners, result } = getGame(0);

      return (
        <div>
           <div data-testid="categoryId">{categoryId}</div>
           <div data-testid="imageUser">{imageUser}</div>
           <div data-testid="imageComputer">{imageComputer}</div>
           <div data-testid="first">{first}</div>
           <div data-testid="level">{level}</div>
           <div data-testid="players">{players}</div>
           <div data-testid="winners">{winners}</div>
           <div data-testid="result">{result}</div>
        </div>
      )

    } else {
      return (
        <div data-testid="games">There is no historical data yet. Play some games and comeback.</div>
      )
    }

  };

  return render(
    <GameContextProvider>
      <TestComponent />
    </GameContextProvider>
  );
}

test("local storage json file is empty", async () => {
  const games = '[]';  
  const { getByTestId } = renderTestComponent(games);
  
  expect(getByTestId('games')).toHaveTextContent("There is no historical data yet. Play some games and comeback.");
})


test("local storage json file is not empty", async () => {
  const jsonGames = `[{
    "id":0,
    "categoryId":0,
    "imageUser":13,
    "imageComputer":11,
    "first":2,
    "level":1,
    "board":[2,0,0,2,1,0,2,0,1],
    "winners":[0,3,6],
    "result":1
  }]`;
  const { getByTestId } = renderTestComponent(jsonGames);
  const games = JSON.parse(jsonGames);

  expect(getByTestId('categoryId')).toHaveTextContent(games[0].id);
  expect(getByTestId('imageUser')).toHaveTextContent(games[0].imageUser);
  expect(getByTestId('imageComputer')).toHaveTextContent(games[0].imageComputer);
  expect(getByTestId('first')).toHaveTextContent(games[0].first);
  expect(getByTestId('level')).toHaveTextContent(games[0].level);
  expect(getByTestId('players')).toHaveTextContent(games[0].board.join(''));
  expect(getByTestId('winners')).toHaveTextContent(games[0].winners.join(''));
  expect(getByTestId('result')).toHaveTextContent(games[0].result);
})