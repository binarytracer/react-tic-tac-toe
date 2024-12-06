import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_PLAYER_INFO = {
  X: "Player 01",
  O: "Player 02",
};

const INITIAL_GAME_BOARD = [
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

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((elem) => [...elem])];

  for (const gameTurn of gameTurns) {
    const { square, player } = gameTurn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol) {
      if (
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        winner = players[firstSquareSymbol];
        continue;
      }
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYER_INFO);
  const playerInfos = Object.keys(players).map((key) => ({
    symbol: key,
    name: players[key],
  }));

  const [gameTurns, setGameTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
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

  function handleRestart() {
    setGameTurn(() => []);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayerNames) => ({
      ...prevPlayerNames,
      [symbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {playerInfos.map((player, playerIndex) => (
            <Player
              key={playerIndex}
              {...player}
              isActive={activePlayer === player.symbol}
              onChangeName={handlePlayerNameChange}
            />
          ))}
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={() => handleRestart()} />
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
