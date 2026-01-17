import { el, mount } from "../utils/dom.js";
import { state, setState } from "../state.js";
import { MONTHS, PSYCHOLOGISTS, psychologistFullName } from "../constants.js";
import { getMonthlySchedule } from "../services/sheetsService.js";
import { ScheduleView } from "../components/ScheduleView.js";
import { ScheduleLegend } from "../components/ScheduleLegend.js";
import { BookingModal, openModal, closeModal } from "../components/BookingModal.js";
import { isSlotAvailable } from "../utils/validate.js";

export function SchedulePage() {
  const wrapper = el("div", { class: "page" });

  const controls = el("section", { class: "card section section--brand" }, [
    el("div", { class: "controls-bar" }, [
      // Filter Bulan
      el("div", { class: "controls-bar__group" }, [
        el("label", { class: "form__search", for: "bulanSel" }, "Bulan"),
        (() => {
          const sel = el("select", { id: "bulanSel", class: "select" },
            MONTHS.map(m => el("option", { value: m }, m))
          );
          sel.value = state.month;
          sel.addEventListener("change", (e) => setState({ month: e.target.value }));
          return sel;
        })()
      ]),

      // Filter Jadwal
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

      // 🔥 Filter Psikolog pakai constant + full name
      el("div", { class: "controls-bar__group" }, [
        el("label", { class: "form__search", for: "psychSel" }, "Psikolog"),
        (() => {
          const sel = el("select", { id: "psychSel", class: "select" }, [
            el("option", { value: "all" }, "Semua"),
            ...PSYCHOLOGISTS.map(p =>
              el("option", { value: p.key }, psychologistFullName(p.key))
            )
          ]);
          sel.value = state.psychologist || "all";
          sel.addEventListener("change", (e) => setState({ psychologist: e.target.value }));
          return sel;
        })()
      ]),

      // Tombol Cari
      el("div", { class: "controls-bar__group" }, [
        el("label", { class: "form__search", for: "" }, ""),el("label", { class: "form__search", for: "" }, ""),el("label", { class: "form__search", for: "" }, ""),
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

      mount(scheduleRoot, ScheduleView({
        items: filtered,
        tab: state.tab || "all",
        dayTab: state.dayTab || "all",
        psychologist: state.psychologist || "all",   // 🔥 kirim prop psychologist
        onBooking: openBooking
      }));

      // listener tab Online/Offline
      scheduleRoot.querySelectorAll(".schedule-tabs .tab[data-tab]").forEach(btn => {
        btn.addEventListener("click", () => {
          setState({ tab: btn.getAttribute("data-tab") });
          loadAndRender();
        });
      });

      // listener tab Hari
      scheduleRoot.querySelectorAll(".schedule-tabs .tab[data-day]").forEach(btn => {
        btn.addEventListener("click", () => {
          setState({ dayTab: btn.getAttribute("data-day") });
          loadAndRender();
        });
      });
    } catch (err) {
      setState({ loading: false, error: null });
      mount(scheduleRoot, ScheduleView({
        items: [],
        tab: state.tab || "all",
        dayTab: state.dayTab || "all",
        psychologist: state.psychologist || "all",   // 🔥 tetap kirim prop
        onBooking: openBooking
      }));
    }
  }

  // renderLegend(); // aktifkan jika ingin legend tampil
  loadAndRender();

  mount(wrapper, controls);
  wrapper.appendChild(legendRoot);
  wrapper.appendChild(scheduleRoot);

  return wrapper;
}
