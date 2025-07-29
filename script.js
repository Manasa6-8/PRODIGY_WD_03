let board = Array(9).fill('');
let gameActive = true;
let currentPlayer = 'x';
let mode = '2player'; // '2player' or 'ai'

function startGame() {
  board = Array(9).fill('');
  gameActive = true;
  currentPlayer = 'x';
  mode = document.getElementById('modeSelector').value;
  document.getElementById('status').textContent = "Player X's turn";
  renderBoard();
}

function renderBoard() {
  const boardDiv = document.getElementById('gameBoard');
  boardDiv.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = `cell ${cell}`;
    cellDiv.addEventListener('click', () => handleClick(index));
    boardDiv.appendChild(cellDiv);
  });
}

function handleClick(index) {
  if (!gameActive || board[index]) return;

  if (mode === 'ai' && currentPlayer === 'o') return;

  board[index] = currentPlayer;
  renderBoard();
  if (checkGameResult()) return;

  if (mode === 'ai' && currentPlayer === 'x') {
    currentPlayer = 'o';
    setTimeout(aiMove, 500);
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    updateStatus();
  }
}

function aiMove() {
  if (!gameActive) return;
  const emptyCells = board.map((val, i) => val === '' ? i : null).filter(v => v !== null);
  const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomMove] = 'o';
  renderBoard();
  checkGameResult();
  currentPlayer = 'x';
  updateStatus();
}

function checkGameResult() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      document.getElementById('status').textContent = `Player ${board[a].toUpperCase()} Wins!`;
      return true;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    document.getElementById('status').textContent = "It's a draw!";
    return true;
  }

  return false;
}

function updateStatus() {
  if (gameActive) {
    document.getElementById('status').textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
  }
}

startGame();
