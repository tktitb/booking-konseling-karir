export function parseGvizJSON(text) {
  const marker = "google.visualization.Query.setResponse(";
  const start = text.indexOf(marker);
  if (start === -1) throw new Error("GViz JSON tidak valid.");
  const jsonStart = start + marker.length;
  const jsonEnd = text.lastIndexOf(");");
  const jsonString = text.substring(jsonStart, jsonEnd);
  return JSON.parse(jsonString);
}

/* Kolom: A(datetime), B(psikolog), C(sesi), D(kategori), E(peserta), F(status) */
export function tableToRowsObjects(gvizJson) {
  const rows = gvizJson?.table?.rows || [];
  return rows.map(r => ({
    datetimeRaw: r.c[0]?.v ?? "",   // Date(YYYY,MM,DD,HH,mm,ss)
    datetimeFmt: r.c[0]?.f ?? "",   // "dd/MM/yyyy H:mm:ss"
    psychologist: r.c[1]?.v ?? "",
    mode: r.c[2]?.v ?? "",
    category: r.c[3]?.v ?? "",
    participant: r.c[4]?.v ?? "",
    status: r.c[5]?.v ?? ""
  }));
}
