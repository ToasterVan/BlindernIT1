const words = ["hemmelig", "blindern", "oslo", "informasjonsteknologi"];
let ord = [];
let hiddenWord = [];
const hidden = [];
let usedWords = [];
const inputField = document.querySelector("input");
const button = document.getElementById("Guess");
const wordEl = document.getElementById("Word");
const outputEl = document.getElementById("Output");
const usedWordsEl = document.getElementById("Used");
let livesLeft = 5;
function NewWord(wordArray) {
    const randint = Math.floor(Math.random() * wordArray.length);
    if (Array.from(wordArray[randint]) == ord)
        NewWord(words);
    ord = Array.from(wordArray[randint]);
    livesLeft = 5;
    usedWords = [];
    inputField.value = "";
    usedWordsEl.innerHTML = "";
    hiddenWord = CreateHidden(ord);
    wordEl.innerHTML = hiddenWord.toString();
}
function CheckLetter(array, wantedLetter) {
    let positions = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] == wantedLetter) {
            positions = [...positions, i];
        }
        ;
    }
    if (positions.length != 0) {
        return positions;
    }
    return "not found";
}
function CreateHidden(word) {
    let hiddenArray = [];
    for (let i in word) {
        hiddenArray = [...hiddenArray, "_"];
    }
    return hiddenArray;
}
button.onclick = () => {
    const letter = inputField.value.toLowerCase();
    if (livesLeft <= 0) {
        outputEl.innerHTML = "Du har tapt";
        wordEl.innerHTML = ord.toString();
        return;
    }
    if (letter == "")
        return;
    if (CheckLetter(usedWords, letter) != "not found") {
        inputField.value = "";
        outputEl.innerHTML = "Du har allerede gjettet denne bokstaven";
        return;
    }
    const exists = CheckLetter(ord, letter);
    if (exists == "not found") {
        outputEl.innerHTML = "Bokstaven er ikke i ordet";
        livesLeft--;
    }
    else {
        outputEl.innerHTML = `bokstaven er i ordet på ${exists.length} ${exists.length == 1 ? "sted" : "steder"}`;
        for (let i of exists) {
            hiddenWord[i] = letter;
            wordEl.innerHTML = hiddenWord.toString();
        }
    }
    usedWords = [...usedWords, letter];
    usedWordsEl.innerHTML = usedWords.toString();
    inputField.value = "";
};
NewWord(words);
