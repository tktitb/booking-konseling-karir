import { el } from "../utils/dom.js";
import { required, validEmail, validPhone } from "../utils/validate.js";
import { WHATSAPP_TARGET, WHATSAPP_TEMPLATE } from "../constants.js";
import { formatDatetimeID } from "../services/timeService.js";

export function BookingForm({ selectedSlot }) {
  const form = el("form", { class: "card form" }, [
    el("h3", { class: "card__title" }, "Form Booking"),
    el("div", { class: "form__row" }, [
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "nama" }, "Nama Lengkap"),
        el("input", { id: "nama", class: "input", placeholder: "Contoh: Andi Surya Putra" }),
        el("span", { class: "form__hint" }, "Sesuai KTP atau kartu mahasiswa.")
      ]),
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "mode" }, "Sesi Konseling"),
        el("select", { id: "mode", class: "select" }, [
          el("option", { value: "Online" }, "Online"),
          el("option", { value: "Offline" }, "Offline")
        ])
      ])
    ]),
    el("div", { class: "form__row" }, [
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "kategori" }, "Kategori Peserta"),
        el("select", { id: "kategori", class: "select" }, [
          el("option", { value: "Mahasiswa ITB" }, "Mahasiswa ITB"),
          el("option", { value: "Alumni ITB" }, "Alumni ITB"),
          el("option", { value: "Mahasiswa Non-ITB" }, "Mahasiswa Non-ITB"),
          el("option", { value: "Alumni Non-ITB" }, "Alumni Non-ITB"),
        ])
      ]),
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label" }, "Slot Terpilih"),
        el("div", { id: "slotInfo" }, selectedSlot
          ? `${formatDatetimeID(selectedSlot.datetime)} — ${selectedSlot.psychologist} (${selectedSlot.mode})`
          : "Belum memilih slot dari jadwal")
      ])
    ]),
    el("div", { class: "form__row" }, [
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "phone" }, "No. HP (WhatsApp)"),
        el("input", { id: "phone", class: "input", placeholder: "08xxxxxxxxxx" })
      ]),
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "email" }, "Email"),
        el("input", { id: "email", class: "input", placeholder: "nama@domain.com" })
      ])
    ]),
    el("div", { class: "form__actions" }, [
      el("button", { class: "button button--gold", type: "submit" }, "Kirim via WhatsApp"),
      el("a", { class: "button button--ghost", href: "#/jadwal" }, "Kembali ke Jadwal")
    ])
  ]);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = form.querySelector("#nama").value;
    const mode = form.querySelector("#mode").value;
    const kategori = form.querySelector("#kategori").value;
    const phone = form.querySelector("#phone").value;
    const email = form.querySelector("#email").value;

    const errors = [];
    if (!required(nama)) errors.push("Nama");
    if (!required(mode)) errors.push("Sesi");
    if (!required(kategori)) errors.push("Kategori");
    if (!selectedSlot) errors.push("Slot jadwal");
    if (!validPhone(phone)) errors.push("No. HP");
    if (!validEmail(email)) errors.push("Email");

    if (errors.length) {
      alert("Mohon lengkapi field: " + errors.join(", "));
      return;
    }

    const msg = WHATSAPP_TEMPLATE({
      nama, mode, kategori,
      psychologist: selectedSlot.psychologist,
      datetime: formatDatetimeID(selectedSlot.datetime),
      phone, email
    });

    const url = `${WHATSAPP_TARGET}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });

  return form;
}