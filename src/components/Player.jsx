import { useState } from "react";

export default function Player(props) {
  const { name, symbol, isActive } = props;

  const [isEditing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{playerName}</span>}
        {isEditing && (
          <input
            type="text"
            value={playerName}
            required
            onChange={(event) => {
              setPlayerName(event.target.value);
            }}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button
        onClick={() => {
          setEditing((editing) => !editing);
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
