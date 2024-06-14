import { useState } from 'react';

export default function GuessInput({ wordLength, onGuess, isGameActive }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guessedWord: inputValue }),
    });

    if (!response.ok) {
      console.error('Failed to get feedback', response);
      return;
    }

    const data = await response.json();
    onGuess(inputValue, data.feedback);
    console.log('data:', data);
    setInputValue('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          maxLength={wordLength}
          value={inputValue}
          onChange={handleChange}
          placeholder={`${wordLength} Letters`}
          disabled={!isGameActive}
        />
        <button type='submit' disabled={inputValue.length !== wordLength}>
          Guess
        </button>
      </form>
    </div>
  );
}
