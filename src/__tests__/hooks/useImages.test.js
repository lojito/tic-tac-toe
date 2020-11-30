import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import useImages from '../../hooks/useImages';

describe('Images', () => {

  afterEach(cleanup);

  test('the default images', () => {
    const { result } = renderHook(() => useImages());
   
    expect(result.current.images).toEqual({user: 0, computer: 1});
  })

  test('changing images', () => {
    const { result } = renderHook(() => useImages())
    const newImages = {user: 2, computer: 3};

    act(() => {
      result.current.changeImagesHandler(newImages);
    })
   
    expect(result.current.images).toEqual(newImages);
  })

  test('random image', () => {
    const { result } = renderHook(() => useImages())
    let randomImage;

    act(() => {
      randomImage = result.current.randomImage();
    })
   
    expect(result.current.images.user).not.toEqual(randomImage);
    expect(result.current.images.computer).not.toEqual(randomImage);
  })

  test('refresh image user', () => {
    const { result } = renderHook(() => useImages())
    const user = result.current.images.user;
    const computer = result.current.images.computer;

    act(() => {
      result.current.refreshImageUser();
    })
   
    expect(result.current.images.user).not.toEqual(user);
    expect(result.current.images.computer).toEqual(computer);
  })

  test('refresh image computer', () => {
    const { result } = renderHook(() => useImages())
    const user = result.current.images.user;
    const computer = result.current.images.computer;

    act(() => {
      result.current.refreshImageComputer();
    })
   
    expect(result.current.images.user).toEqual(user);
    expect(result.current.images.computer).not.toEqual(computer);
  })
})