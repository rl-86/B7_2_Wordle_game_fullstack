import React from 'react';

export default function WordLength({ onWordLengthChange, onStartGame }) {
  const handleDecreaseLength = () => {
    onWordLengthChange((prevLength) => Math.max(4, prevLength - 1));
  };

  const handleIncreaseLength = () => {
    onWordLengthChange((prevLength) => Math.min(6, prevLength + 1));
  };

  const handleStartGame = () => {
    onStartGame();
  };

  return (
    <>
      <button onClick={handleDecreaseLength}>-</button>
      <button onClick={handleIncreaseLength}>+</button>
      <button onClick={handleStartGame}>Start Game</button>
    </>
  );
}
