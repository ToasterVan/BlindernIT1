const oxButton = document.getElementById("oxygen");
const niButton = document.getElementById("nitrogen");
const caButton = document.getElementById("carbon");

const inputField = document.querySelector("input");
const inputForm = document.querySelector("form");

const h1Span = document.querySelector("span");

let chosenAtom = "";

class Atom {
    constructor(type, n) {
        this.type = type;
        this.n = n;
    }

    getHydrogen() {
        if(this.type == "O") {
            return 2;
        }
        if(this.type == "N") {
            return this.n + 2;
        }
        if(this.type == "C") {
            return 2*this.n + 2;
        }
    }
}

oxButton.onclick = () => {
    chosenAtom = "O";
}
niButton.onclick = () => {
    chosenAtom = "N";
}
caButton.onclick = () => {
    chosenAtom = "C";
}

inputForm.onsubmit = () => {
    event.preventDefault();

    const amount = Number(inputField.value);

    if(amount <= 0 || amount > 50) {
        alert("Antall atomer må være større enn 0 og mindre enn eller lik 50");
        return;
    }
    if(chosenAtom == "") {
        alert("Må velge et stoff");
        return;
    }

    const atom = new Atom(chosenAtom, amount);

    h1Span.innerHTML = `${chosenAtom}${(amount == 1 ? "" : amount)}H${atom.getHydrogen()}`;
}