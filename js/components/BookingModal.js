import { el } from "../utils/dom.js";
import { required, validEmail, validPhone } from "../utils/validate.js";
import { WHATSAPP_TARGET, WHATSAPP_TEMPLATE, psychologistFullName } from "../constants.js";
import { formatDatetimeTextFromFormatted } from "../services/timeService.js";

function psychologistsAvailableAt(items, datetimeFmt) {
  const sameTime = items.filter(i => i.datetimeFmt === datetimeFmt && !i.participant);
  const keys = [...new Set(sameTime.map(i => i.psychologist))];
  return keys.map(k => ({ key: k, full: psychologistFullName(k) }));
}

export function BookingModal({ slot, allItems, onClose }) {
  const overlay = el("div", { class: "modal-overlay" });
  // tambahkan style max-height dan overflow agar bisa scroll
  const modal = el("div", { class: "modal", style: "max-height:80vh;overflow-y:auto;" });
  const header = el("div", { class: "modal__header" }, [
    el("div", { class: "modal__title" }, "Booking Konseling"),
    el("button", { class: "modal__close", type: "button", onClick: onClose }, "×")
  ]);


  const datetimeText = formatDatetimeTextFromFormatted(slot.datetimeFmt);
    // ambil mode dari slot
    let mode = slot.mode || "-";

    // tambahkan keterangan sesuai mode
    if (slot.mode === "Online") {
    mode += " (via Zoom Meeting)";
    } else if (slot.mode === "Offline") {
    mode += " (di Kantor ITB Career Center, GKU Timur, Lantai Dasar ITB Ganesha)";
    };
  
    const availablePsychs = psychologistsAvailableAt(allItems, slot.datetimeFmt);
  const defaultPsychFull = psychologistFullName(slot.psychologist);

  const info = el("div", { class: "card" }, [
    el("p", {}, `Jadwal: ${datetimeText}`),
    el("p", {}, `Sesi: ${mode}`),
    el("p", {}, availablePsychs.length > 1
      ? "Psikolog tersedia: pilih di bawah"
      : `Psikolog: ${defaultPsychFull}`)
  ]);

  const form = el("form", { class: "form" }, [
    el("div", { class: "form__row" }, [
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "nama" }, "Nama Lengkap"),
        el("input", { id: "nama", class: "input", placeholder: "Contoh: Andi Surya Putra" }),
        el("span", { class: "form__hint" }, "Sesuai KTP atau kartu mahasiswa.")
      ]),
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "kategori" }, "Kategori Peserta"),
        el("select", { id: "kategori", class: "select" }, [
          el("option", { value: "Mahasiswa ITB" }, "Mahasiswa ITB"),
          el("option", { value: "Alumni ITB" }, "Alumni ITB"),
          el("option", { value: "Mahasiswa Non-ITB" }, "Mahasiswa Non-ITB"),
          el("option", { value: "Alumni Non-ITB" }, "Alumni Non-ITB"),
        ])
      ])
    ]),
    el("div", { class: "form__row" }, [
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "psych" }, "Psikolog"),
        availablePsychs.length > 1
          ? el("select", { id: "psych", class: "select" },
              availablePsychs.map(p => el("option", { value: p.full }, p.full))
            )
          : el("input", { id: "psych", class: "input", value: defaultPsychFull, readonly: "readonly" })
      ]),
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "phone" }, "No. HP (WhatsApp)"),
        el("input", { id: "phone", class: "input", placeholder: "08xxxxxxxxxx" })
      ])
    ]),
    el("div", { class: "form__row" }, [
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label", for: "email" }, "Email"),
        el("input", { id: "email", class: "input", placeholder: "nama@domain.com" })
      ]),
      el("div", { class: "form__group" }, [
        el("label", { class: "form__label" }, "Hari & Waktu (otomatis)"),
        el("input", { class: "input", value: datetimeText, readonly: "readonly" })
      ])
    ]),
    el("div", { class: "form__actions" }, [
      el("button", { class: "button button--gold", type: "submit" }, "Kirim via WhatsApp"),
      el("button", { class: "button button--ghost", type: "button", onClick: onClose }, "Tutup")
    ])
  ]);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = form.querySelector("#nama").value;
    const kategori = form.querySelector("#kategori").value;
    const phone = form.querySelector("#phone").value;
    const email = form.querySelector("#email").value;
    const psychFull = (form.querySelector("#psych")?.value) || defaultPsychFull;

    const errors = [];
    if (!required(nama)) errors.push("Nama");
    if (!required(kategori)) errors.push("Kategori");
    if (!validPhone(phone)) errors.push("No. HP");
    if (!validEmail(email)) errors.push("Email");

    if (errors.length) {
      alert("Mohon lengkapi field: " + errors.join(", "));
      return;
    }

    const msg = WHATSAPP_TEMPLATE({
      nama,
      mode,
      kategori,
      psychologistFull: psychFull,
      datetimeText,
      phone,
      email
    });

    const url = `${WHATSAPP_TARGET}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    // Tutup modal setelah mengirim (berpindah ke WA)
    onClose();
  });

  modal.appendChild(header);
  modal.appendChild(info);
  modal.appendChild(form);
  overlay.appendChild(modal);

  return overlay;
}

export function openModal(root, modalNode) {
  root.appendChild(modalNode);
}
export function closeModal(modalNode) {
  modalNode.remove();
}
