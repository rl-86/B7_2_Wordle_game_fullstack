import React from 'react';
import { Link } from 'react-router-dom';
import '../InfoPage.css';

function Info() {
  return (
    <>
      <div>
        <Link to='/'>Back to the Game</Link>
        <h2>Game Information</h2>
        <p>
          Welcome to the Guess the Word Game! This game is inspired by the
          popular game Wordle.
        </p>
        <p>How to Play:</p>
        <ul>
          <li>
            Start the game by choosing the length of the word you want to guess.
          </li>
          <li>Choose if you allow duplicate letters in the secret word.</li>
          <li>
            Enter your guess in the input field. The game will give you feedback
            on each guess.
          </li>
          <li>
            The feedback will indicate which letters are correct and in the
            right position (Green), correct but in the wrong position (Yellow),
            or not in the word at all (Red).
          </li>
          <li>
            Try to guess the word with the fewest attempts possible and the
            least amount of time.
          </li>
          <li>Have fun! :)</li>
        </ul>
      </div>
      <div>
        <br />
        <h2>About this Application</h2>
        <p>This application is built using the MERN-stack which stands for:</p>
        <ul>
          <li>MongoDB - A database used to store the highscores</li>
          <li>Express - Used for API routes and endpoints</li>
          <li>
            React - The library used for all of the Graphical User Interface
            (GUI) and frontend logic
          </li>
          <li>
            Node.js - The framework that powers the server side, or backend, of
            the application, running in conjunction with Express
          </li>
        </ul>
      </div>
      <br />
      <br />
      <div>
        To view the source code for this application, visit My GitHub
        repository:
        <div>
          <Link to='https://github.com/rl-86/B7_2_Wordle_game_fullstack'>
            Link to GitHub
          </Link>
        </div>
      </div>
    </>
  );
}

export default Info;
