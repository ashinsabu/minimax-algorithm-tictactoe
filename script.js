// game board module

const gameBoard = (() => {
    const boardArray = Array(9)

    const getField = (n) => boardArray[n];

    const setField = (n,player) => { 
        boardArray[n] = player.getSign();
    }
    

    const clear = () => {
        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i] = undefined;
        }
    }

    return ({getField,setField,clear});
})();

const Player = (sign) => {
    let _sign = sign;
    const getSign = () => _sign;
    const setSign = () => {
        _sign = sign;
    }
    return {
        getSign,
        setSign
    }
}

const resetbutton = document.querySelector('.reset-button');
resetbutton.addEventListener('click',() => {
    gameController.resetGame();
    resetbutton.classList.add('invisible');
})
const gameController = (() => {
    const player1 = Player ('X');
    const player2 = Player ('O');

    let pvaiPlayerObj=undefined, pvaiAIObj=undefined;

    let round = 1;
    let gameOver = false;
    const messagearea = document.querySelector('.message');
    
    //TODO: Option for player to switch symbols when playing
    //TODO: More UI
    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex,getCurrentPlayer());
        messagearea.innerHTML= (getCurrentPlayer()==player1 ? "Player O's turn":"Player X's turn");
        round++;

        if(pvaiAIObj != undefined){
            let curBoardState =[];
            for(let i=0;i<9;i++){
                curBoardState.push(gameBoard.getField(i));
            }
            let aiMove = minMaxAI.findBestMove(curBoardState);
            gameBoard.setField(aiMove, getCurrentPlayer());
            messagearea.innerHTML= (getCurrentPlayer()==player1 ? "Player O's turn":"Player X's turn");
            round++;
        }
        if(checkGameOver() !== " "){
            if(checkGameOver() === "Draw"){
                messagearea.innerHTML = "It's a draw.";
                messagearea.style.color = "orange";
                gameOver=true;
                resetbutton.classList.remove('invisible');
            }
            else{
                messagearea.innerHTML = "Player " + checkGameOver() + " wins!";
                messagearea.style.color = "blue";
                gameOver=true;
                resetbutton.classList.remove('invisible');
            }
        }
    }
    const resetGame = () => {
        console.log("game reset");
        round = 1;
        gameOver=false;
        gameBoard.clear();
        displayController.fillBoard();
        messagearea.style.color = "grey";
        messagearea.innerHTML = "Player X's turn";
        // for(let i=0;i<9;i++){
        //     gameBoard.setField(i,undefined);
        // }
    }
    const getCurrentPlayer = () => {
        return round % 2 === 1 ? player1: player2;
      };
    const getGameOver = () => gameOver;
    const getRound = () => round;

    const checkCols = () => {
        if(gameBoard.getField(0) == gameBoard.getField(3) && gameBoard.getField(3) == gameBoard.getField(6) && gameBoard.getField(0)!=undefined)
            return gameBoard.getField(0);
        if(gameBoard.getField(1) == gameBoard.getField(4) && gameBoard.getField(4) == gameBoard.getField(7) && gameBoard.getField(1)!=undefined)
            return gameBoard.getField(1);
        if(gameBoard.getField(2) == gameBoard.getField(5) && gameBoard.getField(5) == gameBoard.getField(8) && gameBoard.getField(2)!=undefined)
            return gameBoard.getField(2);
        return (" ");
    }

    const checkRows = () => {
        if(gameBoard.getField(0) == gameBoard.getField(1) && gameBoard.getField(1) == gameBoard.getField(2) && gameBoard.getField(0)!=undefined)
            return gameBoard.getField(0);
        if(gameBoard.getField(3) == gameBoard.getField(4) && gameBoard.getField(4) == gameBoard.getField(5) && gameBoard.getField(5)!=undefined)
            return gameBoard.getField(3);
        if(gameBoard.getField(6) == gameBoard.getField(7) && gameBoard.getField(7) == gameBoard.getField(8) && gameBoard.getField(8)!=undefined)
            return gameBoard.getField(6);
        return (" ");
    }
    /* 
       0 1 2
       3 4 5
       6 7 8
    */
    const checkDiags = () => {
        if(gameBoard.getField(0) == gameBoard.getField(4) && gameBoard.getField(4) == gameBoard.getField(8) && gameBoard.getField(8)!=undefined)
            return gameBoard.getField(0);
           
        if(gameBoard.getField(2) == gameBoard.getField(4) && gameBoard.getField(4) == gameBoard.getField(6) && gameBoard.getField(6)!=undefined)
            return gameBoard.getField(2);
        return (" ");
    }

    const checkGameOver = () => {
        if(checkRows() !== " "){
            console.log(checkRows() + "winbyrow");
            return checkRows();
        }
        else if(checkCols() !== " "){
            console.log(checkCols() + "winbycol");
            return checkCols();
        }
        else if(checkDiags() !== " "){
            console.log(checkDiags() + "winbydiag");
            return checkDiags();
        }
        else if(round>=10)
            return ("Draw");
        else return (" ");
    }

    const pvaichoosexo = () => {
        const xButton = document.querySelector('.xbutton');
        const oButton = document.querySelector('.obutton');
        if(xButton.classList.contains('active')){
            pvaiPlayerObj = player1;
            pvaiAIObj = player2;
        }
        else if(oButton.classList.contains('active')){
            pvaiPlayerObj = player2;
            pvaiAIObj = player1;
        }

    }
    return( {playRound,getCurrentPlayer,getGameOver,getRound,resetGame,pvaichoosexo} );

})();


