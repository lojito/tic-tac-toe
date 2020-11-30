import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Navigation from '../../components/Navigation/Navigation';

describe('Navigation component', () => {
  let dictionary;
  let history;

  beforeEach(() => {
    dictionary = {GAME:       "Game",
                  HISTORY:    "Historical",
                  REPOSITORY: "Repository",
                  ABOUT:      "About",
                  CONTACT:    "Contact"};
  });

  afterEach(cleanup);

  const renderNavigation = () => {
    history = createMemoryHistory();
    history.push = jest.fn();
    
    return render(
      <DictionaryContext.Provider value={{dictionary}}>
        <Router history={history}>
          <Navigation/>
        </Router>
      </DictionaryContext.Provider>
    );
  }

  test("renders the Navigation component correctly", () => {
    const { asFragment } = renderNavigation();
    expect(asFragment()).toMatchSnapshot();
  })

  test("nav", () => {
    const { getByTestId } = renderNavigation();
    expect(getByTestId('nav')).toHaveClass('nav');
  })

  test("game description", () => {
    const { getByTestId } = renderNavigation();
    expect(getByTestId('game')).toHaveTextContent('Game');
  })

  test("historical description", () => {
    const { getByTestId } = renderNavigation();
    expect(getByTestId('history')).toHaveTextContent('Historical');
  })

  test("repository description", () => {
    const { getByTestId } = renderNavigation();
    expect(getByTestId('repository')).toHaveTextContent('Repository');
  })

  test("about description", () => {
    const { getByTestId } = renderNavigation();
    expect(getByTestId('about')).toHaveTextContent('About');
  })

  test("contact description", () => {
    const { getByTestId } = renderNavigation();
    expect(getByTestId('contact')).toHaveTextContent('Contact');
  })

  test("routes to the Game component", () => {
    const { getByTestId } = renderNavigation();
    fireEvent.click(getByTestId('game'));
    expect(history.push).toHaveBeenCalledWith({hash: "", pathname: "/", search: "", state: null});
    expect(getByTestId('game')).toHaveAttribute('href', '/');
  });

  test("routes to the History component", () => {
    const { getByTestId } = renderNavigation();
    fireEvent.click(getByTestId('history'));
    expect(history.push).toHaveBeenCalledWith({hash: "", pathname: "/history", search: "", state: null});
    expect(getByTestId('history')).toHaveAttribute('href', '/history');
  });

  test("routes to the Repository component", () => {
    const { getByTestId } = renderNavigation();
    fireEvent.click(getByTestId('repository'));
    expect(history.push).toHaveBeenCalledWith({hash: "", pathname: "/repository", search: "", state: null});
    expect(getByTestId('repository')).toHaveAttribute('href', '/repository');
  });


  test("routes to the About component", () => {
    const { getByTestId } = renderNavigation();
    fireEvent.click(getByTestId('about'));
    expect(history.push).toHaveBeenCalledWith({hash: "", pathname: "/about", search: "", state: null});
    expect(getByTestId('about')).toHaveAttribute('href', '/about');
  });
  
  test("routes to the Contact component", () => {
    const { getByTestId } = renderNavigation();
    fireEvent.click(getByTestId('contact'));
    expect(history.push).toHaveBeenCalledWith({hash: "", pathname: "/contact", search: "", state: null});
    expect(getByTestId('contact')).toHaveAttribute('href', '/contact');
  });
})