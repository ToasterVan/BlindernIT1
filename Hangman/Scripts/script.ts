//read script.js file, as some differences are found in a .ts file, such as static types and static return values

const words: string[] = ["hemmelig", "blindern", "oslo", "informasjonsteknologi"]

let ord: string[] = [];

let hiddenWord: string[] = [];

const hidden: string[] = []

let usedWords: string[] = []; 

const inputField = document.querySelector("input");
const button = document.getElementById("Guess");

const wordEl = document.getElementById("Word");
const outputEl = document.getElementById("Output");
const usedWordsEl = document.getElementById("Used");

let livesLeft = 5;

function NewWord(wordArray: string[]) {
    const randint = Math.floor(Math.random() * wordArray.length);
    
    if(Array.from(wordArray[randint]) == ord) NewWord(words);

    ord = Array.from(wordArray[randint]); //Array.from() creates an array from a string with one letter per index

    livesLeft = 5;

    usedWords = [];

    inputField.value = "";
    usedWordsEl.innerHTML = "";

    hiddenWord = CreateHidden(ord);

    wordEl.innerHTML = hiddenWord.toString();
}

function CheckLetter(array: string[], wantedLetter: string): string | number[] {
    let positions: number[] = [];
    
    for(let i = 0; i < array.length; i++) {
        if(array[i] == wantedLetter) {
            positions = [...positions, i]; /*
            The spread operator (...$varname) expands the array
            example:
            a variable named numArray has the values [1, 2, 3, 4]
            if I want to add 5 to the array I could write:
            numArray = [...numArray, 5]
            which would be the same as writing
            numArray = [1, 2, 3, 4, 5]
            */
        };
    }
    
    if(positions.length != 0) {
        return positions;
    }
    return "not found";
}

function CreateHidden(word: string[]) {
    let hiddenArray: string[] = []

    for(let i in word) {
        hiddenArray = [...hiddenArray, "_"]; 
    }

    return hiddenArray;
}

button.onclick = () => {
    const letter = inputField.value.toLowerCase(); //.toLowerCase() converts a string to all lowercase, even if the input is uppercase

    if(livesLeft <= 0) {
        outputEl.innerHTML = "Du har tapt";

        wordEl.innerHTML = ord.toString();

        return;
    }

    if(letter == "") return;

    if(CheckLetter(usedWords, letter) != "not found") {
        inputField.value = "";

        outputEl.innerHTML = "Du har allerede gjettet denne bokstaven";

        return;
    }

    const exists = CheckLetter(ord, letter);

    if(exists == "not found") {
        outputEl.innerHTML = "Bokstaven er ikke i ordet";

        livesLeft--;
    }
    else {
        outputEl.innerHTML = `bokstaven er i ordet p?? ${exists.length} ${exists.length == 1 ? "sted" : "steder"}` /*
        inline if evaluates the first expression (in this case exists.length  == 1)
        if it is true, it returns the first value after the ?
        if it is false, it returns the value after :
        */

        for(let i of exists) {
            hiddenWord[i] = letter;

            wordEl.innerHTML = hiddenWord.toString(); //.toString() converts an array to a string
        }
    }

    usedWords = [...usedWords, letter];

    usedWordsEl.innerHTML = usedWords.toString();

    inputField.value = "";
}

NewWord(words);