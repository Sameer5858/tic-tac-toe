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
    change(name) {
      state.name = name;
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
  const restartButton = document.getElementById("restart");
  const cells = document.querySelectorAll(".cell");
  const display = document.querySelector(".display-message");
  const startButton = document.getElementById("start");
  // event listener for start button to set player names and show the game board
  startButton.addEventListener("click", () => {
    const playerX = document.getElementById("playerX");
    const playerO = document.getElementById("playerO");
    const playerSelectMenu = document.querySelector(".player");
    const gameBoard = document.getElementById("gameboard");
    const restartDiv = document.querySelector(".restart");
    const startDiv = document.querySelector(".start");

    if (playerX.value !== "") {
      gameFlow.player1.change(playerX.value);
    }
    if (playerO.value !== "") {
      gameFlow.player2.change(playerO.value);
    }
    displayController.turnMessage(gameFlow.player1);
    playerSelectMenu.classList.add("hide");
    startDiv.classList.add("hide");
    display.classList.remove("hide");
    gameBoard.classList.remove("hide");
    restartDiv.classList.remove("hide");
  });

  // function to show players turn
  function turnMessage(player) {
    display.textContent = `${player.name}'s turn.`;
  }
  // function to display win message
  function winMessage(player) {
    display.textContent = `${player.name} has won this match!!!`;
  }

  // event listener for click in cells to show the signs
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.textContent === "" && gameFlow.gameOver === false) {
        if (gameFlow.player1.isActive) {
          cell.textContent = gameFlow.player1.sign;
          cell.classList.add("taken");
          gameBoard.setCell(`${cell.getAttribute("data-index")}`, "X");
          gameFlow.player1.toggle();
          gameFlow.player2.toggle();
          gameFlow.round++;
          turnMessage(gameFlow.player2);
          if (gameFlow.round === 9) {
            display.textContent = "It's a tie.";
          }
          gameFlow.winCheck(gameFlow.player1);
        } else if (gameFlow.player2.isActive) {
          cell.textContent = gameFlow.player2.sign;
          cell.classList.add("taken");
          gameBoard.setCell(`${cell.getAttribute("data-index")}`, "O");
          gameFlow.player2.toggle();
          gameFlow.player1.toggle();
          gameFlow.round++;
          turnMessage(gameFlow.player1);
          if (gameFlow.round === 9) {
            display.textContent = "It's a tie.";
          }
          gameFlow.winCheck(gameFlow.player2);
        }
      }
    });
  });
  // event listener for restart button to clear everything and start from start
  restartButton.addEventListener("click", () => {
    gameFlow.reset();
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("taken");
    });
  });
  return { winMessage, turnMessage };
})();
const gameFlow = (() => {
  let round = 0;
  let gameOver = false;
  const player1 = playerFactory("Player 1", "X", true);
  const player2 = playerFactory("Player 2", "O", false);

  // function to reset to be called by restart button
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
  // function to check win to be called by click on cells
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
