const letterGuess = document.querySelector(".guessed-letters");
const guessButton =   document.querySelector(".guess");
const inputGuess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemainingElement = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";


//this function updates the paragraph's innerText 
//with symbols to represent each letter in the word.
const placeholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholders(word);

//add an even listener for the button
guessButton.addEventListener("click", function (e){
    //prevents the default form submit (reloading the page)
    e.preventDefault();
    const guess = (inputGuess.value);
    console.log(guess);
    inputGuess.value = "";
});