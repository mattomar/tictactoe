(function () {
    function startTicTacToeGame() {
        const gameBoard = [
            { id: 1, value: '' },
            { id: 2, value: '' },
            { id: 3, value: '' },
            { id: 4, value: '' },
            { id: 5, value: '' },
            { id: 6, value: '' },
            { id: 7, value: '' },
            { id: 8, value: '' },
            { id: 9, value: '' }
        ];

        document.addEventListener('DOMContentLoaded', function () {
            const startButton = document.getElementById('start-button');
            const choiceForm = document.getElementById('choice-form');
            const form = choiceForm.querySelector('form');
            const gameBoardElement = document.getElementById('game-board');
            const cells = gameBoardElement.querySelectorAll('.cell');
            const player1Div = document.querySelector('.player1');
            const player2Div = document.querySelector('.player2');
            const resetButton = document.getElementById('reset-button');

            let currentPlayer = 'X';
            let selectedCells = [];
            let player1Name = 'Player 1';
            let player2Name = 'Player 2';
            let player1Choice = 'X';
            let player2Choice = 'O';
            resetButton.style.display = 'none';


            function initializeGame() {
                startButton.style.display = 'none';
                choiceForm.style.display = 'block';
            }

            function resetGame() {
                cells.forEach(cell => {
                    cell.textContent = '';
                });

                currentPlayer = 'X';
                selectedCells = [];
                gameBoard.forEach(cell => {
                    cell.value = '';
                });

                player1Div.style.color = 'black';
                player2Div.style.color = 'black';

            }

            function handleFormSubmit(e) {
                e.preventDefault();
                const formData = new FormData(form);
                player1Choice = formData.get('choice');
                player2Choice = player1Choice === 'X' ? 'O' : 'X';

                player1Name = formData.get('player1name') || 'Player 1';
                player2Name = formData.get('player2name') || 'Player 2';

                player1Div.innerHTML = `${player1Name} <br><span class="player-choice">(${player1Choice})</span>`;
                player2Div.innerHTML = `${player2Name} <br><span class="player-choice">(${player2Choice})</span>`;

                choiceForm.style.display = 'none';
                gameBoardElement.style.display = 'grid';
                resetButton.style.display = 'block';

                cells.forEach(cell => {
                    cell.addEventListener('click', handleCellClick);
                });
            }

            function handleCellClick() {
                const cell = this;
                if (!selectedCells.includes(cell.id) && cell.textContent === '') {
                    cell.textContent = currentPlayer;
                    selectedCells.push(cell.id);
                    gameBoard[cell.id - 1].value = currentPlayer;

                    if (checkWin(currentPlayer)) {
                        highlightWinner(currentPlayer);
                    } else if (checkDraw()) {
                        resetGame();
                    } else {
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    }
                }
            }

            function checkWin(player) {
                const winningCombos = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [2, 4, 6]
                ];

                for (const combo of winningCombos) {
                    const [a, b, c] = combo;
                    if (
                        gameBoard[a].value === player &&
                        gameBoard[b].value === player &&
                        gameBoard[c].value === player
                    ) {
                        return true;
                    }
                }
                return false;
            }

            function checkDraw() {
                return selectedCells.length === 9;
            }

            function highlightWinner(player) {
                if (player === player1Choice) {
                    player1Div.style.color = 'green';
                    player2Div.style.color = 'red';
                } else {
                    player1Div.style.color = 'red';
                    player2Div.style.color = 'green';
                }
            
                setTimeout(resetGame, 1500);
            }

            startButton.addEventListener('click', initializeGame);
            resetButton.addEventListener('click', function () {
                resetGame();
                choiceForm.style.display = 'block';
            });
             form.addEventListener('submit', handleFormSubmit);
        });
    }

    startTicTacToeGame();
})();