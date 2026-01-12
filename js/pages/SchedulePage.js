import { el, mount } from "../utils/dom.js";
import { state, setState } from "../state.js";
import { MONTHS } from "../constants.js";
import { getMonthlySchedule } from "../services/sheetsService.js";
import { Calendar } from "../components/Calendar.js";
import { ScheduleLegend } from "../components/ScheduleLegend.js";
import { BookingModal, openModal, closeModal } from "../components/BookingModal.js";
import { isSlotAvailable } from "../utils/validate.js";

export function SchedulePage() {
  const wrapper = el("div", { class: "page" });

  const controls = el("section", { class: "card section section--brand" }, [
    // el("h3", { class: "card__title" }, "Kontrol Jadwal"),
    el("div", { class: "controls-bar" }, [
      el("div", { class: "controls-bar__group" }, [
        el("label", { class: "form__label", for: "bulanSel" }, "Bulan"),
        (() => {
          const sel = el("select", { id: "bulanSel", class: "select" },
            MONTHS.map(m => el("option", { value: m }, m))
          );
          sel.value = state.month;
          sel.addEventListener("change", (e) => setState({ month: e.target.value }));
          return sel;
        })()
      ]),
      el("div", { class: "controls-bar__group" }, [
        el("label", { class: "form__search", for: "filterSel" }, "Filter"),
        (() => {
          const sel = el("select", { id: "filterSel", class: "select" }, [
            el("option", { value: "all" }, "Semua Jadwal"),
            el("option", { value: "available" }, "Hanya yang tersedia"),
          ]);
          sel.value = state.filter;
          sel.addEventListener("change", (e) => setState({ filter: e.target.value }));
          return sel;
        })()
      ]),
       
      el("div", { class: "controls-bar__group" }, [
        el("label", { class: "form__search", for: "filterSel" }, ""),
        el("label", { class: "form__search", for: "filterSel" }, ""),
        el("button", { id: "refreshBtn", class: "button", type: "button" }, "Cari Jadwal")
      ])
    ])
  ]);

  const legendRoot = el("div");
  const scheduleRoot = el("div");

  controls.querySelector("#refreshBtn").addEventListener("click", loadAndRender);

  function renderLegend() {
    mount(legendRoot, ScheduleLegend());
  }

  function openBooking(slot) {
    const modalNode = BookingModal({
      slot,
      allItems: state.schedule,
      onClose: () => closeModal(modalNode)
    });
    openModal(document.body, modalNode);
  }

  async function loadAndRender() {
    try {
      setState({ loading: true, error: null, selectedSlot: null });
      const items = await getMonthlySchedule(state.month);
      setState({ schedule: items, loading: false });

      const filtered =
        state.filter === "available"
          ? state.schedule.filter(i => isSlotAvailable(i.participant))
          : state.schedule;

      mount(scheduleRoot, Calendar({
        items: filtered,
        onBooking: openBooking
      }));
    } catch (err) {
      setState({ loading: false, error: err.message || String(err) });
      mount(scheduleRoot, el("p", {}, "Gagal memuat jadwal. Silakan coba lagi."));
    }
  }

//   renderLegend();
  loadAndRender();

  mount(wrapper, controls);
  wrapper.appendChild(legendRoot);
  wrapper.appendChild(scheduleRoot);

  return wrapper;
}
