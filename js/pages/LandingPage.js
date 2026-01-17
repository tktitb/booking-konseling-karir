import { el } from "../utils/dom.js";
import { Hero } from "../components/Hero.js";
import { PsychologistCard } from "../components/PsychologistCard.js";
import { FooterInfo } from "../components/Footer.js";
import { HighlightCard } from "../components/HighlightCard.js";
import { TestimonialCarousel } from "../components/TestimonialCarousel.js";
import { FAQSection } from "../components/FAQSection.js";

function iconTarget() {
  return el("svg", { viewBox: "0 0 24 24", fill: "none", width: "20", height: "20" }, [
    el("circle", { cx: "12", cy: "12", r: "9", stroke: "var(--blue)", "stroke-width": "2" }),
    el("path", { d: "M12 7v10M7 12h10", stroke: "var(--gold)", "stroke-width": "2", "stroke-linecap": "round" })
  ]);
}
function iconHandshake() {
  return el("svg", { viewBox: "0 0 24 24", fill: "none", width: "20", height: "20" }, [
    el("path", { d: "M7 12l5-5 5 5-5 5-5-5z", stroke: "var(--blue)", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })
  ]);
}

export function LandingPage() {
  const highlights = el("section", { class: "section section--light" }, [
    el("h3", {}, "Kenapa Konseling di ITB Career Center?"),
    el("div", { class: "grid-2" }, [
      HighlightCard({
        icon: iconTarget(),
        title: "Pendekatan Humanis & Terukur",
        desc: "Tujuan karier jelas, rencana realistis, pendampingan empatik—agar kamu maju dengan percaya diri."
      }),
      HighlightCard({
        icon: iconHandshake(),
        title: "Terhubung ke Dunia Kerja",
        desc: "Insight praktis, strategi lamaran, dan persiapan menghadapi proses rekrutmen yang relevan."
      })
    ])
  ]);

  const psychologists = el("section", { class: "section section--light" }, [
    el("h3", {}, "Psikolog Kami"),
    el("div", { class: "grid-2" }, [
      PsychologistCard({
        nameFull: "Lina Tarlina, S.Psi, Psikolog",
        image: "./assets/images/lina.png",
        bio: ""
      }),
      PsychologistCard({
        nameFull: "Sito Asih Pratiwi, S.Psi, Psikolog",
        image: "./assets/images/sito.png",
        bio: ""
      })
    ])
  ]);

  return el("div", { class: "page" }, [
    Hero(),
    highlights,
    psychologists,
    TestimonialCarousel(),
    FAQSection(),
    FooterInfo()
  ]);
}
