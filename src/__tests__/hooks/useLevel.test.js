import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { EASY, HARD } from '../../Constants';
import useLevel from '../../hooks/useLevel';

describe("Level", () => {

  afterEach(cleanup);

  test('the default level', () => {
    const { result } = renderHook(() => useLevel());
   
    expect(result.current.level).toBe(EASY);
  })

  test('changing the level', () => {
    const { result } = renderHook(() => useLevel());

    act(() => {
      result.current.changeLevelHandler(HARD);
    })

    expect(result.current.level).toEqual(HARD);
  })  
})