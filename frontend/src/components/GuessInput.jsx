import { useState } from 'react';

export default function GuessInput({ wordLength }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGuess = async (event) => {
    event.preventDefault();
    console.log('Guess:', inputValue.toUpperCase());
    setInputValue('');
    try {
      const response = await fetch('https://localhost:5001/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Unable to fetch data from API');
      }

      console.log('Data successfully sent to API');
    } catch (error) {
      console.error('Error:', error.message);
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
        <button type='submit'>Guess</button>
      </form>
    </div>
  );
}
