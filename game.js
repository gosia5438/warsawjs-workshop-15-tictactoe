'use strict';


document.addEventListener('DOMContentLoaded', function () {
    var resetButton = document.getElementById('reset-score');

    var playerClasses = {
        'playerA': 'red',
        'playerB': 'blue'
    };
    var scores = {
        'playerA': 0,
        'playerB': 0
    }

    //tworzenie zmiennych do zmiany nazwy uzytkownika
    var names = {
        'playerA': 'playerA',
        'playerB': 'playerB'
    }


    var currentPlayer;
    var emptyFields;

    initGame();

    resetButton.addEventListener('click', function () {
        scores['playerA'] = 0;
        scores['playerB'] = 0;

        displayPlayerScore('playerA');
        displayPlayerScore('playerB');
    });

    //zmiana nazwy uzytkownia w prompt 

    for (let player in names) {
        let renameButton = document.getElementById(`${player}-rename`);
        renameButton.innerText = `Name of ${player}`;
        renameButton.addEventListener('click', function () {
            names[player] = prompt(`Name of ${player} to:`);
            renameButton.innerText = `Name of ${names[player]}`;
            displayRoundInformation();
            displayPlayerScore('playerA');
            displayPlayerScore('playerB');
        })
    }

    function displayPlayerScore(player) {
        var score = document.getElementById(`${player}-score`);

        score.innerHTML = `${names[player]} score: ${scores[player]}`;
    }

    function updatePlayerScore(player) {
        scores[player]++;
    }

    function displayRoundInformation() {
        var round = document.getElementById('round-info');
        round.className = playerClasses[currentPlayer];
        round.innerHTML = `Round for ${names[currentPlayer]}`;
        displayPlayerScore('playerA');
        displayPlayerScore('playerB');
    }

    function initGame() {
        // Find all divs in .board and make them clieckable fields
        var fields = document.querySelectorAll('.board > div');

        //Set current player (to 0 = red player)
        currentPlayer = 'playerA';

        // For each field (div) add function that will run when we click it
        fields.forEach(field => field.addEventListener('click', fieldClickHandler));
        fields.forEach(field => field.removeAttribute('class'));
        emptyFields = 9;
        displayRoundInformation();
    }

    function fieldClickHandler() {
        //Get player class name
        var playerClass = playerClasses[currentPlayer];
        this.classList.add(playerClass);

        /*Switch players: if 0 switch to 1, if 1 switch to 0 
        if (currentPlayer === 'playerA'){currenPlayer = 'playerB';
        } else {currentPlayer = 'playerA';}        
        */
        emptyFields--;
        currentPlayer = currentPlayer === 'playerA' ? 'playerB' : 'playerA';
        displayRoundInformation();
        this.removeEventListener('click', fieldClickHandler);
        // zapobiega dwukrotnemu kliknieciu w to samo pole (zmiany koloru)

        checkWinner();
    }

    function checkWinner() {
        var fields = document.querySelectorAll('.board > div');

        /*  +---+---+---+
             | 0 | 1 | 2 |
             +---+---+---+
             | 3 | 4 | 5 |
             +---+---+---+
             | 6 | 7 | 8 |
             +---+---+---+   */

        var row1 = fields[0].className + fields[1].className + fields[2].className;
        var row2 = fields[3].className + fields[4].className + fields[5].className;
        var row3 = fields[6].className + fields[7].className + fields[8].className;

        var column1 = fields[0].className + fields[3].className + fields[6].className;
        var column2 = fields[1].className + fields[4].className + fields[7].className;
        var column3 = fields[2].className + fields[5].className + fields[8].className;
        var diagonal1 = fields[0].className + fields[4].className + fields[8].className;
        var diagonal2 = fields[6].className + fields[4].className + fields[2].className;

        var boardCheck = [row1, row2, row3, column1, column2, column3, diagonal1, diagonal2];

        if (boardCheck.includes('redredred')) {
            setTimeout(() => {
                alert(`${names['playerA']} Wins!`);
                updatePlayerScore('playerA');
                initGame();
            }, 100);
            return;
        }
        if (boardCheck.includes('blueblueblue')) {
            setTimeout(() => {
                alert(`${names['playerB']} Wins!`);
                updatePlayerScore('playerB');
                initGame();
            }, 100);
            return;
        }
        if (emptyFields === 0) {
            setTimeout(() => { // to samo co 
                alert('Nobody won! End of the game!');
                initGame();
            }, 100);
            return;
        }
    }
});