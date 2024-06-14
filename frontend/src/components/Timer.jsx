import React, { useState, useEffect } from 'react';
export default function Timer({ startTime, endTime }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (startTime) {
      intervalId = setInterval(() => {
        if (endTime) {
          setTime(endTime - startTime);
          clearInterval(intervalId);
        } else {
          setTime(Date.now() - startTime);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [startTime, endTime]);

  return <p>Time: {Math.round(time / 1000)} seconds</p>;
}
