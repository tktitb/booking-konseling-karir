import { el } from "../utils/dom.js";

function iconSvg(pathD) {
  return el("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--blue)",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    style: "flex-shrink:0;"
  }, [
    el("path", { d: pathD })
  ]);
}

export function FooterInfo() {
  return el("div", { class: "card", style: "display:flex;flex-direction:column;gap:12px;" }, [
    el("h3", { class: "card__title" }, "Informasi & Kontak"),

    el("p", { style: "display:flex;align-items:center;gap:8px;" }, [
      iconSvg("M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z"),
      "Lokasi : Kantor ITB Career Center, GKU Timur, Lantai Dasar ITB Ganesha. Jln. Ganesha 10, Bandung 40132 Indonesia"
    ]),

    el("p", { style: "display:flex;align-items:center;gap:8px;" }, [
      iconSvg("M3 11l18-5-5 18-5-5-5 5z"),
      "Google Maps: ",
      el("a", { href: "https://share.google/dKWfrJDnelBPUmvcm", target: "_blank" }, "Lihat lokasi di Maps")
    ]),

    el("p", { style: "display:flex;align-items:center;gap:8px;" }, [
      iconSvg("M4 4h16v16H4z"),
      "Instagram: ",
      el("a", { href: "https://www.instagram.com/itbcareercenterofficial/", target: "_blank" }, "@itbcareercenterofficial")
    ]),

    el("p", { style: "display:flex;align-items:center;gap:8px;" }, [
      iconSvg("M2 12h20M12 2v20"),
      "Website: ",
      el("a", { href: "https://karir.itb.ac.id", target: "_blank" }, "karir.itb.ac.id")
    ])
  ]);
}
