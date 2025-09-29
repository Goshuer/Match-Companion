import React, { useState, useEffect } from "react";
import CSVUpload from "./components/CSVUpload";
import TeamSelector from "./components/TeamSelector";
import PlayerList from "./components/PlayerList";
import Field from "./components/Field";
import PlayerInfoDialog from "./components/PlayerInfoDialog";
import FinishGameButton from "./components/FinishGameButton";
import { loadData, saveData } from "./api";
import "./Material.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerPositions, setPlayerPositions] = useState({});
  const [teamColors, setTeamColors] = useState({});
  const [loadingSave, setLoadingSave] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Daten von JSONbin laden (initial)
  useEffect(() => {
    async function fetchData() {
      const data = await loadData();
      if (data) {
        setPlayers(data);
        // Farben default zuweisen, falls leer
        let colors = {};
        data.forEach((p) => {
          if (!colors[p["Club Name"]]) {
            colors[p["Club Name"]] = { playerColor: "#2196f3", fontColor: "#fff" };
          }
        });
        setTeamColors(colors);
      }
    }
    fetchData();
  }, []);

  // Beim CSV-Upload neue Spieler übernehmen
  const handleCSVLoad = (csvArray) => {
    setPlayers(csvArray);
    // Reset Auswahl und Positionen
    setHomeTeam("");
    setAwayTeam("");
    setPlayerPositions({});
  };

  // Wenn Teams geändert werden
  const handleTeamsSelected = (home, away) => {
    setHomeTeam(home);
    setAwayTeam(away);
  };

  // Spieler auswählen (für Infobox)
  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };

  // Positionen ändern
  const handlePositionChange = (playerName, pos) => {
    setPlayerPositions((prev) => ({
      ...prev,
      [playerName]: pos,
    }));
  };

  // Spieler-Stats speichern aus PlayerInfoDialog
  const handlePlayerStatsSave = (updatedPlayer) => {
    setPlayers((prev) =>
      prev.map((p) => (p["Player Name"] === updatedPlayer["Player Name"] ? updatedPlayer : p))
    );
  };

  // Spiel abschließen
  const handleSaveComplete = (success) => {
    if (success) {
      alert("Spielstatistiken erfolgreich gespeichert!");
    } else {
      alert("Fehler beim Speichern der Spielstatistiken.");
    }
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1>Fußball Aufstellung Builder</h1>
      <CSVUpload onDataLoaded={handleCSVLoad} />
      {players.length > 0 && (
        <>
          <TeamSelector players={players} onTeamsSelected={handleTeamsSelected} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <PlayerList players={players} selectedTeam={homeTeam} onPlayerSelect={handlePlayerSelect} />
            <Field
              players={players.filter(
                (p) => p["Club Name"] === homeTeam || p["Club Name"] === awayTeam
              )}
              teamColors={teamColors}
              onPositionChange={handlePositionChange}
            />
            <PlayerList players={players} selectedTeam={awayTeam} onPlayerSelect={handlePlayerSelect} />
          </div>
          <FinishGameButton players={players} onSaveComplete={handleSaveComplete} />
        </>
      )}
      <PlayerInfoDialog
        player={selectedPlayer}
        isOpen={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        onSave={handlePlayerStatsSave}
      />
      {saveError && <p style={{ color: "red" }}>{saveError}</p>}
    </div>
  );
}

export default App;
