import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const players = [
  { name: "Player 01", symbol: "X" },
  { name: "Player 02", symbol: "O" },
];

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  const currentPlayer = "X";
  const [firstTurn] = turns;

  if (turns.length > 0 && firstTurn.player === "X") {
    return "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((elem) => [...elem])];

  // gameBoard value change based on gameTurns
  for (const gameTurn of gameTurns) {
    const { square, player } = gameTurn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  // check winners
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (firstSquare) {
      if (firstSquare === secondSquare && firstSquare === thirdSquare) {
        winner = firstSquare;
        continue;
      }
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurn((prevGameTurn) => {
      const currentPlayer = deriveActivePlayer(prevGameTurn);

      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn,
      ];
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {players.map((player, playerIndex) => (
            <Player
              key={playerIndex}
              {...player}
              isActive={activePlayer === player.symbol}
            />
          ))}
        </ol>

        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            onRestart={() => {
              setGameTurn([]);
            }}
          />
        )}

        <GameBoard
          onSelectSquare={handleSelectedSquare}
          activePlayerSymbol={activePlayer}
          gameBoard={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
