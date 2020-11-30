import { NavLink }            from 'react-router-dom';
import React, { useContext }  from 'react';
import { DictionaryContext }  from '../../contexts/DictionaryContext';
import './Navigation.css';

const Navigation = () => {
  const { dictionary } = useContext(DictionaryContext);

  return dictionary ? (
    <nav>
      <input type="checkbox" id="menu" />
      <label className="mylabel" htmlFor="menu">
        <div id="burger-container">
          <div id="burger">
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>
        </div>
      </label> 
      <ul data-testid="nav" className='nav'>
        <li key='0'><NavLink data-testid="game" exact to={'/'}          >{dictionary.GAME}      </NavLink></li>
        <li key='1'><NavLink data-testid="history" exact to={'/history'}   >{dictionary.HISTORY}   </NavLink></li>
        <li key='2'><NavLink data-testid="repository" exact to={'/repository'}>{dictionary.REPOSITORY}</NavLink></li>
        <li key='3'><NavLink data-testid="about" exact to={'/about'}     >{dictionary.ABOUT}     </NavLink></li>
        <li key='4'><NavLink data-testid="contact" exact to={'/contact'}   >{dictionary.CONTACT}   </NavLink></li>
      </ul>
    </nav>
  ) : (null)
}

export default Navigation;