import express from 'express';
import { Item } from './src/models.js';

const app = express();

app.get('/', async (req, res) => {
  res.send('Front page');
});

app.get('/info', async (req, res) => {
  res.send('Infomation page'), res.render('info.jsx');
});

app.get('/highscore', async (req, res) => {
  res.send('Highscore page'), res.render('highscore.jsx');
});

app.listen(5080, () => {
  console.log('Server is running on port 5080');
});
