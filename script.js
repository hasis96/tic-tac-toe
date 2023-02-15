const grid = document.querySelectorAll('.grid');
const resetButton = document.getElementById('resetButton');

const gameBoard = (() => {

    //stores player's moves with player's marker
    let board = ['', '', '',
                 '', '', '',
                 '', '', '',];

    //nested arrays of possible win conditions
    const winCon = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8],
        [3, 4, 5], [6, 7, 8], [1, 4, 7],
        [2, 5, 8], [2, 4, 6]];

    //keeps track of who's turn it is
    let turn = 0;

    //keeps track of game state
    let gameWin = false;
    let gameTie = false;

    //creates players through factory a factory function
    const createPlayer = (player, marker) => {
        moves = [];
        return { player, marker, moves}
    }
    const player1 = createPlayer('player1', 'X');
    const player2 = createPlayer('player2', 'O');

    //resets 
    resetButton.addEventListener('click', function() {
        board = ['', '', '',
                '', '', '',
                '', '', '',];
        turn = 0;
        gameWin = false;
        gameTie = false;
        player1.moves = [];
        player2.moves = [];  
        for (let i = 0; i < board.length; i++) {
            grid[i].textContent = board[i];
        }
    });

    //uses winCon to check if there is a row of player markers indicating a win
    const winnerCheck = (player) => {

        let sortedMoves = player.moves.sort();
        console.log(sortedMoves)

    //checks if board has any empty 
        for (let i = 0; i < board.length; i++) {
            if (board[i] == '') {
                gameTie = false;
                break;
            } else {
                gameTie = true;
            }
        }

        for (let i = 0; i < winCon.length; i++) {
            for (let z = 0; z < winCon[i].length; z++) {
                if (board[winCon[i][0]] == player.marker &&
                    board[winCon[i][1]] == player.marker &&
                    board[winCon[i][2]] == player.marker ) {
                    gameWin = true;
                    console.log('gamewin: ' + gameWin);
                } else if (gameTie == true) {
                    console.log('gameTie: ' + gameTie);

                }
            };
        };
    };
    

    const playerTurn = (() => {
        grid.forEach(grid => {
            grid.addEventListener('click', e => {

                /*
                when a grid is clicked: it is checked if a move has already been played
                on that grid, checks who's turn it is, and checks the game state.

                if no move has been played yet, the player's marker is placed on the board
                and grid to save their move.
                */
                if (e.target.textContent == '' && turn % 2 == 0
                    && gameWin == false && gameTie == false) {
                        player1.moves.push(e.target.id);
                        board[e.target.id] = player1.marker;
                        grid.textContent = player1.marker;
                        winnerCheck(player1);
                        turn++;

                } else if (e.target.textContent == '' && turn % 2 == 1
                    && gameWin == false && gameTie == false) {
                        player2.moves.push(e.target.id);
                        board[e.target.id] = player2.marker;
                        grid.textContent = player2.marker;
                        winnerCheck(player2);
                        turn++;

                } else if (gameWin == true || gameTie == true){
                    console.log('error');
                }
            });
        });
    });


    return {
        playerTurn,
        player1,
        player2,
        resetButton    }
})();

gameBoard.playerTurn();
