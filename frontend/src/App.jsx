// Main component
import { useState, useEffect } from 'react';
import './App.css';

import GuessInput from './components/GuessInput';
import Letter from './components/Letter';
import WordLength from './components/WordLength';
import feedback from './feedbackAlgo';
import Modal from './components/Modal';

function App() {
  const [wordLength, setWordLength] = useState(5);
  const [secretWord, setSecretWord] = useState('HELLO');
  const [guessedWord, setGuessedWord] = useState('');
  const [lettersFeedback, setLettersFeedback] = useState(
    Array(wordLength).fill(null)
  );
  const [pastGuesses, setPastGuesses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleModalSubmit = (name) => {
    console.log(name);
    setShowModal(false);
  };

  useEffect(() => {
    if (lettersFeedback.every((feedback) => feedback === 'correct')) {
      setShowModal(true);
    }
  }, [lettersFeedback]);

  useEffect(() => {
    setLettersFeedback(Array(wordLength).fill(null));
    setPastGuesses([]);
  }, [wordLength]);

  const handleWordLengthChange = (newLength) => {
    setWordLength(newLength);
  };

  const handleGuess = (guessedWord) => {
    const feedbackResult = feedback(secretWord, guessedWord).map(
      (result) => result.result
    );
    setGuessedWord(guessedWord);
    setLettersFeedback(feedbackResult);
    setPastGuesses((pastGuesses) => [
      ...pastGuesses,
      { word: guessedWord, feedback: feedbackResult },
    ]);
  };

  const letterComponents =
    pastGuesses.length > 0
      ? pastGuesses[pastGuesses.length - 1].word
          .split('')
          .concat(Array(wordLength - guessedWord.length).fill(''))
          .map((letter, index) => (
            <Letter
              key={index}
              letter={letter}
              feedback={lettersFeedback[index]}
            />
          ))
      : null;

  const pastGuessesComponents =
    pastGuesses.length > 1
      ? pastGuesses.slice(0, -1).map((guess, index) => (
          <div key={index}>
            {guess.word.split('').map((letter, i) => (
              <Letter key={i} letter={letter} feedback={guess.feedback[i]} />
            ))}
          </div>
        ))
      : null;

  return (
    <>
      <h1>Wordle Game!</h1>

      <div>
        <p>The number of letters in the word</p>
        <div className='wordlength'>
          <WordLength onWordLengthChange={handleWordLengthChange} />
        </div>
        <div className='pastGuesses'>{pastGuessesComponents}</div>
        <div className='feedback'>{letterComponents}</div>
        <div className='guessInput'>
          <GuessInput
            key={wordLength}
            wordLength={wordLength}
            onGuess={handleGuess}
          />
        </div>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      </div>
    </>
  );
}

export default App;
