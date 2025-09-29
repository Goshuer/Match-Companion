const API_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "68da90f2ae596e708ffff57d"; // dein Bin ID eintragen
const API_KEY = "$2a$10$8/OpQiA7dpuLBEQNqsWtaehuwJPTZ7jIVAEf32LDroovJatwrCRla"; // dein X-Master-Key

export async function loadData() {
  try {
    const res = await fetch(`${API_URL}/${BIN_ID}`, {
      headers: { "X-Master-Key": API_KEY },
    });
    if (!res.ok) throw new Error("Fehler beim Laden");
    const json = await res.json();
    return json.record || [];
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function saveData(data) {
  try {
    const res = await fetch(`${API_URL}/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({ record: data }),
    });
    if (!res.ok) throw new Error("Fehler beim Speichern");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
