import { el } from "../utils/dom.js";
import { PsychologistCard } from "../components/PsychologistCard.js";
import { FooterInfo } from "../components/Footer.js";

export function AboutPage() {
  const story = el("section", { class: "section section--light" }, [
    el("h3", {}, "Cerita di Balik Layanan"),
    el("p", {}, "Sejak awal berdirinya, ITB Career Center hadir untuk menjawab keresahan mahasiswa dan alumni yang sering bingung menentukan arah karier. Konseling karier kami bukan sekadar sesi tanya jawab, melainkan perjalanan bersama: ruang aman untuk mengeksplorasi potensi, menyusun strategi yang bisa dieksekusi, dan menyalakan kembali keberanian untuk melangkah."),
    el("p", {}, "Dengan pendekatan humanis dan terukur, kami membantu mengurai kebingungan menjadi peta jalan yang konkret. Tujuan kami sederhana: setiap peserta pulang dengan kejelasan dan semangat baru.")
  ]);

  const competencies = el("section", { class: "section section--light" }, [
    el("h3", {}, "Kompetensi Psikolog Kami"),
    el("p", {}, "Di balik setiap sesi konseling, ada standar profesional yang selalu kami pegang. Psikolog ITB Career Center tidak hanya empatik dan profesional, tetapi juga membawa karakter yang membuat pengalaman konseling terasa bermakna:"),
    el("ul", { style: "margin-left:20px;display:flex;flex-direction:column;gap:8px;" }, [
      el("li", {}, [
        el("strong", {}, "Empatik"),
        el("p", {}, "Kami berusaha benar-benar memahami perasaan, nilai, dan kebingungan klien tanpa menghakimi. Empati menjadi fondasi hubungan yang hangat.")
      ]),
      el("li", {}, [
        el("strong", {}, "Profesional"),
        el("p", {}, "Menjaga etika, kerahasiaan, dan bekerja sesuai standar keilmuan psikologi, sehingga peserta merasa aman.")
      ]),
      el("li", {}, [
        el("strong", {}, "Objektif dan Netral"),
        el("p", {}, "Kami tidak memaksakan opini pribadi. Keputusan tetap berada pada klien, sementara konselor berperan sebagai fasilitator.")
      ]),
      el("li", {}, [
        el("strong", {}, "Komunikatif dan Asesif"),
        el("p", {}, "Lewat wawancara dan asesmen minat-bakat, kami menggali informasi dengan tepat dan menyampaikan umpan balik dengan bahasa yang jelas dan membangun.")
      ]),
      el("li", {}, [
        el("strong", {}, "Berorientasi pada Pengembangan Klien"),
        el("p", {}, "Fokus kami bukan sekadar memberi saran instan, melainkan membantu klien mandiri dalam mengambil keputusan karier jangka panjang.")
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
