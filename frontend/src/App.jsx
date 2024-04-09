import { useState } from 'react';
import './App.css';
import Letter from './components/Letter';
import TimeCounter from './components/TimeCounter';
import GuessCounter from './components/GuessCounter';
import GuessInput from './components/GuessInput';
import WordLength from './components/WordLength';

function App() {
  const [count, setCount] = useState(0);

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
          <WordLength />
          <button>Start</button>
        </div>
        <div>
          <Letter />
          <Letter />
          <Letter />
          <Letter />
          <Letter />
        </div>
        <GuessInput />
        <button>Guess</button>
      </div>
      <div>
        <TimeCounter />
        <GuessCounter />
      </div>
    </>
  );
}

export default App;
