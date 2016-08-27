var guessField = document.querySelector('#guess');
var guessButton = document.querySelector('#guess-button');
var clearButton = document.querySelector('#clear-button');
var newGameButton = document.querySelector('#reset-button');
var changeRangeButton = document.querySelector('#change-range');
var clearRangeButton = document.querySelector('#clear-range');
var lastGuess = document.querySelector('#last-guess');
var feedBack = document.querySelector('#feedback');
var h3 = document.querySelector('h3');
var currentMin = document.querySelector('#current-min');
var currentMax = document.querySelector('#current-max');
var minInputField = document.querySelector('#min');
var maxInputField = document.querySelector('#max');

var min = 0;
var max = 100;

var answer = generateRandomNumber();

// generates random number
function generateRandomNumber(number) {
  return Math.floor((Math.random() * 100) + 1);
}
console.log('random number ' + answer);

// turn number into an integer
function convertToInt(number) {
  return parseInt(number);
}

function clearInput() {
  guessField.value = '';
}

// checks to see if user input is a number and within the range
function checkGuess(number) {
  if(isNaN(convertToInt(number))) {
    alert('Please enter a number. Not a string.');
    feedback.innerText = 'Please enter a number. Not a string.';
    return false; //exit function
  }

  if (number < min || number > max) {
    alert('Please enter a number between 0 - 100');
    feedBack.innerText = 'Please enter a number between 0 - 100';
    return false; //exit function
  } else {
    return true;
  }
}

// actions when user's guess is correct
function correctAnswer(number) {
  if (answer === number) {
    h3.innerText = 'Congratulations, you win! The winning number: '
    feedBack.innerText = ('New game started, and it\'s harder this time, the MIN and MAX have changed.');
    lastGuess.style.color = '#ff5050';
    min = min - 10;
    max = max + 10;
    currentMin.innerText = min;
    currentMax.innerText = max;
    answer = generateRandomNumber();
    console.log('new random num: ' + answer);
    clearInput();
  } else {
    return false;
  }
}

// runs game when Guess button is clicked
guessButton.addEventListener('click', function() {
  gameTime();
  clearInput();
});

// main game function, runs when Guess button is clicked
function gameTime() {
  var userGuess = guessField.value;
  var userInt = convertToInt(userGuess);

  console.log(userInt);
  checkGuess(userInt);

  h3.innerText = 'Your last guess was:';
  lastGuess.innerText = userInt;

  if (userInt > answer) {
    feedBack.innerText = 'Sorry, your guess is too high. Try something lower.';
  } else if (userInt < answer) {
    feedBack.innerText = 'Sorry, your guess is too low. Try something higher.';
  }

  correctAnswer(userInt);
}


clearButton.addEventListener('click', function() {
   clearInput();
});

newGameButton.addEventListener('click', function() {
  answer = generateRandomNumber();
  lastGuess.innerText = '';
  lastGuess.style.color = 'black';
  guessField.value = '';
  h3.innerText = 'Make Your Guess';
  feedBack.innerText = 'New Game Started';
});

changeRangeButton.addEventListener('click', function() {
  currentMin.innerText = minInputField.value;
  currentMax.innerText = maxInputField.value;
  answer = generateRandomNumber();
  console.log('new ran num' + answer);
});

clearRangeButton.addEventListener('click', function() {
  minInputField.value = '';
  maxInputField.value = '';
  currentMin = min;
  currentMax = max;
});
