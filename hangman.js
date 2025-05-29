const optionsContainer = document.getElementById('options-container');
const userInputSection = document.getElementById('user-input-section');
const canvas = document.getElementById('canvas');
const newGameContainer = document.getElementById('new-game-container');
const newGameButton = document.getElementById('new-game-button');
const resultText = document.getElementById('result-text');

const options = {
  Fruits: ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'],
  Animals: ['Elephant', 'Giraffe', 'Kangaroo', 'Dolphin', 'Penguin'],
  Countries: ['Brazil', 'Canada', 'Denmark', 'Egypt', 'France']
};

let chosenWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

function displayOptions() {
  optionsContainer.innerHTML = '';
  for (let category in options) {
    const button = document.createElement('button');
    button.textContent = category;
    button.classList.add('options');
    button.addEventListener('click', () => startGame(category));
    optionsContainer.appendChild(button);
  }
}

function startGame(category) {
  optionsContainer.style.display = 'none';
  userInputSection.innerHTML = '';
  guessedLetters = [];
  wrongGuesses = 0;
  resultText.textContent = '';
  newGameContainer.style.display = 'none';
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

  const words = options[category];
  chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

  for (let i = 0; i < chosenWord.length; i++) {
    const span = document.createElement('span');
    span.classList.add('dashes');
    span.textContent = '_';
    userInputSection.appendChild(span);
  }

  createLetterButtons();
}

function createLetterButtons() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letterContainer = document.createElement('div');
  letterContainer.id = 'letter-buttons';

  for (let i = 0; i < letters.length; i++) {
    const button = document.createElement('button');
    button.textContent = letters[i];
    button.classList.add('options');
    button.addEventListener('click', () => handleGuess(letters[i], button));
    letterContainer.appendChild(button);
  }

  document.getElementById('hangman-game').appendChild(letterContainer);
}

function handleGuess(letter, button) {
  button.disabled = true;
  if (chosenWord.includes(letter)) {
    revealLetter(letter);
    if (checkWin()) {
      resultText.textContent = 'Congratulations! You won!';
      endGame();
    }
  } else {
    wrongGuesses++;
    drawHangman();
    if (wrongGuesses === maxWrongGuesses) {
      resultText.textContent = `Game Over! The word was: ${chosenWord}`;
      revealWord();
      endGame();
    }
  }
}

function revealLetter(letter) {
  const spans = userInputSection.querySelectorAll('span');
  for (let i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i] === letter) {
      spans[i].textContent = letter;
    }
  }
}

function revealWord() {
  const spans = userInputSection.querySelectorAll('span');
  for (let i = 0; i < chosenWord.length; i++) {
    spans[i].textContent = chosenWord[i];
  }
}

function checkWin() {
  const spans = userInputSection.querySelectorAll('span');
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].textContent === '_') {
      return false;
    }
  }
  return true;
}

function endGame() {
  const letterButtons = document.getElementById('letter-buttons');
  if (letterButtons) {
    letterButtons.remove();
  }
  newGameContainer.style.display = 'block';
}

newGameButton.addEventListener('click', () => {
  optionsContainer.style.display = 'block';
  userInputSection.innerHTML = '';
  resultText.textContent = '';
  newGameContainer.style.display = 'none';
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
});

function drawHangman() {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;

  switch (wrongGuesses) {
    case 1:
      // Base
      ctx.beginPath();
      ctx.moveTo(10, 290);
      ctx.lineTo(390, 290);
      ctx.stroke();
      break;
    case 2:
      // Pole
      ctx.beginPath();
      ctx.moveTo(50, 290);
      ctx.lineTo(50, 50);
      ctx.stroke();
      break;
    case 3:
      // Beam
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.lineTo(200, 50);
      ctx.stroke();
      break;
    case 4:
      // Rope
      ctx.beginPath();
      ctx.moveTo(200, 50);
      ctx.lineTo(200, 100);
      ctx.stroke();
      break;
    case 5:
      // Head
      ctx.beginPath();
      ctx.arc(200, 120, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 6:
      // Body
      ctx.beginPath();
      ctx.moveTo(200, 140);
      ctx.lineTo(200, 200);
      ctx.stroke();
      // Left Arm
      ctx.beginPath();
      ctx.moveTo(200, 160);
      ctx.lineTo(170, 180);
      ctx.stroke();
      // Right Arm
      ctx.beginPath();
      ctx.moveTo(200, 160);
      ctx.lineTo(230, 180);
      ctx.stroke();
      // Left Leg
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(170, 240);
      ctx.stroke();
      // Right Leg
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(230, 240);
      ctx.stroke();
      break;
    default:
      break;
  }
}

displayOptions();
