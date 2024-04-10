import { useState } from 'react';

export default function Letter() {
  const [letterState, setLetterState] = useState('state1');

  const changeLetterState = () => {};

  return (
    <div>
      <button>A</button>
    </div>
  );
}
