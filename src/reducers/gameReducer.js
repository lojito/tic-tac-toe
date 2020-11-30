import types from './types';

export const gameReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_GAME:
      action.game.id = ((state.length === 0)? 0 : state[state.length -1].id + 1);
      return [...state, action.game]
    case types.REMOVE_GAME:
      return state.filter(game => game.id !== action.id);  
    default:
      return state;
  }
}