'use strict';


document.addEventListener('DOMContentLoaded', function () {

    var playerClasses = {
        'playerA': 'red',
        'playerB': 'blue'
    };
    var currentPlayer;
    var emptyFields;

    initGame();

    function initGame() {
        // Find all divs in .board and make them clieckable fields
        var fields = document.querySelectorAll('.board > div');

        //Set current player (to 0 = red player)
        currentPlayer = 'playerA';

        // For each field (div) add function that will run when we click it
        fields.forEach(field => field.addEventListener('click', fieldClickHandler));
        emptyFields = 9;
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
				alert("Red Wins!");
				initGame();
			}, 100);
            return;
        }
        if (boardCheck.includes('blueblueblue')) {
            setTimeout(() => {
				alert("Blue Wins!");
				initGame();
			}, 100);
            return;
        }
        if(emptyFields === 0) {
            setTimeout(() => { // to samo co setTimeout(function())
                alert('Tie');
                initGame();
            }, 100);
            return;
		}
    }
});