import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Highscores.css';

function Highscores() {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    const fetchHighscores = async () => {
      try {
        const response = await fetch('http://localhost:5080/api/highscores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHighscores(data);
      } catch (error) {
        console.error('Error fetching highscores:', error);
      }
    };

    fetchHighscores();
  }, []);

  return (
    <div>
      <Link to='/'>Back to the Game</Link>
      <h1>Highscores</h1>
      <div>
        <table className='highscores-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Guesses</th>
              <th>Letters</th>
              <th>Word</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {highscores.map((score, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.name}</td>
                <td>{score.guesses}</td>
                <td>{score.letters}</td>
                <td>{score.word.toUpperCase()}</td>
                <td>{score.time.toFixed(1)}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Highscores;
