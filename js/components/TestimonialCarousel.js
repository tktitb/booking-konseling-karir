import { el } from "../utils/dom.js";
import { getFeedback } from "../services/feedbackService.js";

function card({ name, feedback, category }) {
  return el("div", { class: "testimonial-card" }, [
    el("p", {}, feedback),
    el("div", { class: "testimonial-card__name" }, name),
    el("div", { class: "testimonial-card__role" }, category)
  ]);
}

function arrowIcon(direction) {
  const d = direction === "left"
    ? "M15 18l-6-6 6-6"
    : "M9 6l6 6-6 6";
  return el("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, [el("path", { d })]);
}

export function TestimonialCarousel() {
  const wrapper = el("section", { class: "section section--light", style: "position:relative;" }, [
    el("h3", {}, "Apa kata peserta?")
  ]);

  const track = el("div", {
    style: "display:grid;grid-template-columns:repeat(3,1fr);gap:16px;transition:transform 0.4s ease;"
  });

  // tombol prev/next di posisi tengah kiri/kanan
  const prevBtn = el("button", {
    class: "button button--ghost",
    type: "button",
    style: "position:absolute;top:50%;left:-12px;transform:translateY(-50%);border-radius:50%;padding:8px;"
  }, arrowIcon("left"));

  const nextBtn = el("button", {
    class: "button button--ghost",
    type: "button",
    style: "position:absolute;top:50%;right:-12px;transform:translateY(-50%);border-radius:50%;padding:8px;"
  }, arrowIcon("right"));

  wrapper.appendChild(track);
  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);

  let items = [];
  let index = 0;

  function render() {
    track.innerHTML = "";
    const visible = items.slice(index, index + 3);
    if (visible.length === 0 && items.length > 0) {
      index = 0;
      return render();
    }
    visible.forEach(v => track.appendChild(card(v)));
  }

  async function load() {
    try {
      items = await getFeedback();
      render();
    } catch {
      track.appendChild(el("div", { class: "card" }, "Gagal memuat feedback."));
    }
  }

  prevBtn.addEventListener("click", () => {
    index = Math.max(0, index - 3);
    track.style.transform = "translateX(-20px)";
    setTimeout(() => {
      track.style.transform = "translateX(0)";
      render();
    }, 200);
  });

  nextBtn.addEventListener("click", () => {
    index = Math.min(items.length - 1, index + 3);
    track.style.transform = "translateX(20px)";
    setTimeout(() => {
      track.style.transform = "translateX(0)";
      render();
    }, 200);
  });

  load();
  return wrapper;
}
