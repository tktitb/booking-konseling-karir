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
  try {
    const url = buildUrl({ sheetName });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} saat fetch GViz`);

    const text = await res.text();

    // kalau GViz balikin isi sheet pertama, kita cek meta sheetName
    const json = parseGvizJSON(text);

    // cek apakah sheetName di response sama dengan yang diminta
    const actualSheet = json.table?.cols?.[0]?.label || "";
    if (!text.includes(sheetName) && actualSheet.toLowerCase().includes("januari")) {
      console.warn(`Sheet "${sheetName}" tidak ditemukan, fallback ke Januari → kita kosongkan`);
      return [];
    }

    return tableToRowsObjects(json);
  } catch (err) {
    console.error("Error load schedule:", err);
    return [];
  }
}
