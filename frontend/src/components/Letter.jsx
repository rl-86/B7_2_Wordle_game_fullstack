import React from 'react';

export default function Letter({ letter, feedback = 'default' }) {
  const getFeedbackColor = () => {
    const feedbackColor = {
      default: 'var(--letterDefault-color)',
      incorrect: 'var(--letterIncorrect-color)',
      misplaced: 'var(--letterMisplaced-color)',
      correct: 'var(--letterCorrect-color)',
    };

    return feedbackColor[feedback];
  };

  const letterStyle = {
    backgroundColor: getFeedbackColor(),
    border: '2px lightgrey solid',
    borderRadius: '3px',
    width: '60px',
    height: '60px',
    display: 'inline-block',
    margin: '5px',
    lineHeight: '60px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return <div style={letterStyle}>{letter ? letter.toUpperCase() : ''}</div>;
}
