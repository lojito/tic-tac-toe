import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import Contact from '../../components/Contact/Contact';

describe('Contact component', () => {
  let dictionary;
  let error;

  beforeEach(() => {
    dictionary = {AUTHOR:   "Author:",
                  EMAIL:    "E-mail:",
                  GITHUB:   "Github:",
                  LINKEDIN: "LinkedIn:"};
    error = '';
  });

  afterEach(cleanup);

  const renderContact = () => {
    return render(
      <DictionaryContext.Provider value={{dictionary, error}}>
        <Contact/>
      </DictionaryContext.Provider>
    );
  }

  test("renders the Contact component correctly", () => {
    const { asFragment } = renderContact();
    expect(asFragment()).toMatchSnapshot();
  })

  test("dictionary is not fetched yet", () => {
    dictionary = '';
    const { queryByTestId, getByTestId } = renderContact();

    expect(getByTestId('loading')).toHaveTextContent('Loading the Contact page...');
    expect(queryByTestId('contact')).toBeNull();
  })

  test("dictionary was fetched", () => {
    const { getByTestId } = renderContact();
    expect(getByTestId('contact')).not.toBeNull();
    expect(getByTestId('contact')).toHaveClass('contact');
  })

  test("error fetching the dictionary.json file", () => {
    dictionary = '';
    error = "Error while fetching the dictionary.json file from the Google Cloud";
    const { getByTestId } = renderContact();

    expect(getByTestId('error')).toHaveTextContent(error);
  })

  test("AUTHOR, EMAIL, GITHUB and LINKEDIN descriptions", () => {
    const { getByTestId } = renderContact();

    expect(getByTestId('authorDescription')).toHaveTextContent(dictionary['AUTHOR']);
    expect(getByTestId('emailDescription')).toHaveTextContent(dictionary['EMAIL']);
    expect(getByTestId('githubDescription')).toHaveTextContent(dictionary['GITHUB']);
    expect(getByTestId('linkedinDescription')).toHaveTextContent(dictionary['LINKEDIN']);
  })

  test("AUTHOR, EMAIL, GITHUB and LINKEDIN", () => {
    const { getByTestId } = renderContact();

    const contact = {
      author:   'Livan Ojito Villanueva',
      email :   'livanojito@gmail.com',
      github:   'https://github.com/lojito',
      linkedin: 'https://ca.linkedin.com/in/lov'
    };

    expect(getByTestId('author')).toHaveTextContent(contact.author);
    expect(getByTestId('email')).toHaveTextContent(contact.email);
    expect(getByTestId('github')).toHaveTextContent(contact.github);
    expect(getByTestId('linkedin')).toHaveTextContent(contact.linkedin);
  })  
})