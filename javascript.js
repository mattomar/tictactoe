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

    // Initially hide the choice form
    choiceForm.style.display = 'none';

    // Listen for the "Start Game" button click
    startButton.addEventListener('click', function () {
        startButton.style.display = 'none'; // Hide the start button
        choiceForm.style.display = 'block'; // Show the choice form
    });

    // Listen for the form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const player1Choice = formData.get('choice');
        const player2Choice = player1Choice === 'X' ? 'O' : 'X';
        alert(`Player 1 chose "${player1Choice}"\nPlayer 2 gets "${player2Choice}"`);
        choiceForm.style.display = 'none'; // Hide the choice form after submission
    });
});
