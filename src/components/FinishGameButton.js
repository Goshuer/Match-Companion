import React, { useState } from "react";
import { saveData } from "../api";

function FinishGameButton({ players, onSaveComplete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFinish = async () => {
    setLoading(true);
    setError("");
    try {
      const updatedData = players.map((player) => ({
        ...player,
        totalGoals: (player.totalGoals || 0) + (player.goals || 0),
        totalYellowCards: (player.totalYellowCards || 0) + (player.yellowCards || 0),
        totalRedCards: (player.totalRedCards || 0) + (player.redCards || 0),
        goals: 0,
        yellowCards: 0,
        redCards: 0,
      }));

      await saveData(updatedData);
      setLoading(false);
      onSaveComplete && onSaveComplete(true);
    } catch (e) {
      setLoading(false);
      setError("Fehler beim Speichern der Spieldaten");
      onSaveComplete && onSaveComplete(false);
    }
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button onClick={handleFinish} disabled={loading} style={{ padding: "10px 20px", fontSize: "16px" }}>
        {loading ? "Speichere..." : "Spiel abschließen"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default FinishGameButton;
