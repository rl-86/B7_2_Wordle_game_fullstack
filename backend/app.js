import express, { response } from 'express';
import { Item } from './src/models.js';

const app = express();

app.get('/', async (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.post('/', async (req, res) => {
  const guess = req.body.data;
  console.log(guess);
  res.json(response);
});

app.get('/info', async (req, res) => {
  res.render('Infomation page'), res.render('info.jsx');
});

app.get('/highscore', async (req, res) => {
  res.render('Highscore page'), res.render('highscore.jsx');
});

app.use('/static', express.static('./static'));

export default app;
