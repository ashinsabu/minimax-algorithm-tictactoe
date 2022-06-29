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

})();

const displayController = (() => {

    const fieldDivs = document.querySelectorAll(".field");
    const fillBoard = () => {
        for(let i=0;i<9;i++){
            fieldDivs[i].innerHTML = gameBoard.getField(i);
        }
    }
})();


console.log(gameBoard.getField(1));



