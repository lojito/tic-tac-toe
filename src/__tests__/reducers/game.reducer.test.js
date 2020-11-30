import '@testing-library/jest-dom/extend-expect';
import { gameReducer } from '../../reducers/gameReducer';
import types from '../../reducers/types';

describe('game reducer', () => {
  const game = {
    board: [2, 0, 0, 2, 0, 1, 2, 1, 0],
    categoryId: 0,
    first: 2,
    imageComputer: 1,
    imageUser: 0,
    level: 1,
    result: 1,
    winners: [0, 3, 6]
  }

  test('should return the initial state', () => {
    const initialState = [];
    expect(gameReducer(initialState, {})).toEqual(initialState);
  });

  test('should handle ADD_GAME', () => {
    const initialState = [];

    expect(gameReducer(initialState, { type: types.ADD_GAME, game })).toEqual([{
        id: 0,
        ...game
      },
      ...initialState,
    ]);
  });

  test('should handle REMOVE_GAME', () => {
      const initialState = [{
        id: 0,
        ...game
      }];    
      expect(gameReducer(initialState, {
          type: types.REMOVE_GAME,
          id: 0,
      }))
      .toEqual([]);
  });

});
