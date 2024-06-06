// Main component
import { useState, useEffect } from 'react';
import './App.css';

import GuessInput from './components/GuessInput';
import Letter from './components/Letter';
import WordLength from './components/WordLength';
import feedback from './feedbackAlgo';

function App() {
  const [wordLength, setWordLength] = useState(5);
  const [secretWord, setSecretWord] = useState('HELLO');
  const [guessedWord, setGuessedWord] = useState('');
  const [lettersFeedback, setLettersFeedback] = useState(
    Array(wordLength).fill(null)
  );

  useEffect(() => {
    setLettersFeedback(Array(wordLength).fill(null));
  }, [wordLength]);

  const handleWordLengthChange = (newLength) => {
    setWordLength(newLength);
  };

  const handleGuess = (guessedWord) => {
    setGuessedWord(guessedWord);
    const feedbackResult = feedback(secretWord, guessedWord).map(
      (result) => result.result
    );
    setLettersFeedback(feedbackResult);
  };

  const letterComponents = lettersFeedback.map((feedback, index) => (
    <Letter key={index} letter={guessedWord[index]} feedback={feedback} />
  ));

  return (
    <>
      <h1>Wordle Game!</h1>

      <div>
        <p>The number of letters in the word</p>
        <div>
          <WordLength onWordLengthChange={handleWordLengthChange} />
        </div>
        <div className='feedback'>{letterComponents}</div>
        <div className='guessInput'>
          <GuessInput
            key={wordLength}
            wordLength={wordLength}
            onGuess={handleGuess}
          />
        </div>
      </div>
    </>
  );
}

export default App;
