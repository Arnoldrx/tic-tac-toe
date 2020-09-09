//HTML Elelments
const status = document.querySelector('.status');
const reset = document.querySelector('.reset');
const gameCell = document.querySelectorAll('.game-cell');


//game constant
const xSymbol = '×';
const oSymbol = '○';

//game variables 
let gameisOn = true;
let xIsNext = true;

//functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;
const HandleWin = (letter) => {
    gameisOn = false;
    if (letter === 'x') {
        status.innerHTML = `${letterToSymbol(letter)} has won!`;
    } else {
        status.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    }
};
const CheckGameStatus = () => {
    const topLeft = gameCell[0].classList[1];
    const topMiddle = gameCell[1].classList[1];
    const topRight = gameCell[2].classList[1];
    const MiddleLeft = gameCell[3].classList[1];
    const MiddleMiddle = gameCell[4].classList[1];
    const MiddleRight = gameCell[5].classList[1];
    const BottomLeft = gameCell[6].classList[1];
    const BottomMiddle = gameCell[7].classList[1];
    const BottomRight = gameCell[8].classList[1];

    // Check winner
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        HandleWin(topLeft);
        gameCell[0].classList.add("won");
        gameCell[1].classList.add("won");
        gameCell[2].classList.add("won");
    } else if (MiddleLeft && MiddleLeft === MiddleMiddle && MiddleLeft === MiddleRight) {
        HandleWin(MiddleLeft);
        gameCell[3].classList.add("won");
        gameCell[4].classList.add("won");
        gameCell[5].classList.add("won");
    } else if (BottomLeft && BottomLeft === BottomMiddle && BottomLeft === BottomRight) {
        HandleWin(BottomLeft);
        gameCell[6].classList.add("won");
        gameCell[7].classList.add("won");
        gameCell[8].classList.add("won");
    } else if (topLeft && topLeft === MiddleLeft && topLeft === BottomLeft) {
        HandleWin(topLeft);
        gameCell[0].classList.add("won");
        gameCell[3].classList.add("won");
        gameCell[6].classList.add("won");
    } else if (topMiddle && topMiddle === MiddleMiddle && topMiddle === BottomMiddle) {
        HandleWin(topMiddle);
        gameCell[1].classList.add("won");
        gameCell[4].classList.add("won");
        gameCell[7].classList.add("won");
    } else if (topRight && topRight === MiddleRight && topRight === BottomRight) {
        HandleWin(topRight);
        gameCell[2].classList.add("won");
        gameCell[5].classList.add("won");
        gameCell[8].classList.add("won");
    } else if (topLeft && topLeft === MiddleMiddle && topLeft === BottomRight) {
        HandleWin(topLeft);
        gameCell[0].classList.add("won");
        gameCell[4].classList.add("won");
        gameCell[8].classList.add("won");
    } else if (topRight && topRight === MiddleMiddle && topRight === BottomLeft) {
        HandleWin(topRight);
        gameCell[2].classList.add("won");
        gameCell[4].classList.add("won");
        gameCell[6].classList.add("won");
    } else if (topLeft && topMiddle && topRight && MiddleLeft && MiddleMiddle && MiddleRight &&
        BottomLeft && BottomMiddle && BottomRight) {
        gameisOn = false;
        status.innerHTML = "Game is tied";
    } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            status.innerHTML = `${xSymbol} is next`;
        } else {
            status.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
};


//Event Handlers

const HandleReset = () => {
    xIsNext = true;
    status.innerHTML = `${xSymbol} is next`;
    for (const gameCells of gameCell) {
        gameCells.classList.remove('x');
        gameCells.classList.remove('o');
        gameCells.classList.remove('won');
        gameisOn = true;
    }
};
const HandleCellClick = (e) => {
    const classList = e.target.classList;


    if (!gameisOn || classList[1] === 'x' || classList[1] === 'o') {
        return;
    }

    if (xIsNext) {
        e.target.classList.add('x');
        CheckGameStatus();
    } else {
        e.target.classList.add('o');
        CheckGameStatus();
    }
};

//Event Listeners
reset.addEventListener("click", HandleReset);

for (const gameCells of gameCell) {
    gameCells.addEventListener('click', HandleCellClick);
}