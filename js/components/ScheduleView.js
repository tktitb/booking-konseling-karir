import { el } from "../utils/dom.js";
import { psychologistFullName, psychologistAvatar } from "../constants.js";
import { isSlotAvailable } from "../utils/validate.js";
import { formatDatetimeTextFromFormatted, getDayNameFromFormatted } from "../services/timeService.js";

// Card slot tetap sama
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

export function ScheduleView({ items, tab, dayTab, psychologist = "all", onBooking }) {
  let filtered = items.filter(i => {
    if (tab === "online") return i.mode?.toLowerCase() === "online";
    if (tab === "offline") return i.mode?.toLowerCase() === "offline";
    return true;
  });

  if (dayTab && dayTab !== "all") {
    filtered = filtered.filter(i => getDayNameFromFormatted(i.datetimeFmt) === dayTab);
  }

  if (psychologist && psychologist !== "all") {
    filtered = filtered.filter(i => i.psychologist === psychologist);
  }

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
    // Tabs Online/Offline
    el("div", { class: "schedule-tabs" }, [
      el("button", { class: `tab ${tab === "all" ? "active" : ""}`, "data-tab": "all" }, "Semua"),
      el("button", { class: `tab ${tab === "online" ? "active" : ""}`, "data-tab": "online" }, "Online"),
            el("button", { class: `tab ${tab === "offline" ? "active" : ""}`, "data-tab": "offline" }, "Offline")
    ]),
    // Tabs Hari
    // el("div", { class: "schedule-tabs" }, [
    //   el("button", { class: `tab ${dayTab === "all" ? "active" : ""}`, "data-day": "all" }, "Semua"),
    //   el("button", { class: `tab ${dayTab === "Senin" ? "active" : ""}`, "data-day": "Senin" }, "Senin"),
    //   el("button", { class: `tab ${dayTab === "Jumat" ? "active" : ""}`, "data-day": "Jumat" }, "Jumat"),
    //   el("button", { class: `tab ${dayTab === "Sabtu" ? "active" : ""}`, "data-day": "Sabtu" }, "Sabtu")
    // ]),
    // Grid Psikolog
    el("div", { class: "schedule-grid" }, [
      column("Bu Lina", linaItems),
      column("Bu Sito", sitoItems)
    ])
  ]);
}
