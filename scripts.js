var guessField = document.querySelector('#guess');
var guessButton = document.querySelector('#guess-button');
var clearButton = document.querySelector('#clear-button');
var newGameButton = document.querySelector('#reset-button');
var lastGuess = document.querySelector('#last-guess');
var feedBack = document.querySelector('#feedback');
var h3 = document.querySelector('h3');

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
    feedBack.innerText = ('Congratulations, you win! New game started, and it\'s harder this time, the min and max have changed.');
    lastGuess.style.color = '#ff5050';
    min = min - 10;
    max = max + 10;
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


// clear button resets input field
clearButton.addEventListener('click', function() {
   clearInput();
});

// new game button resets game
newGameButton.addEventListener('click', function() {
  answer = generateRandomNumber();
  lastGuess.innerText = ('___');
  guessField.value = '';
  h3.innerText = 'Make Your Guess';
  feedBack.innerText = 'New Game Started';
});
