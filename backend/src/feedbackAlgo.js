// The feedback algorithm for the game.

// Input two words of string type to compare.
export default function feedback(secretWord, guessedWord) {
  // Converts a string to an array and puts each letter into an object.
  function convertWord(inputWord) {
    if (typeof inputWord !== 'string') {
      throw new Error('inputWord must be a string');
    }
    const letterObjects = [];
    inputWord = inputWord.toUpperCase();
    for (let i = 0; i < inputWord.length; i++) {
      let letterObject = {
        letter: inputWord[i],
      };

      letterObjects.push(letterObject);
    }

    return letterObjects;
  }

  // Compare the two arrays and return an array with the result for each letter.
  function compareWords(secretObjects, guessedObjects) {
    const compareResult = [];
    const secretLetters = secretObjects.map((obj) => obj.letter);
    const letterCounts = {};

    secretLetters.forEach((letter) => {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    });

    for (let i = 0; i < guessedObjects.length; i++) {
      const guessedLetter = guessedObjects[i].letter;

      if (secretLetters[i] === guessedLetter) {
        compareResult.push({ letter: guessedLetter, result: 'correct' });
        letterCounts[guessedLetter]--;
      } else if (letterCounts[guessedLetter] > 0) {
        compareResult.push({ letter: guessedLetter, result: 'misplaced' });
        letterCounts[guessedLetter]--;
      } else {
        compareResult.push({ letter: guessedLetter, result: 'incorrect' });
      }

      if (letterCounts[guessedLetter] < 0) {
        compareResult.find(
          (obj) => obj.letter === guessedLetter && obj.result === 'misplaced'
        ).result = 'incorrect';
      }
    }

    return compareResult;
  }

  const secretObjects = convertWord(secretWord);
  const guessedObjects = convertWord(guessedWord);
  const feedbackResult = compareWords(secretObjects, guessedObjects);

  return feedbackResult;
}
