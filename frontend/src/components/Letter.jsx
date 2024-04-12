import { useState } from 'react';

export default function Letter() {
  const [letterState, setLetterState] = useState('state1');

  const changeLetterState = () => {
    switch (letterState) {
      case 'state1':
        setLetterState('state2');
        break;
      case 'state2':
        setLetterState('state3');
        break;
      case 'state3':
        setLetterState('state4');
        break;
      case 'state4':
        setLetterState('state1');
        break;
    }
  };

  const getFeedbackColor = () => {
    switch (letterState) {
      case 'state1':
        return 'var(--letterDefault-color)';
      case 'state2':
        return 'var(--letterIncorrect-color)';
      case 'state3':
        return 'var(--letterMisplaced-color)';
      case 'state4':
        return 'var(--letterCorrect-color)';
    }
  };

  return (
    <div>
      <button
        style={{ backgroundColor: getFeedbackColor() }}
        onClick={changeLetterState}
      >
        _
      </button>
    </div>
  );
}
