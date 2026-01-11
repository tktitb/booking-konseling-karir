import { MONTHS } from "./constants.js";

export const state = {
  month: MONTHS[new Date().getMonth()], // otomatis bulan sekarang
  schedule: [],
  loading: false,
  error: null,
  selectedSlot: null,
  filter: "all"
};

export function setState(patch) {
  Object.assign(state, patch);
}
