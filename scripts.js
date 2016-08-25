var guessField = document.querySelector('#guess');
var guessButton = document.querySelector('#guess-button');
var clearButton = document.querySelector('#clear-button');
var newGameButton = document.querySelector('#reset-button');
var lastGuess = document.querySelector('#last-guess');
var feedBack = document.querySelector('#feedback');
var h3 = document.querySelector('h3');

var min = 0;
var max = 100;

var answer = generateRandom();

// generates random number
function generateRandom(number) {
  return Math.floor((Math.random() * 100) + 1);
}
console.log(answer);

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

// function guessFeedback() {
//   if (userInt > answer) {
//     feedBack.innerText = 'Sorry, your guess is too high. Try something lower.';
//   } else if (userInt < answer) {
//     feedBack.innerText = 'Sorry, your guess is too low. Try something lower.';
//   } else {
//     return false;
//   }
// }

// actions when user's guess is correct
function correctAnswer(number) {
  if (answer === number) {
    alert('Congratulations, you win! New game started.');
    feedBack.innerText = ('Congratulations, you win! New game started.');
    min = min - 10;
    max = max + 10;
    answer = generateRandom();
    console.log(answer);
    clearInput();
  } else {
    return false;
  }
}

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

// runs game when Guess button is clicked
guessButton.addEventListener('click', function() {
  gameTime();
  clearInput();
});


// clear button resets input field
clearButton.addEventListener('click', function() {
   clearInput();
});

// new game button resets game
newGameButton.addEventListener('click', function() {
  generateRandom();
  lastGuess.innerText = ('___');
  guessField.value = '';
  h3.innerText = 'Make Your Guess';
  feedBack.innerText = 'New Game Started';
});
