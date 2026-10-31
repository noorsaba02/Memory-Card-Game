const imageList = [
    "apple.png",
    "avacoda.png",
    "banana.png",
    "cheery.png",
    "grapes.png",
    "jackfruit.png",
    "kiwi.png",
    "mango.png",
    "orange.png",
    "papaya.png",
    "strawberry.png"
];

// Duplicate images
let cards = [...imageList, ...imageList];

// DOM
const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const timeText = document.getElementById("time");
const pairsText = document.getElementById("pairs");
const restartBtn = document.getElementById("restart");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let pairs = 0;

let seconds = 0;
let timer = null;

// Shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Timer
function startTimer() {

    if (timer) return;

    timer = setInterval(() => {

        seconds++;

        timeText.innerText = seconds;

    }, 1000);

}

// Create Board
function createBoard() {

    board.innerHTML = "";

    shuffle(cards);

    cards.forEach(image => {

        const card = document.createElement("div");

        card.className = "card";

        card.dataset.image = image;

        card.innerHTML = `
            <div class="front">?</div>

            <div class="back">
                <img src="${image}" alt="">
            </div>
        `;

        card.addEventListener("click", flipCard);

        board.appendChild(card);

    });

}

// Flip Card
function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    startTimer();

    this.classList.add("flip");

    if (!firstCard) {

        firstCard = this;

        return;

    }

    secondCard = this;

    moves++;

    movesText.innerText = moves;

    if (firstCard.dataset.image === secondCard.dataset.image) {

        firstCard.removeEventListener("click", flipCard);

        secondCard.removeEventListener("click", flipCard);

        pairs++;

        pairsText.innerText = pairs + "/8";

        firstCard = null;
        secondCard = null;

       if (pairs === 11){

            clearInterval(timer);

            setTimeout(() => {

                alert(
                    "🎉 Congratulations!\n\nMoves : "
                    + moves +
                    "\nTime : "
                    + seconds +
                    " seconds"
                );

            }, 300);

        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.classList.remove("flip");

            secondCard.classList.remove("flip");

            firstCard = null;
            secondCard = null;

            lockBoard = false;

        }, 900);

    }

}

// Restart
restartBtn.onclick = () => {

    clearInterval(timer);

    timer = null;

    seconds = 0;
    moves = 0;
    pairs = 0;

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    movesText.innerText = 0;
    timeText.innerText = 0;
    pairsText.innerText = "0/11"; 

    createBoard();

};

createBoard();