import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { USER, COMPUTER } from '../../Constants';
import useFirst from '../../hooks/useFirst';

describe('First', () => {
  
  afterEach(cleanup);

  test('the default game starting player', () => {
    const { result } = renderHook(() => useFirst());
   
    expect(result.current.first).toBe(USER);
  })

  test('changing the game starting player', () => {
    const { result } = renderHook(() => useFirst());
    act(() => {
      result.current.changeFirstHandler(COMPUTER);
    })
   
    expect(result.current.first).toEqual(COMPUTER);
  })  
})