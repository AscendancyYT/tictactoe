const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeButton = document.getElementById('close-button');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleSquareClick(index) {
    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    const square = document.createElement('div');
    square.classList.add('square', 'animate');
    square.textContent = currentPlayer;
    board.children[index].replaceWith(square);

    if (checkWin()) {
        highlightWinningSquares();
        showModal(`${currentPlayer} wins!`);
        gameActive = false;
    } else if (!gameState.includes('')) {
        showModal('Draw!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}`~~`

function highlightWinningSquares() {
    winningConditions.forEach(condition => {
        if (condition.every(index => gameState[index] === currentPlayer)) {
            condition.forEach(index => {
                const winningSquare = board.children[index];
                winningSquare.classList.add('winning-square');
                winningSquare.style.backgroundColor = '#b2ff59'; // Light green
            });
        }
    });
}

closeButton.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Wait for the fade-out animation to finish
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
};

function resetGame() {
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    Array.from(board.children).forEach(child => child.remove());
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () => handleSquareClick(i));
        board.appendChild(square);
    }
}

resetButton.addEventListener('click', resetGame);

for (let i = 0; i < 9; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('click', () => handleSquareClick(i));
    board.appendChild(square);
}
