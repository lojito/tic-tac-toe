import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GameContextProvider              from './contexts/GameContext';
import DictionaryContextProvider        from './contexts/DictionaryContext';
import CategoryContextProvider          from './contexts/CategoryContext';
import Header                           from './components/Header/Header';
import Navigation                       from './components/Navigation/Navigation';
import Game                             from './components/Game/Game';
import History                          from './components/Game/History';
import GameHistory                      from './components/Game/GameHistory';
import Repository                       from './components/Repository/Repository';
import About                            from './components/About/About';
import Contact                          from './components/Contact/Contact';

function App() {
  return (
    <DictionaryContextProvider>
      <GameContextProvider>
        <CategoryContextProvider>
          <BrowserRouter basename="/tic-tac-toe">
            <div className='header'>
              <Header/>
              <Navigation/>
            </div>
            <Switch>
              <Route path="/"           exact component={Game}/>
              <Route path="/history"    exact component={History}/>
              <Route path="/repository" exact component={Repository}/>
              <Route path="/about"      exact component={About}/>
              <Route path="/contact"    exact component={Contact}/>
              <Route path="/:id"        exact component={GameHistory}/>
            </Switch>
          </BrowserRouter>
        </CategoryContextProvider>
      </GameContextProvider>
    </DictionaryContextProvider>
  )
}

export default App;
