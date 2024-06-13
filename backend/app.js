import express from 'express';
import session from 'express-session';
import fs from 'fs/promises';
import { Item } from './src/models.js';
import feedback from './src/feedbackAlgo.js';

const app = express();
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

// Läs in ordlistorna
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

// Funktion för att slumpa fram ett ord från en lista
function getRandomWord(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// API-rutt för att få ett slumpmässigt ord
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
  // Spara det hemliga ordet i sessionen
  req.session.secretWord = word;
  res.json({ word });
});

app.post('/api/feedback', (req, res) => {
  const { guessedWord } = req.body;

  if (typeof guessedWord !== 'string') {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
  // Hämta det hemliga ordet från sessionen
  const secretWord = req.session.secretWord;

  const feedbackResult = feedback(secretWord, guessedWord);

  res.json({ feedback: feedbackResult });
});

app.use('/static', express.static('./static'));

export default app;
