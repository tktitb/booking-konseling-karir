import { el } from "../utils/dom.js";

export function FAQSection() {
  const faqs = [
    {
      q: "Apa yang perlu dipersiapkan sebelum konseling karier?",
      a: "Jika berencana melakukan CV Review, siapkan file CV terbaru. Untuk konsultasi karier umum, siapkan pertanyaan atau topik yang ingin dibahas agar sesi lebih fokus."
    },
    {
      q: "Berapa lama durasi setiap sesi konseling?",
      a: "Setiap sesi berlangsung selama 45 menit."
    },
    {
      q: "Apakah jadwal konseling dapat diubah (reschedule)?",
      a: "Ya, jadwal dapat diubah maksimal H‑2 sebelum sesi berlangsung."
    },
    {
    q: "Apakah layanan konseling karier ITB terbuka untuk umum?",
    a: el("span", {}, [
        "Ya, layanan ini terbuka untuk mahasiswa dan alumni ITB maupun mahasiswa dan alumni non‑ITB, dengan syarat sudah terdaftar sebagai member ITB Career Center melalui ",
        el("a", { href: "https://karir.itb.ac.id", target: "_blank", rel: "noopener noreferrer", class: "faq-link" }, "karir.itb.ac.id"),
        "."
    ])
    },
    {
      q: "Apakah konseling dilakukan secara online atau tatap muka?",
      a: "Konseling dapat dilakukan secara online maupun tatap muka, sesuai dengan mode yang tertera pada jadwal."
    },
    {
      q: "Apakah ada biaya untuk mengikuti konseling karier?",
      a: "Layanan konseling karier ITB tidak dipungut biaya bagi member ITB Career Center."
    }
  ];

  const faqItems = faqs.map(item =>
    el("div", { class: "faq-item" }, [
      el("button", { class: "faq-question", type: "button" }, item.q),
      el("div", { class: "faq-answer" }, item.a)
    ])
  );

  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  return el("section", { class: "faq-section card section section--light" }, [
    el("h2", { class: "faq-title" }, "FAQ Konseling Karier"),
    ...faqItems
  ]);
}
