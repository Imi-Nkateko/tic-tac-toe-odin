const Gameboard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const resetBoard = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        board[row][col] = "";
      }
    }
  };

  const updateCell = (row, col, symbol) => {
    if (board[row][col] === "") {
      board[row][col] = symbol;
      return true;
    }
    return false;
  };

  const displayBoard = () => {
    board.forEach((row) => {
      console.log(row.join(" | "));
    });
  };

  const checkWin = (symbol) => {
    for (let row = 0; row < 3; row++) {
      if (board[row].every((cell) => cell === symbol)) return true;
    }

    for (let col = 0; col < 3; col++) {
      if (board.every((row) => row[col] === symbol)) return true;
    }

    if (
      board[0][0] === symbol &&
      board[1][1] === symbol &&
      board[2][2] === symbol
    )
      return true;
    if (
      board[0][2] === symbol &&
      board[1][1] === symbol &&
      board[2][0] === symbol
    )
      return true;

    return false;
  };

  const checkTie = () => {
    return board.every((row) => row.every((cell) => cell !== ""));
  };

  return {
    board,
    resetBoard,
    updateCell,
    displayBoard,
    checkWin,
    checkTie,
  };
})();


const Player = (symbol) => {
    return {
      symbol
    };
  };
  

  const Game = (function() {
    const player1 = Player('X');
    const player2 = Player('O');
    let currentPlayer = player1;
    let gameOver = false;
  
    const switchTurn = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const makeMove = (row, col) => {
      if (gameOver) {
        console.log("Game over! Please reset the game.");
        return;
      }
  
      if (Gameboard.updateCell(row, col, currentPlayer.symbol)) {
        Gameboard.displayBoard();
        
        // Check for winner
        if (Gameboard.checkWin(currentPlayer.symbol)) {
          console.log(`${currentPlayer.symbol} wins!`);
          gameOver = true;
        } else if (Gameboard.checkTie()) {
          console.log("It's a tie!");
          gameOver = true;
        } else {
          switchTurn();
        }
      } else {
        console.log("Invalid move, try again.");
      }
    };
  
    const resetGame = () => {
      Gameboard.resetBoard();
      currentPlayer = player1;
      gameOver = false;
      Gameboard.displayBoard();
    };
  
    return {
      makeMove,
      resetGame
    };
  })();
  
  // Start a new game
Game.resetGame();

// Player 1 makes a move
Game.makeMove(0, 0); // Player X moves to (0, 0)
Game.makeMove(1, 1); // Player O moves to (1, 1)
Game.makeMove(0, 1); // Player X moves to (0, 1)
Game.makeMove(1, 0); // Player O moves to (1, 0)
Game.makeMove(0, 2); // Player X moves to (0, 2), X wins
