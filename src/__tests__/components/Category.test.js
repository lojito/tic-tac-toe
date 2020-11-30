import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CategoryContext }   from '../../contexts/CategoryContext';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import Category from '../../components/Category/Category';

describe('Category component', () => {
  let dictionary;
  let categories;
  let changeCategoryHandler;

  beforeEach(() => {
    dictionary = {ANIMALS:               "Animals",
                  FRUITS_AND_VEGETABLES: "Fruits & Vegetables", 
                  GERMANY_LANDMARKS:     "Germany landmarks", 
                  HAVANA_LANDMARKS:      "Havana landmarks", 
                  MONTREAL_LANDMARKS:    "Montreal landmarks", 
                  PUPPIES:               "Puppies", 
                  SEINFELD:              "Seinfeld", 
                  SOCCER_PLAYERS:        "Soccer players",
                  SPAIN_LANDMARKS:       "Spain landmarks",
                  VANCOUVER_LANDMARKS:   "Vancouver landmarks",
                  CATEGORY:              "Category"};

    categories = [{ id: 0, name: "HAVANA_LANDMARKS",      folder: "habana"    },
                  { id: 1, name: "MONTREAL_LANDMARKS",    folder: "montreal"  },
                  { id: 2, name: "VANCOUVER_LANDMARKS",   folder: "vancouver" },
                  { id: 3, name: "SPAIN_LANDMARKS",       folder: "spain"     },
                  { id: 4, name: "GERMANY_LANDMARKS",     folder: "germany"   },
                  { id: 5, name: "SOCCER_PLAYERS",        folder: "soccer"    },
                  { id: 6, name: "FRUITS_AND_VEGETABLES", folder: "fruits"    },
                  { id: 7, name: "ANIMALS",               folder: "animals"   },
                  { id: 8, name: "PUPPIES",               folder: "puppies"   },
                  { id: 9, name: "SEINFELD",              folder: "seinfeld"  }];

    changeCategoryHandler = jest.fn();
  });

  afterEach(cleanup);

  const renderCategory = () => {
    return render(
      <DictionaryContext.Provider value={{dictionary}}>
        <CategoryContext.Provider value={{categories}}>
          <Category onChangeCategory={changeCategoryHandler} />
        </CategoryContext.Provider>
      </DictionaryContext.Provider>
    );
  }

  test("renders the Category component correctly", () => {
    const { asFragment } = renderCategory();
    expect(asFragment()).toMatchSnapshot();
  })

  test("dictionary and category are not fetched yet", () => {
    dictionary = '';
    categories = '';
    const { queryByTestId } = renderCategory();
    expect(queryByTestId('categories')).toBeNull();
  })

  test("dictionary is not fetched yet but category is", () => {
    dictionary = '';
    const { queryByTestId } = renderCategory();
    expect(queryByTestId('categories')).toBeNull();
  })

  test("category is not fetched yet but dictionary is", () => {
    categories = '';
    const { queryByTestId } = renderCategory();
    expect(queryByTestId('categories')).toBeNull();
  })

  test("categories class", () => {
    const { getByTestId } = renderCategory();
    expect(getByTestId('categories')).toHaveClass('categories');
  })

  test("category description", () => {
    const { getByTestId } = renderCategory();
    expect(getByTestId('description')).toHaveTextContent(dictionary['CATEGORY']);
  })
  
  test("simulates selection", () => {
    const { getByTestId, getAllByTestId } = renderCategory();
    fireEvent.change(getByTestId('select'), { target: { value: 2 } });
    let options = getAllByTestId('select-option');
    
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();
    expect(options[5].selected).toBeFalsy();
    expect(options[6].selected).toBeFalsy();
    expect(options[7].selected).toBeFalsy();
    expect(options[8].selected).toBeFalsy();
    expect(options[9].selected).toBeFalsy();
  })

  test("should change the current category", () => {
    const { getByTestId } = renderCategory();
    fireEvent.change(getByTestId('select'), { target: { value: 2 } });

    expect(changeCategoryHandler).toHaveBeenCalledTimes(1);
    expect(changeCategoryHandler).toHaveBeenCalledWith(categories[2]);
  });  
});
