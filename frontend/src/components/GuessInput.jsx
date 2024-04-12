import { useState } from 'react';

export default function GuessInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleGuess = (event) => {
    event.preventDefault();
    console.log('Guess:', inputValue.toUpperCase());
    setInputValue('');
  };

  return (
    <div>
      <form onSubmit={handleGuess}>
        <input
          type='text'
          value={inputValue}
          onChange={handleChange}
          placeholder='Your Guess'
        />
        <button type='submit'>Guess</button>
      </form>
    </div>
  );
}
