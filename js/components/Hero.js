import { el } from "../utils/dom.js";

export function Hero() {
  return el("section", { class: "hero section section--dark" }, [
    el("h2", { class: "hero__title" }, "Konseling Karier ITB Career Center — 100% Gratis"),
    el("p", { class: "hero__desc" }, "Kami mendampingi mahasiswa dan alumni ITB maupun non‑ITB untuk merencanakan, memilih, mempersiapkan karier, serta mendapatkan tips memasuki dunia kerja."),
    el("div", { class: "hero__cta" }, [
      el("a", { class: "button button--gold", href: "#/jadwal" }, "Lihat Jadwal Konseling"),
      el("a", { class: "button button--ghost", href: "#/tentang" }, "Kenal Layanan & Psikolog")
    ])
  ]);
}
