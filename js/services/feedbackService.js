import { parseGvizJSON } from "../utils/format.js";

const FEEDBACK_URL = "https://docs.google.com/spreadsheets/d/11EWr8YJU2URg4H_xDpzVSGDeFFM9s5bDVxesJxg6V2A/gviz/tq?tq=SELECT%20A,B,C,F&headers=1&tqx=out:json&sheet=Feedback";

export async function getFeedback() {
  const res = await fetch(FEEDBACK_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  const json = parseGvizJSON(text);
  const rows = json?.table?.rows || [];
  return rows.map(r => ({
    name: r.c[0]?.v ?? "",
    feedback: r.c[1]?.v ?? "",
    category: r.c[2]?.v ?? ""
  }));
}
