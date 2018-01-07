'use strict';


document.addEventListener('DOMContentLoaded', function () {
    
     var playerClasses = {
     'playerA' : 'red',
     'playerB' : 'blue'
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
        
        /*Switch players
        if 0 switch to 1
        if 1 switch to 0 
        if (currentPlayer === 'playerA') {
            currenPlayer = 'playerB';
        } else {
            currentPlayer = 'playerA';
        }        
        */
            emptyFields--;
        currentPlayer = currentPlayer === 'playerA' ? 'playerB' : 'playerA';
        
        this.removeEventListener('click',fieldClickHandler);
        // zapobiega dwukrotnemu kliknieciu w to samo pole (zmiany koloru)
        
        if(emptyFields === 0) {
            alert('End of the Game');
        }
    }        
});