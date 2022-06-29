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
    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex,getCurrentPlayer());
        round++;
    }
    const getCurrentPlayer= () => {
        return round % 2 === 1 ? player1: player2;
      };
    const getGameOver = () => gameOver;
    const getRound = () => round;

    
    return( {playRound,getCurrentPlayer,getGameOver,getRound} );

})();

const displayController = (() => {

    const fieldDivs = document.querySelectorAll(".field");

    fieldDivs.forEach((fieldDiv,index) => {
        
        fieldDiv.addEventListener('click',(e) => {
            if (gameController.getGameOver() || e.target.innerHTML !== "") return;
            gameController.playRound(index);
            fillBoard();
        })
    })

    const fillBoard = () => {
        for(let i=0;i<9;i++){
            if(gameBoard.getField(i)!=undefined)
                fieldDivs[i].innerHTML = gameBoard.getField(i);
            else
                fieldDivs[i].innerHTML="";
        }
    }

    return ({fillBoard});
})();

gameController.playRound(0);
displayController.fillBoard();



