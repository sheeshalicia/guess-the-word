const guessedLettersElement = document.querySelector(".guessed-letters");
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
    const isLetter = validateGuess(guess);
        //runs the function that validate's the player's guess
    if (isLetter) {
        makeGuess(guess);
    }
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
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        messages.innerText = "You've already guessed that letter!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        lettersGuessed();
        updateWord(guessedLetters);
    }
};

//this function updates the page with the letters they guess
//call this function inside the else statement of the makeGuess function
const lettersGuessed = function (){
    //first clear the unordered list
    guessedLettersElement.innerHTML = "";
    //for each letter in the array, create a new list item 
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        //then add it to the unordered list
        guessedLettersElement.append(li);
    }
};

//I can't get this function to work >:(
//this function updates the word in progress if it contains a guessed letter
const updateWord = function (guessedLetters){
    //convert the word to uppercase
    const wordUpper = word.toUpperCase();
    //splits the word string into an array so that the letter can appear
    const wordArray = wordUpper.split("");
    //you need to create a new array w/updated characters
    const revealWord = [];
    //and then check each letter in the array
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
    } else {
        revealWord.push("●");
    }
}
};


