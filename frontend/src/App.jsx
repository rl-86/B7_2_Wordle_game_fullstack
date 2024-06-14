import './App.css';
import { useState, useEffect, useRef } from 'react';
import GuessInput from './components/GuessInput';
import Letter from './components/Letter';
import Modal from './components/Modal';
import Timer from './components/Timer';
import WordLength from './components/WordLength';

function App() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [wordLength, setWordLength] = useState(5);
  const [guessedWord, setGuessedWord] = useState('');
  const [lettersFeedback, setLettersFeedback] = useState(
    Array(wordLength).fill(null)
  );
  const [pastGuesses, setPastGuesses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [guessCount, setGuessCount] = useState(0);

  const handleModalSubmit = (name) => {
    console.log(name);
    const time = Date.now() - startTime;
    onSubmit({ name, time, guessCount, wordLength });

    setShowModal(false);
  };

  const handleStartGame = async () => {
    const response = await fetch(`/api/word/${wordLength}`);
    const data = await response.json();
    setIsGameActive(true);
    setGuessedWord('');
    setLettersFeedback(Array(wordLength).fill(null));
    setPastGuesses([]);
    setShowModal(false);
    setStartTime(Date.now());
    setGuessCount(0);
  };

  useEffect(() => {
    if (lettersFeedback.every((feedback) => feedback === 'correct')) {
      setEndTime(Date.now());
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

  const handleGuess = async (guessedWord, feedbackResult) => {
    if (!Array.isArray(feedbackResult)) {
      console.error('feedbackResult must be an array');
      return;
    }
    setGuessedWord(guessedWord);
    setLettersFeedback(feedbackResult.map((result) => result.result));
    setPastGuesses((pastGuesses) => [
      ...pastGuesses,
      {
        word: guessedWord,
        feedback: feedbackResult.map((result) => result.result),
      },
    ]);
    setGuessCount(guessCount + 1);
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
      <h1 className='headline'>Guess the word game! (Wordle)</h1>
      <div>
        <p>The number of letters in the word</p>
        <div className='wordlength'>
          <WordLength
            onWordLengthChange={handleWordLengthChange}
            onStartGame={handleStartGame}
          />
        </div>
        <div className='pastGuesses'>{pastGuessesComponents}</div>
        <div className='feedback'>{letterComponents}</div>
        <div className='guessInput'>
          <GuessInput
            key={wordLength}
            wordLength={wordLength}
            onGuess={handleGuess}
            isGameActive={isGameActive}
          />
        </div>
        <Timer startTime={startTime} endTime={endTime} />
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
