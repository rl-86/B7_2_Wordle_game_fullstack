import React from 'react';

export default function WordLength({
  onWordLengthChange,
  onStartGame,
  isGameActive,
  onResetGame,
}) {
  const handleDecreaseLength = () => {
    onWordLengthChange((prevLength) => Math.max(4, prevLength - 1));
  };

  const handleIncreaseLength = () => {
    onWordLengthChange((prevLength) => Math.min(6, prevLength + 1));
  };

  const handleStart = () => {
    onStartGame();
  };

  const handleReset = () => {
    onResetGame();
  };

  return (
    <>
      <div>
        <button onClick={handleDecreaseLength} disabled={isGameActive}>
          -
        </button>
        <button onClick={handleIncreaseLength} disabled={isGameActive}>
          +
        </button>
        <button onClick={handleStart}>Start Game</button>
        <button onClick={handleReset} disabled={!isGameActive}>
          Reset
        </button>
      </div>
      <div></div>
    </>
  );
}
