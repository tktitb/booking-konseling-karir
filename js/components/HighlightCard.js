import { el } from "../utils/dom.js";

export function HighlightCard({ icon, title, desc }) {
  return el("div", { class: "card", style: "display:flex;gap:12px;align-items:flex-start;" }, [
    el("div", { style: "width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--gold),#fff0);display:grid;place-items:center;border:1px solid var(--border);" }, [
      icon
    ]),
    el("div", {}, [
      el("h4", {}, title),
      el("p", {}, desc)
    ])
  ]);
}
