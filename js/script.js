const letterGuess = document.querySelector(".guessed-letters");
const guessButton =   document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemainingElement = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];


//this function updates the paragraph's innerText 
//with symbols to represent each letter in the word.
const placeholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholders(word);

//this event listener is for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
        //prevents the default form submit (reloading the page)
    messages.innerText = "";
        //empties the message paragraph
    const guess = input.value;
        //pulls the value of the player's inputted guess
    const checkGuess = validateGuess(guess);
        //runs the function that validate's the player's guess
    console.log(checkGuess);
    // if (checkGuess) {
    //     makeGuess(guess);
    //}
});


//this function validates the player's guess
const validateGuess = function (input) {
    //this is a regular expression that ensures the player inputs a letter
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){ 
        //if you didn't input anything
        messages.innerText = "Please enter a letter first!";
    }else if (input.length > 1){
        //if you inputted more than one letter
        messages.innerText = "Please only enter a single letter!";
    }else if (!input.match(acceptedLetter)){ 
        //if you typed a number or a not-letter
        messages.innerText = "Please enter a letter from A to Z.";
    } else{
        //if you typed a real single letter
        return input;
    }
};

//this function captures input and puts it in the "guessedLetters" array
const makeGuess = function (input) {
    guess = guess.toUpperCase();
};