import { el } from "../utils/dom.js";

export function PsychologistCard({ nameFull, image, bio }) {
  return el("div", { class: "card", style: "overflow:hidden;position:relative;" }, [
    el("div", { style: "display:flex;gap:16px;align-items:center;margin-bottom:12px;" }, [
      image
        ? el("img", { src: image, alt: nameFull, style: "width:72px;height:72px;border-radius:16px;object-fit:cover;border:2px solid var(--surface-3);" })
        : null,
      el("div", {}, [
        el("h3", { class: "card__title" }, nameFull),
        el("div", { style: "display:inline-flex;gap:8px;margin-top:6px;" }, [
          el("span", { class: "badge" }, "Empatik"),
          el("span", { class: "badge" }, "Objektif"),
          el("span", { class: "badge" }, "Asesif"),
          el("span", { class: "badge" }, "Profesional")
        ])
      ])
    ]),
    el("p", {}, bio || "Psikolog Konseling Karier ITB Career Center."),
    el("div", { style: "position:absolute;inset:auto 16px 16px auto;transform:rotate(3deg);" }, [
      el("span", { class: "badge", style: "background:#fff6;border-color:var(--gold);color:var(--navy);" }, "Siap membantu")
    ])
  ]);
}
