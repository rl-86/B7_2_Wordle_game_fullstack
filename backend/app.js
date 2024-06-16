import express from 'express';
import session from 'express-session';
import fs from 'fs/promises';
import feedback from './src/feedbackAlgo.js';
import { Highscore } from './src/models.js';
import connectDB from './src/connectDB.js';
import cors from 'cors';

const app = express();
connectDB();

app.use(cors());

app.use(express.json());
app.use(
  session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', async (req, res) => {
  res.json('Wordle Backend is upp and running!');
});

app.get('/info', async (req, res) => {
  res.render('Infomation page'), res.render('info.jsx');
});

app.get('/highscore', async (req, res) => {
  res.render('Highscore page'), res.render('highscore.jsx');
});

app.post('/highscore', async (req, res) => {
  try {
    const { name, letters, guesses, time, word } = req.body;
    const newHighscore = new Highscore({ name, letters, guesses, time, word });
    await newHighscore.save();
    res.status(201).send('Highscore saved');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

let words4, words5, words6;
fs.readFile('src/word/words4.json', 'utf8').then(
  (data) => (words4 = JSON.parse(data))
);
fs.readFile('src/word/words5.json', 'utf8').then(
  (data) => (words5 = JSON.parse(data))
);
fs.readFile('src/word/words6.json', 'utf8').then(
  (data) => (words6 = JSON.parse(data))
);

function getRandomWord(list) {
  return list[Math.floor(Math.random() * list.length)];
}

app.get('/api/word/:length', (req, res) => {
  const length = parseInt(req.params.length);
  let word;
  switch (length) {
    case 4:
      word = getRandomWord(words4);
      break;
    case 5:
      word = getRandomWord(words5);
      break;
    case 6:
      word = getRandomWord(words6);
      break;
    default:
      res.status(400).send('Invalid word length');
      return;
  }

  req.session.secretWord = word;
  res.json({ success: true });
});

app.post('/api/feedback', (req, res) => {
  const { guessedWord } = req.body;

  if (typeof guessedWord !== 'string') {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const secretWord = req.session.secretWord;

  const feedbackResult = feedback(secretWord, guessedWord);

  res.json({ feedback: feedbackResult });
});

app.use('/static', express.static('./static'));

export default app;
