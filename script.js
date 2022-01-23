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
const displayCOntroller = (() => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      console.log("hello");
    });
  });
})();
