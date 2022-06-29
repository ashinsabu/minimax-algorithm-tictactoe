// game board module

const gameBoard = (() => {
    const boardArray = Array(9)
    const getField = (n) => boardArray[n];
    const setField = (n,player) => { 
        boardArray[n] = player.getSign();
    }

    return ({getField,setField});
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

const player1 = Player('x');
gameBoard.setField(1,player1);
console.log(gameBoard.getField(1));



