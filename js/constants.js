export const SHEET_SPREADSHEET_ID = "11EWr8YJU2URg4H_xDpzVSGDeFFM9s5bDVxesJxg6V2A";
export const SHEET_BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_SPREADSHEET_ID}/gviz/tq`;

/* Query tunggal lengkap: A,B,C,D,E,F */
export const QUERY_FULL = "SELECT A,B,C,D,E,F";

export const MONTHS = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember"
];

/* Nomor WA: ganti ke nomor resmi ITB Career Center */
export const WHATSAPP_TARGET = "https://wa.me/6281111119463";

/* Template pesan WA (format rapi) */
export const WHATSAPP_TEMPLATE = ({
  nama, mode, kategori, datetimeText, phone, email, psychologistFull
}) => [
  "Halo, saya ingin mendaftar konseling karier. Berikut data saya:",
  `Nama Lengkap: ${nama}`,
  `Sesi Konseling: ${mode}`,
  `Kategori Peserta: ${kategori}`,
  `Psikolog: ${psychologistFull}`,
  `Hari & Waktu Konseling: ${datetimeText}`,
  `No. HP (WhatsApp): ${phone}`,
  `Email: ${email}`
].join("\n");

/* Mapping psikolog ke nama lengkap + avatar */
export const PSYCHOLOGISTS = [
  { key: "Bu Lina", full: "Lina Tarlina, S.Psi, Psikolog", avatar: "assets/images/lina.png" },
  { key: "Bu Sito", full: "Sito Asih Pratiwi, S.Psi, Psikolog", avatar: "assets/images/sito.png" },
];

export function psychologistFullName(label) {
  const found = PSYCHOLOGISTS.find(p => (label || "").trim() === p.key);
  return found ? found.full : (label || "").trim();
}

export function psychologistAvatar(label) {
  const found = PSYCHOLOGISTS.find(p => (label || "").trim() === p.key);
  return found ? found.avatar : "./assets/images/default.jpg";
}



