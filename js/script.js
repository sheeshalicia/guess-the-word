const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton =   document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemainingElement = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//this variable needs to be able to change, so I used "let"
let word = "magnolia";
const guessedLetters = [];

//this variable needs to be able to change, so I used "let"
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //This transforms the data fetched above into an array
    const wordArray = words.split("\n");
    //console.log(wordArray);
    //this picks a random index from the length of the wordArray
    const randomWordIndex = Math.floor(Math.random() * wordArray.length);
    //this reassigns the value of the word variable (as long as you used "let"),
    //then pulls a random word from the array and removes whitespace
    word = wordArray[randomWordIndex].trim();
    placeholders(word);
};

//this function updates the paragraph's innerText 
//with symbols to represent each letter in the word.
const placeholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//this function starts the game with a new word
getWord();
//we ended up moving placeholders(word) to the getWord function, above

//this event listener is for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
        //prevents the default form submit (reloading the page)
    messages.innerText = "";
        //empties the message paragraph
    const guess = letterInput.value;
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
        return letterInput;
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
        howManyGuessesLeft(guess);
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
    //console.log(wordArray); //this didn't print anything different??
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
console.log(revealWord);
wordInProgress.innerText = revealWord.join("");
didYouWin();
};

//this function counts the guesses remaining and puts the appropriate messages on the screen
const howManyGuessesLeft = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        messages.innerText = `This word doesn't contain the letter ${guess}.`;
        remainingGuesses -= 1;
    } else {
        messages.innerText = `Yes! The word has the letter ${guess}.`
    }

    if (remainingGuesses === 0) {
        messages.innerHTML = `Game over! The correct word was <span class = "highlight"> ${word}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessesRemainingSpan.innerText = `${remainingGuesses} guess`;
    } else{
        guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const didYouWin = function () {
    //check to see if the word in progress matches the word they should guess
    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class ="highlight"> You guessed the correct world! Congrats!</p>`;
        startOver();
    }
};

//this function hides the game buttons and shows the play again button
const startOver = function () {
    guessButton.classList.add("hide");
    guessesRemainingElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    //reset everything
    messages.classList.remove("win");
    messages.innerText = "";
    guessedLettersElement.innerText = "";
    remainingGuesses = 8;
    guessedLetter = [];
    guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;

    //show the game buttons, hide the play again buttons
    guessButton.classList.remove("hide");
    guessesRemainingElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");

    getWord();
});





