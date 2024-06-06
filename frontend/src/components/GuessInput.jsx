// GuessInput component to handle the user input
import { useState } from 'react';

export default function GuessInput({ wordLength, onGuess }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGuess = (event) => {
    event.preventDefault();
    if (inputValue.length === wordLength) {
      onGuess(inputValue.toUpperCase());
      setInputValue('');
    }
  };

  return (
    <div>
      <form onSubmit={handleGuess}>
        <input
          type='text'
          maxLength={wordLength}
          value={inputValue}
          onChange={handleChange}
          placeholder={`${wordLength} Letters`}
        />
        <button type='submit' disabled={inputValue.length !== wordLength}>
          Guess
        </button>
      </form>
    </div>
  );
}
// end of GuessInput.jsx
