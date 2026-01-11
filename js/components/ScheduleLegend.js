import { el } from "../utils/dom.js";

export function ScheduleLegend() {
  return el("div", { class: "card" }, [
    el("h3", { class: "card__title" }, "Status Slot"),
    el("p", {}, [
      el("span", { class: "badge badge--ok" }, "Tersedia"),
      " ",
      el("span", { class: "badge badge--full" }, "Sudah Ada Jadwal")
    ]),
    el("p", { class: "text-muted" }, "Klik ‘Booking’ pada kartu untuk membuka form pop‑up. Slot dianggap tersedia jika Peserta (kolom E) kosong.")
  ]);
}
