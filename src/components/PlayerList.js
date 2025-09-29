import React from "react";

const positionOrder = ["Torhüter", "Verteidiger", "Mittelfeldspieler", "Stürmer"];

const sortPlayersByPosition = (players) => {
  return players.sort((a, b) => {
    const posA = positionOrder.findIndex((pos) => a.Position.toLowerCase().includes(pos.toLowerCase()));
    const posB = positionOrder.findIndex((pos) => b.Position.toLowerCase().includes(pos.toLowerCase()));
    return posA - posB;
  });
};

function PlayerList({ players, selectedTeam, onPlayerSelect }) {
  if (!selectedTeam) return <p>Bitte wähle ein Team aus.</p>;

  const filteredPlayers = players.filter((p) => p["Club Name"] === selectedTeam);
  const sortedPlayers = sortPlayersByPosition(filteredPlayers);

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto", margin: "10px" }}>
      <h3>{selectedTeam} - Spieler</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {sortedPlayers.map((player) => (
          <li
            key={player["Player Name"]}
            onClick={() => onPlayerSelect(player)}
            style={{
              cursor: "pointer",
              padding: "5px 10px",
              borderBottom: "1px solid #ddd",
            }}
          >
            {player["Jersey Number"]} - {player["Player Name"]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
