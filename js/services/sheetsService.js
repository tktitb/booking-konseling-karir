import { SHEET_BASE_URL, QUERY_FULL } from "../constants.js";
import { parseGvizJSON, tableToRowsObjects } from "../utils/format.js";

function buildUrl({ sheetName }) {
  const params = new URLSearchParams({
    tq: QUERY_FULL,
    headers: "1",
    tqx: "out:json",
    sheet: sheetName
  });
  return `${SHEET_BASE_URL}?${params.toString()}`;
}

export async function getMonthlySchedule(sheetName) {
  const url = buildUrl({ sheetName });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} saat fetch GViz`);
  const text = await res.text();
  const json = parseGvizJSON(text);
  return tableToRowsObjects(json);
}
