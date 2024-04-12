import React from 'react';

export default function WordLength({ onWordLengthChange }) {
  const handleDecreaseLength = () => {
    onWordLengthChange((prevLength) => Math.max(3, prevLength - 1));
  };

  const handleIncreaseLength = () => {
    onWordLengthChange((prevLength) => Math.min(10, prevLength + 1));
  };

  return (
    <>
      <button onClick={handleDecreaseLength}>-</button>
      <button onClick={handleIncreaseLength}>+</button>
      <button>Start Game</button>
    </>
  );
}
