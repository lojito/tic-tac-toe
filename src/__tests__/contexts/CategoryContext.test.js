import React, { useContext } from 'react';
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mockAxios from "axios";
import CategoryContextProvider, { CategoryContext } from '../../contexts/CategoryContext';

afterEach(cleanup);

const renderTestComponent = () => {
  const TestComponent = () => {
    const { categories } = useContext(CategoryContext);

    return (
     <div>
       { categories && (<div data-testid="categories">{categories.length}</div>) }
     </div>
    )
  };

  return render(
    <CategoryContextProvider>
      <TestComponent />
    </CategoryContextProvider>
  );
}

test("loads categories", async () => {
  const categories = [{id: 0, name: "HAVANA_LANDMARKS",    folder: "habana"    },
                      {id: 1, name: "MONTREAL_LANDMARKS",  folder: "montreal"  },
                      {id: 2, name: "VANCOUVER_LANDMARKS", folder: "vancouver" }];
  const promise = Promise.resolve({data: categories});
  mockAxios.get.mockImplementationOnce(() => promise);
  const { getByTestId } = renderTestComponent();
  await act(() => promise);
  
  expect(getByTestId('categories')).toHaveTextContent("3");
})