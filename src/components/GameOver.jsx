export default function GameOver(props) {
  const { winner, onRestart } = props;

  let message = <p>{winner}, won!</p>;

  if (!winner) {
    message = <p>It's a draw!</p>;
  }

  return (
    <div id="game-over">
      <h2>Game over</h2>
      {message}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
