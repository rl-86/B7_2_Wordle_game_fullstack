import React, { useState, useRef, useEffect } from 'react';

function Modal({ isOpen, onClose, onSubmit, guessedWord, guessCount, time }) {
  const [name, setName] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length >= 2 && name.length <= 20) {
      onSubmit(name);
      setName('');
    }
  };

  const handleClose = () => {
    onClose();
    setName('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='modal'>
      <h2>You guessed the correct word: {guessedWord.toUpperCase()}</h2>
      <p>Your time: {time.toFixed(1)} seconds</p>
      <p>Number of guesses: {guessCount}</p>
      <p>Submit your name to the highscore list</p>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          label='name'
          type='text'
          placeholder='Enter your name'
          value={name}
          onChange={(event) => setName(event.target.value)}
          minLength='2'
          maxLength='20'
        />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={handleClose}>Close</button>
    </div>
  );
}

export default Modal;
