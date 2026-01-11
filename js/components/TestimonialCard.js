import { el } from "../utils/dom.js";

export function TestimonialCard({ quote, name, role }) {
  return el("div", { class: "testimonial-card" }, [
    el("p", {}, `“${quote}”`),
    el("div", { class: "testimonial-card__name" }, name),
    el("div", { class: "testimonial-card__role" }, role)
  ]);
}
