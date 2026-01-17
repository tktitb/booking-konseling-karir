import { el } from "../utils/dom.js";

export function PsychologistCard({ nameFull, image, bio }) {
  return el("div", { 
    class: "card psychologist-card", 
    style: "overflow:hidden;position:relative;padding:24px;border-radius:20px;background:linear-gradient(135deg,var(--surface-2),var(--surface-3));box-shadow:0 8px 20px rgba(0,0,0,0.08);transition:transform 0.3s ease,box-shadow 0.3s ease;" 
  }, [
    el("div", { 
      style: "display:flex;gap:20px;align-items:center;margin-bottom:16px;position:relative;" 
    }, [
      el("div", { 
        style: "position:relative;width:120px;height:160px;flex-shrink:0;" 
      }, [
        // background aksen di belakang foto
        el("div", { 
          style: "position:absolute;inset:0;border-radius:16px;background:radial-gradient(circle at 50% 30%,var(--gold) 0%,transparent 70%);z-index:0;" 
        }),
        image
          ? el("img", { 
              src: image, 
              alt: nameFull, 
              style: "position:relative;z-index:1;width:100%;height:100%;border-radius:16px;object-fit:cover;border:3px solid var(--surface-1);" 
            })
          : null
      ]),
      el("div", {}, [
        el("h3", { 
          class: "card__title", 
          style: "font-size:20px;font-weight:700;color:var(--navy);margin-bottom:8px;" 
        }, nameFull),
        el("p", { 
          style: "font-size:14px;line-height:1.6;color:var(--text-muted);" 
        }, bio || "Psikolog konseling karier yang siap mendampingi perjalanan karier Anda.")
      ])
    ]),
    // logo pengganti badge
    el("div", { 
      style: "position:absolute;bottom:16px;right:16px;" 
    }, [
      el("img", { 
        src: "assets/images/logo.jpg", 
        alt: "Logo", 
        style: "width:48px;height:48px;opacity:0.9;" 
      })
    ])
  ]);
}