const minMaxAI =(() => {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const randomMove = (boardState) => {
        let curavailableindexes =[];
        for(let i=0;i<9;i++){
            if(boardState[i]==undefined)
                curavailableindexes.push(i);
        }
        return (curavailableindexes[getRandomInt(curavailableindexes.length)]);

    }
    class Move
    {
        constructor()
        {
            let row,col;
        }
    }
 
    let player = 'o', opponent = 'x';
 
    function isMovesLeft(board)
    {
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)
                if (board[i][j] == '_')
                    return true;
                    
        return false;
    }
    
    function evaluate(b)
    {
        for(let row = 0; row < 3; row++)
        {
            if (b[row][0] == b[row][1] &&
                b[row][1] == b[row][2])
            {
                if (b[row][0] == player)
                    return +10;
                    
                else if (b[row][0] == opponent)
                    return -10;
            }
        }
    
        // Checking for Columns for X or O victory.
        for(let col = 0; col < 3; col++)
        {
            if (b[0][col] == b[1][col] &&
                b[1][col] == b[2][col])
            {
                if (b[0][col] == player)
                    return +10;
    
                else if (b[0][col] == opponent)
                    return -10;
            }
        }
    
        // Checking for Diagonals for X or O victory.
        if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
        {
            if (b[0][0] == player)
                return +10;
                
            else if (b[0][0] == opponent)
                return -10;
        }
    
        if (b[0][2] == b[1][1] &&
            b[1][1] == b[2][0])
        {
            if (b[0][2] == player)
                return +10;
                
            else if (b[0][2] == opponent)
                return -10;
        }
    
        // won then return 0
        return 0;
    }
    
    // This is the minimax function.
    function minimax(board, depth, isMax)
    {
        let score = evaluate(board);
    
        // If Maximizer has won the game
        // return his/her evaluated score
        if (score == 10)
            return score;
    
        // If Minimizer has won the game
        // return his/her evaluated score
        if (score == -10)
            return score;
    
        // If there are no more moves and
        // no winner then it is a tie
        if (isMovesLeft(board) == false)
            return 0;
    
        // If this maximizer's move
        if (isMax)
        {
            let best = -1000;
    
            // Traverse all cells
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    
                    // Check if cell is empty
                    if (board[i][j]=='_')
                    {
                        
                        // Make the move
                        board[i][j] = player;
    
                        // Call minimax recursively
                        // and choose the maximum value
                        best = Math.max(best, minimax(board,
                                        depth + 1, !isMax));
    
                        // Undo the move
                        board[i][j] = '_';
                    }
                }
            }
            return best;
        }
    
        // If this minimizer's move
        else
        {
            let best = 1000;
    
            // Traverse all cells
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    
                    // Check if cell is empty
                    if (board[i][j] == '_')
                    {
                        
                        // Make the move
                        board[i][j] = opponent;
    
                        // Call minimax recursively and
                        // choose the minimum value
                        best = Math.min(best, minimax(board,
                                        depth + 1, !isMax));
    
                        // Undo the move
                        board[i][j] = '_';
                    }
                }
            }
            return best;
        }
    }
    
    // This will return the best possible
    // move for the player
    const findBestMove = (boardArray) =>{
        let board = [
            [(boardArray[0]=='X'?'x':(boardArray[0]=='O'?'o':"_")), (boardArray[1]=='X'?'x':(boardArray[1]=='O'?'o':"_")), (boardArray[2]=='X'?'x':(boardArray[2]=='O'?'o':"_"))],
            [(boardArray[3]=='X'?'x':(boardArray[3]=='O'?'o':"_")), (boardArray[4]=='X'?'x':(boardArray[4]=='O'?'o':"_")), (boardArray[5]=='X'?'x':(boardArray[5]=='O'?'o':"_"))],
            [(boardArray[6]=='X'?'x':(boardArray[6]=='O'?'o':"_")), (boardArray[7]=='X'?'x':(boardArray[7]=='O'?'o':"_")), (boardArray[8]=='X'?'x':(boardArray[8]=='O'?'o':"_"))]
        ];
        let bestVal = -1000;
        let bestMove = new Move();
        bestMove.row = -1;
        bestMove.col = -1;
    
        // Traverse all cells, evaluate
        // minimax function for all empty
        // cells. And return the cell
        // with optimal value.
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                
                // Check if cell is empty
                if (board[i][j] == '_')
                {
                    
                    // Make the move
                    board[i][j] = player;
    
                    // compute evaluation function
                    // for this move.
                    let moveVal = minimax(board, 0, false);
    
                    // Undo the move
                    board[i][j] = '_';
    
                    // If the value of the current move
                    // is more than the best value, then
                    // update best
                    if (moveVal > bestVal)
                    {
                        bestMove.row = i;
                        bestMove.col = j;
                        bestVal = moveVal;
                    }
                }
            }
        }
    
        return (bestMove.row*3 + bestMove.col);
    }

    return({randomMove,findBestMove});
})();

