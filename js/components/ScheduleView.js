import { el } from "../utils/dom.js";
import { psychologistFullName, psychologistAvatar } from "../constants.js";
import { isSlotAvailable } from "../utils/validate.js";
import { formatDatetimeTextFromFormatted } from "../services/timeService.js";

// Card tetap sama persis
function slotCard(item, onBooking) {
  const available = isSlotAvailable(item.participant);
  const datetimeText = formatDatetimeTextFromFormatted(item.datetimeFmt);
  const psychFull = psychologistFullName(item.psychologist);

  const top = el("div", { class: "slot-card__top" }, [
    el("div", { class: "slot-card__time" }, datetimeText),
    el("span", { class: `badge ${available ? "badge--ok" : "badge--full"}` },
      available ? "Tersedia" : "Sudah Ada Jadwal")
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

  return el("div", { class: "slot-card" }, [top, meta, actions]);
}

export function ScheduleView({ items, tab, onBooking }) {
  // filter by tab
  const filtered = items.filter(i => {
    if (tab === "online") return i.mode?.toLowerCase() === "online";
    if (tab === "offline") return i.mode?.toLowerCase() === "offline";
    return true;
  });

  // pisah berdasarkan psikolog
  const linaItems = filtered.filter(i => i.psychologist === "Bu Lina");
  const sitoItems = filtered.filter(i => i.psychologist === "Bu Sito");

  const column = (label, list) =>
    el("div", { class: "schedule-column" }, [
      el("div", { class: "psychologist-header" }, [
        el("img", { src: psychologistAvatar(label), alt: label }),
        el("h4", {}, psychologistFullName(label))
      ]),
      list.length
        ? el("div", { class: "schedule-list" }, list.map(i => slotCard(i, onBooking)))
        : el("div", { class: "card" }, "Belum ada jadwal")
    ]);

  return el("section", { class: "card section section--light" }, [
    el("h3", { class: "card__title" }, "Jadwal Konseling"),
    el("div", { class: "schedule-tabs" }, [
      el("button", { class: `tab ${tab === "all" ? "active" : ""}`, "data-tab": "all" }, "Semua"),
      el("button", { class: `tab ${tab === "online" ? "active" : ""}`, "data-tab": "online" }, "Online"),
      el("button", { class: `tab ${tab === "offline" ? "active" : ""}`, "data-tab": "offline" }, "Offline")
    ]),
    el("div", { class: "schedule-grid" }, [
      column("Bu Lina", linaItems),
      column("Bu Sito", sitoItems)
    ])
  ]);
}
