import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CategoryContext }   from '../../contexts/CategoryContext';
import Repository from '../../components/Repository/Repository';

jest.mock('../../components/Category/Category', () => () => <select />);

describe('Repository component', () => {
  let categories;
  let error;

  beforeEach(() => {
    categories = [{ folder: "habana"    },
                  { folder: "montreal"  },
                  { folder: "vancouver" },
                  { folder: "spain"     },
                  { folder: "germany"   },
                  { folder: "soccer"    },
                  { folder: "fruits"    },
                  { folder: "animals"   },
                  { folder: "puppies"   },
                  { folder: "seinfeld"  }];
    error = "";
  });

  afterEach(cleanup);

  const renderRepository = () => {
    return render(
        <CategoryContext.Provider value={{categories, error}}>
          <Repository/>
        </CategoryContext.Provider>
    );
  }

  test("renders the Repository component correctly", () => {
    const { asFragment } = renderRepository();
    expect(asFragment()).toMatchSnapshot();
  })

  test("categories are not fetched yet", () => {
    categories = "";
    const { queryByTestId } = renderRepository();

    expect(queryByTestId('repository')).toBeNull();
    expect(queryByTestId('loading')).not.toBeNull();
  })

  test("repository class name", () => {
    const { getByTestId } = renderRepository();
    expect(getByTestId('repository')).toHaveClass('repository');
  })
  
  test("repository-images class name", () => {
    const { getByTestId } = renderRepository();
    expect(getByTestId('images')).toHaveClass('repository-images');
  })

  test("error fetching the categories.json file", () => {
    categories = "";
    error = "Error while fetching the categories.json file from the Google Cloud";
    const { getByTestId, queryByTestId } = renderRepository();

    expect(queryByTestId('repository')).toBeNull();
    expect(getByTestId('error')).toHaveTextContent(error);
  })

  test("number of images", () => {
    const { getByTestId, getAllByTestId } = renderRepository();

    expect(getByTestId('images').children.length).toBe(20);
    expect(getAllByTestId('image').length).toBe(20);
  })

  test("images url", () => {
    const { getAllByTestId } = renderRepository();
    const images = getAllByTestId('image');
    const url = 'https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images';

    for (let i=0; i< images.length; i++){
      expect(images[i]).toHaveAttribute('src', expect.stringContaining(url));
    }
    
  })
});
