export function formatDatetimeTextFromFormatted(f) {
  // f contoh: "05/01/2026 9:00:00" → "Senin, 05 Jan 2026, 09:00"
  try {
    const [datePart, timePart] = f.split(" ");
    const [d, m, y] = datePart.split("/").map(Number);
    const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

    // bikin Date object → JS pakai format (year, monthIndex, day)
    const dateObj = new Date(y, m - 1, d);
    const dayName = days[dateObj.getDay()];

    // ambil jam & menit saja
    let hhmm = "";
    if (timePart) {
      const [hh, mm] = timePart.split(":");
      hhmm = `${hh.padStart(2,"0")}:${mm.padStart(2,"0")}`;
    }

    return `${dayName}, ${String(d).padStart(2,"0")} ${months[m-1]} ${y}, ${hhmm}`;
  } catch {
    return f;
  }
}

export function getDayNameFromFormatted(f) {
  // f contoh: "05/01/2026 9:00:00" → "Senin"
  try {
    const [datePart] = f.split(" "); // ambil bagian tanggal
    const [d, m, y] = datePart.split("/").map(Number);
    const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

    const dateObj = new Date(y, m - 1, d);
    return days[dateObj.getDay()];
  } catch {
    return "";
  }
}