const displayController = (() => {
    const gamemodes = document.querySelectorAll('.gamemode');

    gamemodes.forEach((gamemode) => {
        gamemode.addEventListener('click',() => {

            if(gamemode.classList.contains('playervsplayer')){
                const gamemodeselector = document.querySelector('.gamemode-selector-area');
                gamemodeselector.classList.add('invisible');
                const boardContainer = document.querySelector('.board-container');
                boardContainer.classList.remove('invisible');
                const messagearea = document.querySelector('.message');
                messagearea.innerHTML= "Player X's turn";
            }
            else{
                const gamemodeselector = document.querySelector('.gamemode-selector-area');
                gamemodeselector.classList.add('invisible');
                const boardContainer = document.querySelector('.board-container');
                boardContainer.classList.remove('invisible');
                const messagearea = document.querySelector('.message');
                messagearea.innerHTML= "Player X's turn";
                const xoButton = document.querySelector('.pvai-sign-choose');
                xoButton.classList.remove('invisible');

                const xButton = document.querySelector('.xbutton');
                const oButton = document.querySelector('.obutton');

                xButton.addEventListener('click',() => {
                    oButton.classList.remove('active');
                    xButton.classList.add('active');
                    gameController.pvaichoosexo();
                });
                oButton.addEventListener('click',() => {
                    xButton.classList.remove('active');
                    oButton.classList.add('active');
                    gameController.pvaichoosexo();
                });
                gameController.pvaichoosexo();
                
            }

        })
    })

    const fieldDivs = document.querySelectorAll(".field");

    fieldDivs.forEach((fieldDiv,index) => {
        
        fieldDiv.addEventListener('click',(e) => {
            if (gameController.getGameOver() || e.target.innerHTML !== " ") return;
            gameController.playRound(index);
            fillBoard();
        })
    })

    const fillBoard = () => {
        for(let i=0;i<9;i++){
            if(gameBoard.getField(i)!=undefined)
                fieldDivs[i].innerHTML = gameBoard.getField(i);
            else
                fieldDivs[i].innerHTML=" ";
        }
    }

    return ({fillBoard});
})();

// gameController.playRound(0);
displayController.fillBoard();



