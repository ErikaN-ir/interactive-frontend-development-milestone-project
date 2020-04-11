const sourceData = ["sliced", "searched", "jumped", "crashed", "creased", "dove", "ran", "danced", "booked", "threw", "needed", "sought", "forgot", "ignored", "juggled", "thought", "felt", "caught", "rejoiced", "thrived", "dashed", "pranced", "slept", "fought", "crumbled", "collapsed", "treasured", "silenced", "rose", "assigned", "allotted", "collected", "met", "traded", "assumed", "dipped",
"tumbled", "stretched"];
console.log(sourceData);

let words = [];

function generateWords() {
    let leftWords = sourceData.slice(0);
    for (let i=0; i<21; i++) {
        let gen = words.push(leftWords[Math.floor(Math.random() * leftWords.length)]);
        leftWords = leftWords.filter( ( el ) => !words.includes( el ) );
    }
    console.log(words);
    console.log(leftWords);
}

function startGame() {
    setLevelRound();
    showFlashcards();
}

function setLevelRound() {
    let level = 1;
    let round = 1;
    let score = 0;

    sessionStorage.setItem("level", level);
    sessionStorage.setItem("round", round);
    sessionStorage.setItem("score", score);

    document.getElementById("level").innerHTML = sessionStorage.getItem("level");
    document.getElementById("round").innerHTML = sessionStorage.getItem("round");
    document.getElementById("score").innerHTML = sessionStorage.getItem("score");
}

function levelUp() {
    let level = sessionStorage.getItem("level");
    console.log("Old Level:" + level);
    level++;
    console.log("New Level:" + level);
    sessionStorage.setItem("level", level);
    document.getElementById("level").innerHTML = sessionStorage.getItem("level");
    clearGameboard();
    hideGameboard();
    showFlashcards();
}

function scoreUp() {
    let oldScore = sessionStorage.getItem("score");
    console.log("Old Score:" + oldScore);
    let score = parseInt(oldScore) + 10;
    console.log("New Score:" + score);
    sessionStorage.setItem("score", score);
    document.getElementById("score").innerHTML = sessionStorage.getItem("score");
}

class FlashCards {
    constructor() {
        this.words = words;
        this.currentWordIndex = 0;
        this.level = parseInt(sessionStorage.getItem("level"));
        this.lastWordIndex = (this.level*2);
    }

    displayCurrentWord() {
    console.info(flashcard.words[flashcard.currentWordIndex]);
    return flashcard.words[flashcard.currentWordIndex];
    }

    incrementWordIndex() {
  	flashcard.currentWordIndex = flashcard.currentWordIndex + 1;
    }

}

function showFlashcards(){
    flashcard = new FlashCards();
    console.log(flashcard);
    document.getElementById("flashcard").style.display = "block";
    document.getElementById("flashcard1").innerHTML = flashcard.displayCurrentWord();
}

function nextFlashCard(){
    if (flashcard.currentWordIndex < flashcard.lastWordIndex-1){
        flashcard.incrementWordIndex();
        document.getElementById("flashcard1").innerHTML = flashcard.displayCurrentWord();
    } else {
        flashcard.incrementWordIndex();
        document.getElementById("flashcard1").innerHTML = flashcard.displayCurrentWord();
        $("#nextWord").hide();
        $("#start").show();
    }
}

function resetFlashcard(){
    $("#nextWord").show();
    $("#start").hide();
}

class Gameboards {
    constructor() {
        this.checkWord = "temp_word";
        this.words = words;
        this.currentWordIndex = 0;
        this.level = parseInt(sessionStorage.getItem("level"));
        this.lastWordIndex = (this.level*2);
    }

    incrementWordIndex() {
  	    this.currentWordIndex = this.currentWordIndex + 1;
    }

    currentAnswerWord() {
        console.info(this.words[this.currentWordIndex]);
        return this.words[this.currentWordIndex];
    }

}

function showGameboard(){
    document.getElementById("flashcard").style.display = "none";
    document.getElementById("gameboard").style.display = "block";
    gameboard = new Gameboards();
}

function showSpaces(){
    for (let i = 0; i<= gameboard.lastWordIndex; i++) {
        let e = "";
        e += "word" + (i+1);
        console.log(e);
        document.getElementById(e).style.display = "block";
    } 
}
    
function checkAnswer() {
    //console.log(document.getElementById(text1).value);
    gameboard.checkWord = document.getElementById("text").value;
    console.log(gameboard.checkWord);
    console.log(gameboard.currentAnswerWord());
    if (gameboard.checkWord == gameboard.currentAnswerWord()) {
        console.log("That's correct!");
        let e = "span" + (gameboard.currentWordIndex + 1);
        document.getElementById(e).innerHTML = gameboard.checkWord;
        scoreUp();
        document.getElementById("text").value = "";
        if (gameboard.currentWordIndex == gameboard.lastWordIndex) {
            levelUp();
        } else {
            gameboard.incrementWordIndex();
        }
    } else {
        console.log("Incorrect!");
        return;
    }
}

function clearGameboard(){
    for (let i = 0; i<= gameboard.lastWordIndex; i++) {
        let e = "";
        e += "span" + (i+1);
        console.log(e);
        document.getElementById(e).innerHTML = "______________";
    } 
}

function hideGameboard() {
    document.getElementById("gameboard").style.display = "none";
}