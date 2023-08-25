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

            choiceForm.style.display = 'none';
            gameBoardElement.style.display = 'none';

            let currentPlayer = 'X';
            let selectedCells = [];

            startButton.addEventListener('click', function () {
                startButton.style.display = 'none';
                choiceForm.style.display = 'block';
            });

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(form);
                const player1Choice = formData.get('choice');
                const player2Choice = player1Choice === 'X' ? 'O' : 'X';
                alert(`Player 1 chose "${player1Choice}"\nPlayer 2 gets "${player2Choice}"`);
                choiceForm.style.display = 'none';
                gameBoardElement.style.display = 'grid';

                cells.forEach(cell => {
                    cell.addEventListener('click', function () {
                        if (!selectedCells.includes(cell.id) && cell.textContent === '') {
                            cell.textContent = currentPlayer;
                            selectedCells.push(cell.id);
                            gameBoard[cell.id - 1].value = currentPlayer;

                            if (checkWin(currentPlayer)) {
                                alert(`Player ${currentPlayer} wins!`);
                                resetGame();
                            } else if (checkDraw()) {
                                alert("It's a draw!");
                                resetGame();
                            } else {
                                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                            }
                        }
                    });
                });


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

                
                function resetGame() {
                    
                    cells.forEach(cell => {
                        cell.textContent = '';
                    });

                
                    currentPlayer = 'X';
                    selectedCells = [];
                    gameBoard.forEach(cell => {
                        cell.value = '';
                    });
                }
            });
        });
    }

    startTicTacToeGame();
})();