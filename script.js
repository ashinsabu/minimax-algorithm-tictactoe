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

const gameController = (() => {
    const player1 = Player ('X');
    const player2 = Player ('O');
    let round = 1;
    let gameOver = false;
    const messagearea = document.querySelector('.message');

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex,getCurrentPlayer());
        messagearea.innerHTML= (getCurrentPlayer()==player1 ? "Player O's turn":"Player X's turn");
        round++;
        if(checkGameOver() !== " "){
            if(checkGameOver() === "Draw"){
                messagearea.innerHTML = "It's a draw.";
                messagearea.style.color = "orange";
                gameOver=true;
            }
            else{
                messagearea.innerHTML = "Player " + checkGameOver() + " wins!";
                messagearea.style.color = "blue";
                gameOver=true;
            }
        }
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
        else if(round==10)
            return ("Draw");
        else return (" ");
    }
    return( {playRound,getCurrentPlayer,getGameOver,getRound} );

})();

const displayController = (() => {
    const gamemodes = document.querySelectorAll('.gamemode');

    gamemodes.forEach((gamemode) => {
        gamemode.addEventListener('click',() => {

            const gamemodeselector = document.querySelector('.gamemode-selector-area');
            gamemodeselector.classList.add('invisible');
            const boardContainer = document.querySelector('.board-container');
            boardContainer.classList.remove('invisible');
            const messagearea = document.querySelector('.message');
            messagearea.innerHTML= "Player X's turn";

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



