import React, { useState, useEffect } from 'react';

export default function Timer({ startTime }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (startTime) {
      const intervalId = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startTime]);

  return <p>Time: {Math.round(time / 1000)} seconds</p>;
}
