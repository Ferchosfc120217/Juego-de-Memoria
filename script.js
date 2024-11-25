const images = [
    '🍎', '🍌', '🍒', '🍓', '🍇',
    '🍍', '🍉', '🍊', '🍋', '🍏',
    '🍎', '🍌', '🍒', '🍓', '🍇',
    '🍍', '🍉', '🍊', '🍋', '🍏'
];

let firstCard = null;
let secondCard = null;
let attempts = 0;
let flippedCards = 0;
let gameStarted = false;
let timer = null;
let time = 0;

const startBtn = document.getElementById('startBtn');
const gameBoard = document.getElementById('gameBoard');
const attemptsSpan = document.getElementById('attempts');
const timeSpan = document.getElementById('time');

startBtn.addEventListener('click', startGame);

function startGame() {
    gameStarted = true;
    attempts = 0;
    flippedCards = 0;
    time = 0;
    attemptsSpan.textContent = attempts;
    timeSpan.textContent = time;

    // Despeja el tablero y coloca las cartas.
    gameBoard.innerHTML = '';
    const shuffledImages = shuffle(images);
    shuffledImages.forEach((img, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);

        const image = document.createElement('div');
        image.classList.add('image');
        image.textContent = img;

        card.appendChild(image);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    // Comienza el tiempo
    clearInterval(timer);
    timer = setInterval(updateTime, 1000);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(event) {
    if (!gameStarted || event.target.classList.contains('flipped') || secondCard) return;

    const card = event.target;
    card.classList.add('flipped');
    card.querySelector('.image').style.display = 'block'; // Mostrar el contenido de la carta

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        attempts++;
        attemptsSpan.textContent = attempts;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.querySelector('.image').textContent === secondCard.querySelector('.image').textContent) {
        flippedCards += 2;
        if (flippedCards === images.length) {
            clearInterval(timer);
            alert(`¡Ganaste! Intentos: ${attempts} | Tiempo: ${time} segundos`);
        }
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.querySelector('.image').style.display = 'none';
            secondCard.querySelector('.image').style.display = 'none';
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
}

function updateTime() {
    time++;
    timeSpan.textContent = time;
}
