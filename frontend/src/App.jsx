import { useState } from 'react';
import './App.css';

import GuessCounter from './components/GuessCounter';
//import GuessFeedback from './components/GuessFeedback';
import GuessInput from './components/GuessInput';
import Letter from './components/Letter';
//import NewGame from './components/NewGame';
import TimeCounter from './components/TimeCounter';
import WordLength from './components/WordLength';

function App() {
  const [wordLength, setWordLength] = useState(5);

  const handleWordLengthChange = (length) => {
    setWordLength(length);
  };

  const letterComponents = Array.from({ length: wordLength }, (_, index) => (
    <Letter key={index} />
  ));

  return (
    <>
      <h1>Wordle Game!</h1>

      <p>Welcome to the wordle game!</p>
      <p>
        This is a simple game were you should try and guess the secret word. The
        secret word is randomized based of the number of letter you choose and
        as soon as you pick a new word, the timer will start
      </p>
      <div>
        <p>The number of letters in the word</p>
        <div>
          <WordLength onWordLengthChange={handleWordLengthChange} />
        </div>
        <div className='feedback'>{letterComponents}</div>
        <div className='guessInput'>
          <GuessInput wordLength={wordLength} />
        </div>
      </div>
      <div>
        <TimeCounter />
        <GuessCounter />
      </div>
    </>
  );
}

export default App;
