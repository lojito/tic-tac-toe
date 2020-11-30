import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useLocalStorage     from '../../hooks/useLocalStorage';
import types               from '../../reducers/types';

describe("Local Storage", () => {

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });

  afterEach(cleanup);

  test("should call getItem on render", () => {
    const { result } = renderHook(() => { 
      return useLocalStorage("testing", [])
    });

    expect(result.current.games).toEqual([]);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  })

  test("should call setItem on dispatching an action", () => {
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

    const { result } = renderHook(() => { 
      return useLocalStorage("testing", [])
    });

    act(() => {
      result.current.dispatch({type: types.ADD_GAME, game});
    })

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  })  
  
})
