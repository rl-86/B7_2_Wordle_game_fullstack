import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
  name: String,
  letters: Number,
  guesses: Number,
  time: Number,
  word: String,
});

const Highscore = mongoose.model('Highscore', highscoreSchema);

export { Highscore };
