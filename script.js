const playerFactory = (name, sign, isActive) => {
  let state = {
    name,
    sign,
    isActive,
  };
  return {
    get name() {
      return state.name;
    },
    get sign() {
      return state.sign;
    },
    get isActive() {
      return state.isActive;
    },
    toggle() {
      if (state.isActive === true) {
        state.isActive = false;
      } else {
        state.isActive = true;
      }
    },
  };
};
const gameBoard = (() => {
  let board = new Array(9).fill("");
  function setCell(index, sign) {
    board[index] = sign;
  }
  function resetBoard() {
    board = new Array(9).fill("");
  }

  return {
    get getBoard() {
      return board;
    },
    setCell,
    resetBoard,
  };
})();
const displayController = (() => {
  const display = document.querySelector(".display-message");
  function turnMessage(player) {
    display.textContent = `It's ${player.name}'s turn`;
  }

  function winMessage(player) {
    display.textContent = `${player.name} has won this match!!!`;
  }
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.textContent === "" && gameFlow.gameOver === false) {
        if (gameFlow.player1.isActive) {
          cell.textContent = gameFlow.player1.sign;
          gameBoard.setCell(`${cell.getAttribute("data-index")}`, "X");
          gameFlow.player1.toggle();
          gameFlow.player2.toggle();
          gameFlow.round++;
          turnMessage(gameFlow.player2);
          gameFlow.winCheck(gameFlow.player1);
        } else if (gameFlow.player2.isActive) {
          cell.textContent = gameFlow.player2.sign;
          gameBoard.setCell(`${cell.getAttribute("data-index")}`, "O");
          gameFlow.player2.toggle();
          gameFlow.player1.toggle();
          gameFlow.round++;
          turnMessage(gameFlow.player1);
          gameFlow.winCheck(gameFlow.player2);
        }
      }
    });
  });
  const restartButton = document.getElementById("restart");
  restartButton.addEventListener("click", () => {
    gameFlow.reset();
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  });
  return { winMessage, turnMessage };
})();
const gameFlow = (() => {
  const player1 = playerFactory("Player 1", "X", true);
  const player2 = playerFactory("Player 2", "O", false);
  let round = 0;
  let gameOver = false;
  displayController.turnMessage(player1);

  function reset() {
    gameFlow.round = 0;
    gameFlow.gameOver = false;
    gameBoard.resetBoard();
    displayController.turnMessage(player1);
    if (gameFlow.player1.isActive === false) {
      gameFlow.player1.toggle();
    }
    if (gameFlow.player2.isActive === true) {
      gameFlow.player2.toggle();
    }
  }
  function winCheck(player) {
    if (
      (gameBoard.getBoard[0] === gameBoard.getBoard[1] &&
        gameBoard.getBoard[1] === gameBoard.getBoard[2] &&
        gameBoard.getBoard[0] !== "") ||
      (gameBoard.getBoard[3] === gameBoard.getBoard[4] &&
        gameBoard.getBoard[4] === gameBoard.getBoard[5] &&
        gameBoard.getBoard[3] !== "") ||
      (gameBoard.getBoard[6] === gameBoard.getBoard[7] &&
        gameBoard.getBoard[7] === gameBoard.getBoard[8] &&
        gameBoard.getBoard[6] !== "") ||
      (gameBoard.getBoard[0] === gameBoard.getBoard[3] &&
        gameBoard.getBoard[3] === gameBoard.getBoard[6] &&
        gameBoard.getBoard[0] !== "") ||
      (gameBoard.getBoard[1] === gameBoard.getBoard[4] &&
        gameBoard.getBoard[4] === gameBoard.getBoard[7] &&
        gameBoard.getBoard[1] !== "") ||
      (gameBoard.getBoard[2] === gameBoard.getBoard[5] &&
        gameBoard.getBoard[5] === gameBoard.getBoard[8] &&
        gameBoard.getBoard[2] !== "") ||
      (gameBoard.getBoard[0] === gameBoard.getBoard[4] &&
        gameBoard.getBoard[4] === gameBoard.getBoard[8] &&
        gameBoard.getBoard[0] !== "") ||
      (gameBoard.getBoard[2] === gameBoard.getBoard[4] &&
        gameBoard.getBoard[4] === gameBoard.getBoard[6] &&
        gameBoard.getBoard[2] !== "")
    ) {
      displayController.winMessage(player);
      gameFlow.gameOver = true;
    }
  }
  return { player1, player2, round, reset, winCheck, gameOver };
})();
