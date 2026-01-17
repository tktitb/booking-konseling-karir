import { el } from "../utils/dom.js";
import { isSlotAvailable } from "../utils/validate.js";
import { psychologistFullName } from "../constants.js";
import { formatDatetimeTextFromFormatted } from "../services/timeService.js";

function slotCard(item, onBooking) {
  const available = isSlotAvailable(item.participant);
  const datetimeText = formatDatetimeTextFromFormatted(item.datetimeFmt);
  const psychFull = psychologistFullName(item.psychologist);

  const top = el("div", { class: "slot-card__top" }, [
    el("div", { class: "slot-card__time" }, datetimeText),
    el("span", { class: `badge ${available ? "badge--ok" : "badge--full"}` }, available ? "Tersedia" : "Sudah Ada Jadwal")
  ]);

  const meta = el("div", { class: "slot-card__meta" }, [
    el("span", { class: "slot-card__psychologist" }, psychFull),
    " • ",
    el("span", {}, item.mode || "-")
  ]);

  const actions = el("div", { class: "slot-card__actions" }, [
    available
      ? el("button", { class: "button button--gold", type: "button", onClick: () => onBooking(item) }, "Booking")
      : el("button", { class: "button button--ghost", type: "button", disabled: true }, "Tidak tersedia")
  ]);

  return el("div", { class: "slot-card" }, [
    top,
    meta,
    actions
  ]);
}

export function Calendar({ items, onBooking }) {
  const grid = el("div", { class: "schedule-grid" },
    items.length
      ? items.map(i => slotCard(i, onBooking))
      : [el("div", { class: "card" }, "Belum ada data untuk bulan ini.")]
  );

  return el("section", { class: "card section section--light" }, [
    el("h3", { class: "card__title" }, "Jadwal Konseling"),
    grid
  ]);
}
