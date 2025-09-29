import React, { useState, useEffect } from "react";

function PlayerInfoDialog({ player, isOpen, onClose, onSave }) {
  const [goals, setGoals] = useState(0);
  const [yellowCards, setYellowCards] = useState(0);
  const [redCards, setRedCards] = useState(0);

  useEffect(() => {
    if (player) {
      setGoals(player.goals || 0);
      setYellowCards(player.yellowCards || 0);
      setRedCards(player.redCards || 0);
    }
  }, [player]);

  if (!isOpen || !player) return null;

  const handleSave = () => {
    onSave({
      ...player,
      goals,
      yellowCards,
      redCards,
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          maxWidth: "320px",
          margin: "100px auto",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h3>{player["Player Name"]}</h3>
        <img
          src={player["Player Image URL"]}
          alt={player["Player Name"]}
          style={{ width: "100%", borderRadius: "5px" }}
        />
        <p>
          <strong>Position:</strong> {player.Position}
          <br />
          <strong>Trikotnummer:</strong> {player["Jersey Number"]}
        </p>
        <p>
          <strong>Nationalitäten:</strong>
          <br />
          <img
            src={player["Nationality 1 Flag URL"]}
            alt={player["Nationality 1"]}
            style={{ width: 24, verticalAlign: "middle", marginRight: 5 }}
          />
          {player["Nationality 1"]}
          {player["Nationality 2"] && (
            <>
              {" "}
              <img
                src={player["Nationality 2 Flag URL"]}
                alt={player["Nationality 2"]}
                style={{ width: 24, verticalAlign: "middle", marginLeft: 10, marginRight: 5 }}
              />
              {player["Nationality 2"]}
            </>
          )}
        </p>
        <div>
          <label>
            Tore (laufendes Spiel):
            <input
              type="number"
              min="0"
              value={goals}
              onChange={(e) => setGoals(parseInt(e.target.value) || 0)}
              style={{ width: "50px", marginLeft: "10px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Gelbe Karten (laufendes Spiel):
            <input
              type="number"
              min="0"
              max="2"
              value={yellowCards}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (val > 2) val = 2;
                if (val < 0) val = 0;
                setYellowCards(val || 0);
              }}
              style={{ width: "50px", marginLeft: "10px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Rote Karten (laufendes Spiel):
            <input
              type="number"
              min="0"
              max="1"
              value={redCards}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (val > 1) val = 1;
                if (val < 0) val = 0;
                setRedCards(val || 0);
              }}
              style={{ width: "50px", marginLeft: "10px" }}
            />
          </label>
        </div>
        <button onClick={handleSave} style={{ marginTop: "15px" }}>
          Speichern
        </button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>
          Schließen
        </button>
      </div>
    </div>
  );
}

export default PlayerInfoDialog;
