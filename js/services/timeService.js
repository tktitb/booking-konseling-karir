export function formatDatetimeTextFromFormatted(f) {
  // f contoh: "05/01/2026 9:00:00" → "05 Jan 2026, 09:00"
  try {
    const [datePart, timePart] = f.split(" ");
    const [d, m, y] = datePart.split("/").map(Number);
    const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    const hhmm = (timePart || "").slice(0,5).padStart(5,"0");
    return `${String(d).padStart(2,"0")} ${months[m-1]} ${y}, ${hhmm}`;
  } catch { return f; }
}
