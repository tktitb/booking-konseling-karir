export function isSlotAvailable(participant) {
  // Kolom E (Peserta) kosong → tersedia
  const v = participant == null ? "" : String(participant);
  return v.trim() === "";
}

export function required(value) {
  return String(value || "").trim().length > 0;
}
export function validEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email || "").trim());
}
export function validPhone(idPhone) {
  const re = /^[0-9+\s-]{9,16}$/;
  return re.test(String(idPhone || "").trim());
}
