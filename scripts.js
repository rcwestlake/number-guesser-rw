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
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    feedBack.innerText = 'Please enter a number between ' + min + ' - ' + max + '.';
    return false; //exit function
  } else {
    return true;
  }
}

// actions when user's guess is correct
function correctAnswer(number) {
  if (answer === number) {
    h3.innerText = 'Congratulations, you win! The winning number: ';
    feedBack.innerText = ('New game started, and it\'s harder this time, the MIN and MAX have changed.');
    lastGuess.style.color = '#ff5050';
    min = min - 10;
    max = max + 10;
    currentMin.innerText = min;
    currentMax.innerText = max;
    answer = generateRandomNumber();
    console.log('new random num: ' + answer);
    clearInput();
    newGameButton.disabled = true;
  } else {
    lastGuess.style.color = 'black';
    return false;
  }
}

guessButton.addEventListener('click', function() {
  gameTime();
});

guessField.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    gameTime();
  }
});

// disable/enable button controls
newGameButton.disabled = true;

if (guessField.value === '') {
  guessButton.disabled = true;
  clearButton.disabled = true;
}

guessField.addEventListener('keyup', function() {
  if (guessField.value !== '') {
  guessButton.disabled = false;
  clearButton.disabled = false;
  } else {
    guessButton.disabled = true;
    clearButton.disabled = true;
  }
});

// main game function, runs when Guess button is clicked
function gameTime() {
  var userGuess = guessField.value;
  var userInt = convertToInt(userGuess);
  console.log(userInt);

  if (checkGuess(userInt) === false) {
    clearInput();
    return false;
  }

  newGameButton.disabled = false;

  h3.innerText = 'Your last guess was:';
  lastGuess.innerText = userInt;

  if (userInt > answer) {
    feedBack.innerText = 'Sorry, your guess is too high. Try something lower.';
  } else if (userInt < answer) {
    feedBack.innerText = 'Sorry, your guess is too low. Try something higher.';
  }
  clearInput();
  correctAnswer(userInt);
  guessButton.disabled = true;
  clearButton.disabled = true;
}


clearButton.addEventListener('click', function() {
   clearInput();
});

newGameButton.addEventListener('click', function() {
  lastGuess.innerText = '';
  lastGuess.style.color = 'black';
  guessField.value = '';
  h3.innerText = 'Make Your Guess';
  feedBack.innerText = 'New Game Started';
  min = 0;
  max = 100;
  currentMin.innerText = 0;
  currentMax.innerText = 100;
  minInputField.value = '';
  maxInputField.value = '';
  answer = generateRandomNumber();
});

changeRangeButton.addEventListener('click', function() {
  currentMin.innerText = minInputField.value;
  currentMax.innerText = maxInputField.value;
  min = minInputField.value;
  max = maxInputField.value;
  answer = generateRandomNumber();
  console.log('new number/range: ' + answer);
});

clearRangeButton.addEventListener('click', function() {
  minInputField.value = '';
  maxInputField.value = '';
  currentMin = min;
  currentMax = max;
});
