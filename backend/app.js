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
  res.json('Wordle server is upp and running!');
});

app.get('/info', async (req, res) => {
  res.render('info.jsx');
});

app.get('/highscore', async (req, res) => {
  res.render('highscore.jsx');
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

let words = [];

async function loadWords() {
  try {
    const data = await fs.readFile('src/word/words.json', 'utf8');
    words = JSON.parse(data);
  } catch (err) {
    console.error('Error loading or parsing words.json', err);
    process.exit(1);
  }
}

loadWords();

function getFilteredWords(words, length, allowDuplicates = true) {
  return words.filter((word) => {
    const meetsLengthCriteria = word.length === length;
    const hasDuplicates = new Set(word).size !== word.length;
    return meetsLengthCriteria && (allowDuplicates || !hasDuplicates);
  });
}

function getRandomWord(words) {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

app.get('/api/word/:length', (req, res) => {
  const length = parseInt(req.params.length);
  const allowDuplicates = req.query.allowDuplicates !== 'false';

  const filteredWords = getFilteredWords(words, length, allowDuplicates);
  if (filteredWords.length === 0) {
    res.status(400).send('No words found matching criteria');
    return;
  }

  const word = getRandomWord(filteredWords);
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
