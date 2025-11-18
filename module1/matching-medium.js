// Vocabulary List (Medium Level)
const words = [
    { word: "enormous", meaning: "very big" },
    { word: "glimpse", meaning: "a quick look" },
    { word: "hesitate", meaning: "to pause before doing something" },
    { word: "predict", meaning: "to say what will happen" },
    { word: "rare", meaning: "not common" },
    { word: "fortunate", meaning: "lucky" },
    { word: "absorb", meaning: "to soak up" },
    { word: "distant", meaning: "far away" },
    { word: "fragile", meaning: "easily broken" },
    { word: "recall", meaning: "to remember" }
];

let selectedWord = null;
let selectedMeaning = null;
let correctMatches = 0;

// Shuffle function
function shuffle(array) {
    return array.sort(() => Math.random() * 0.5 - 0.25);
}

// Load Game
function loadGame() {
    const wordList = document.getElementById("word-list");
    const meaningList = document.getElementById("meaning-list");

    const shuffledWords = shuffle([...words]);
    const shuffledMeanings = shuffle([...words]);

    shuffledWords.forEach(item => {
        let div = document.createElement("div");
        div.className = "item word";
        div.textContent = item.word;
        div.onclick = () => selectWord(div, item.word);
        wordList.appendChild(div);
    });

    shuffledMeanings.forEach(item => {
        let div = document.createElement("div");
        div.className = "item meaning";
        div.textContent = item.meaning;
        div.onclick = () => selectMeaning(div, item.word);
        meaningList.appendChild(div);
    });
}

// Select Word
function selectWord(element, word) {
    if (selectedWord) selectedWord.classList.remove("selected");
    selectedWord = element;
    element.classList.add("selected");
    checkMatch(word, null);
}

// Select Meaning
function selectMeaning(element, word) {
    if (selectedMeaning) selectedMeaning.classList.remove("selected");
    selectedMeaning = element;
    element.classList.add("selected");
    checkMatch(null, word);
}

// Match Check
function checkMatch(word1, word2) {
    let w = word1 || selectedWord?.textContent;
    let m = word2 || selectedMeaning?.dataset?.word;

    // Find meaning’s hidden word attribute
    if (!m && selectedMeaning) {
        m = words.find(i => i.meaning === selectedMeaning.textContent)?.word;
    }

    if (w && m) {
        if (w === m) {
            selectedWord.classList.add("correct");
            selectedMeaning.classList.add("correct");

            selectedWord.style.pointerEvents = "none";
            selectedMeaning.style.pointerEvents = "none";

            correctMatches++;

            if (correctMatches === words.length) {
                document.getElementById("result").textContent = "🎉 Great job! You matched all words!";
            }
        } else {
            selectedWord.classList.add("wrong");
            selectedMeaning.classList.add("wrong");

            setTimeout(() => {
                selectedWord.classList.remove("wrong", "selected");
                selectedMeaning.classList.remove("wrong", "selected");
            }, 700);
        }

        selectedWord = null;
        selectedMeaning = null;
    }
}

window.onload = loadGame;
