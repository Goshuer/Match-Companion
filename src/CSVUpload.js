import React, { useState } from "react";

function CSVUpload({ onDataLoaded }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (str) => {
    const headers = [
      "Club Name",
      "Club Badge URL",
      "Player Name",
      "Player Image URL",
      "Jersey Number",
      "Position",
      "Nationality 1",
      "Nationality 1 Flag URL",
      "Nationality 2",
      "Nationality 2 Flag URL",
    ];
    const rows = str.slice(str.indexOf("\n") + 1).split("\n").filter(Boolean);
    return rows.map((row) => {
      const values = row.split(",");
      let obj = {};
      headers.forEach((header, i) => {
        obj[header] = values[i]?.trim() ?? "";
      });
      return obj;
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const data = csvFileToArray(text);
        onDataLoaded(data);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ padding: "10px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleOnSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} required />
        <button type="submit" style={{ marginLeft: "10px" }}>
          CSV importieren
        </button>
      </form>
    </div>
  );
}

export default CSVUpload;
