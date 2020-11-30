import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import useCategory from '../../hooks/useCategory';

describe('Category', () => {

  afterEach(cleanup);

  test('the default category', () => {
    const { result } = renderHook(() => useCategory());

    expect(result.current.category).toEqual({id: 0, folder: 'habana', name: 'HAVANA_LANDMARKS'});
  })

  test('changing the category', () => {
    const { result } = renderHook(() => useCategory())
    const newCategory = {id: 2, folder: 'vancouver', name: 'VANCOUVER_LANDMARKS'};

    act(() => {
      result.current.changeCategoryHandler(newCategory);
    })
   
    expect(result.current.category).toEqual(newCategory);
  })
})
