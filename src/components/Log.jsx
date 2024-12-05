export default function Log(props) {
  const { turns } = props;

  return (
    <ol id="log">
      {turns.map((turn, index) => (
        <li key={index}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
