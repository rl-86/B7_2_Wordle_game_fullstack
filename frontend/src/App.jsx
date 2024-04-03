import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

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
      <div className='card'>
        <p>The number of letters in the word</p>
        <div>
          <button onChange={() => setCount((count) => count)}>{count}</button>
        </div>
        <button onClick={() => setCount((count) => count - 1)}>-</button>
        <button onClick={() => setCount((count) => count + 1)}>+</button>
        <button>Start</button>

        <div>Time: 00:00</div>
        <div>Guess: 0</div>
        <div></div>
        <div>
          <button>_</button>
          <button>_</button>
          <button>_</button>
          <button>_</button>
          <button>_</button>
        </div>
        <input type='text' />
      </div>
    </>
  );
}

export default App;
