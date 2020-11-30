import React from 'react';
import useLanguage from '../../hooks/useLanguage';
import {render, act, cleanup} from '@testing-library/react';
import { ENGLISH, FRENCH } from '../../Constants';

describe('useLanguage', () => {
  let language, changeLanguageHandler;

  afterEach(cleanup);
  
  const renderHook = (lang = '') => {
    function HookWrapper(){
      [language, changeLanguageHandler] = useLanguage();
      return null;
    }

    function HookWithLanguageWrapper(){
      [language, changeLanguageHandler] = useLanguage(lang);
      return null;
    }

    if (lang === ''){
      render(<HookWrapper/>);
    } else {
      render(<HookWithLanguageWrapper/>)
    }
  }

  test("the default language", () => {
    renderHook();
    expect(language).toBe(ENGLISH);
  })

  test("setting the language", () => {
    renderHook(FRENCH);
    expect(language).toBe(FRENCH);
  })

  test("changing the language", () => {
    renderHook();
    act(() => { 
      changeLanguageHandler(FRENCH);
    });  
    expect(language).toBe(FRENCH);
  })
});