import { el } from "../utils/dom.js";
import { PsychologistCard } from "../components/PsychologistCard.js";
import { FooterInfo } from "../components/Footer.js";

export function AboutPage() {
  const story = el("section", { class: "section section--light" }, [
    el("h3", {}, "Cerita di Balik Layanan"),
    el("p", {}, "Sejak awal berdirinya, ITB Career Center hadir untuk mendampingi mahasiswa dan alumni yang tengah mencari arah karier. Kami memahami bahwa proses menentukan langkah karier sering kali tidak mudah dan membutuhkan ruang untuk berdiskusi."),
    el("p", {}, "Melalui konseling karier, kami menyediakan ruang yang aman dan suportif untuk mengeksplorasi potensi diri serta menyusun langkah karier yang realistis dan dapat dijalankan. Dengan pendekatan yang humanis dan terukur, kami membantu peserta mengubah kebingungan menjadi arah yang lebih jelas dan penuh keyakinan.")
  ]);

  const competencies = el("section", { class: "section section--light" }, [
    el("h3", {}, "Kompetensi Psikolog Kami"),
    el("p", {}, "Di balik setiap sesi konseling, terdapat standar profesional yang senantiasa kami junjung tinggi. Psikolog ITB Career Center tidak hanya empatik dan profesional, tetapi juga memiliki karakter yang menjadikan pengalaman konseling terasa aman, nyaman, dan bermakna bagi setiap peserta."),
    el("ul", { style: "margin-left:20px;display:flex;flex-direction:column;gap:8px;" }, [
      el("li", {}, [
        el("strong", {}, "Empatik"),
        el("p", {}, "Kami berupaya memahami perasaan, nilai, serta kebingungan yang dialami peserta tanpa menghakimi. Empati menjadi dasar terciptanya hubungan konseling yang hangat dan suportif.")
      ]),
      el("li", {}, [
        el("strong", {}, "Profesional"),
        el("p", {}, "Psikolog kami menjunjung tinggi etika profesi, menjaga kerahasiaan, serta bekerja sesuai dengan prinsip keilmuan psikologi sehingga peserta merasa aman dan dihargai.")
      ]),
      el("li", {}, [
        el("strong", {}, "Objektif dan Netral"),
        el("p", {}, "Kami tidak memaksakan pandangan pribadi. Setiap keputusan tetap berada di tangan peserta, sementara psikolog berperan sebagai pendamping dalam proses eksplorasi dan refleksi.")
      ]),
      el("li", {}, [
        el("strong", {}, "Komunikatif dan Asesif"),
        el("p", {}, "Melalui proses konseling dan dialog terbuka, psikolog membantu peserta mengeksplorasi situasi yang dihadapi serta memberikan umpan balik dengan bahasa yang jelas, mudah dipahami, dan membangun")
      ]),
      el("li", {}, [
        el("strong", {}, "Berorientasi pada Pengembangan Klien"),
        el("p", {}, "Fokus konseling tidak hanya pada penyelesaian masalah sesaat, tetapi juga membantu peserta memahami potensi diri dan mengembangkan kemampuan pengambilan keputusan karier secara berkelanjutan.")
      ])

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
    el("section", { class: "hero section section--dark" }, [
      el("h2", { class: "hero__title" }, "Tentang Layanan Konseling Karier — 100% Gratis"),
      el("p", { class: "hero__desc" }, "ITB Career Center memberikan layanan Konseling Karier bagi mahasiswa dan alumni ITB maupun non‑ITB. Lewat Konseling Karier, teman karier akan dibantu merencanakan, memilih, mempersiapkan karier, serta mendapatkan tips untuk memasuki dunia kerja.")
    ]),
    story,
    competencies,
    psychologists,
    FooterInfo()
  ]);
}
