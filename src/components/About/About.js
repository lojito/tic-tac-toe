import React, { useContext, useEffect } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext';
import './About.css'

const About = () => {

  const { dictionary, error } = useContext(DictionaryContext);  

  const techStack= [
    { name: 'React.js',                 url: 'https://reactjs.org/'                                                  },
    { name: 'React Hooks',              url: 'https://reactjs.org/docs/hooks-intro.html'                             },
    { name: 'Context API',              url: 'https://reactjs.org/docs/context.html'                                 },
    { name: 'Local Storage',            url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'  },
    { name: 'Javascript',               url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'               },
    { name: 'ES6',                      url: 'http://es6-features.org'                                               },
    { name: 'Firebase',                 url: 'https://firebase.google.com/docs'                                      },
    { name: 'HTML5',                    url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5'         },
    { name: 'CSS3',                     url: 'https://www.w3.org/TR/selectors-3/'                                    },
    { name: 'Jest',                     url: 'https://jestjs.io/'                                                    },
    { name: 'React Testing Library ',   url: 'https://testing-library.com/docs/react-testing-library/intro/'         }
  ];
  
  const techStackLi = techStack.map((tech, key) => {
    return (
      <li key={key}><a target="_blank" href={tech.url} rel="noopener noreferrer">{tech.name}</a></li>
    )
  });

  const source = 'https://github.com/lojito/tic-tac-toe';

  const games  = [
    { name: 'Puzzle (Angular)',                         url: 'https://github.com/lojito/puzzle'               },
    { name: 'Matching pairs (Vue.js)',                  url: 'https://github.com/lojito/matching-pairs'       },
    { name: 'Tic-tac-toe (Python)',                     url: 'https://github.com/lojito/python-tic-tac-toe'   },
    { name: 'Tic-tac-toe 4x4 (Django)',                 url: 'https://github.com/lojito/django-tictactoe'     },
    { name: 'UEFA Champions League (C)',                url: 'https://github.com/lojito/c_champions_league'   },
    { name: 'Bubble sort sorting algorithm (Assembly)', url: 'https://github.com/lojito/assembly-bubble-sort' }
  ];  

  const gamesLi = games.map((game, key) => {
    return (
      <li key={key}><a target="_blank" href={game.url} rel="noopener noreferrer">{game.name}</a></li>
    )
  });

  useEffect(() => {
    return () => {
      const chk = document.querySelector('input#menu');
      if (chk){
        chk.checked = false;
      }
    }
  });

  if (error){
    return <div className="error" data-testid="error">{error}</div>
  }

  return dictionary ? (
    <div className="about" data-testid="about">
      <div>
        <span data-testid="gameWrittenWith">{dictionary.GAME_WRITTEN_WITH}</span>
        <ul data-testid="techStack">
          {techStackLi}
        </ul>  
      </div> 
      <div>
        <span data-testid="sourceCode">{dictionary.SOURCE_CODE}</span>&nbsp;
        <ul data-testid="source">
          <li>
            <a target="_blank" href={source} rel="noopener noreferrer">{source}</a>
          </li>
        </ul>
      </div>
      <span data-testid="otherGames">{dictionary.OTHER_GAMES}</span>
      <ul data-testid="games">
        {gamesLi}
      </ul>
    </div>
  ) : (
    <div className="loading" data-testid="loading">Loading the About page...</div>
  )

} 

export default About;
