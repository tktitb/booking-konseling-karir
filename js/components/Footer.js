import { el } from "../utils/dom.js";

export function FooterInfo() {
  return el("div", { class: "card footer-info" }, [
    el("h3", { class: "card__title" }, "Informasi & Kontak"),

    el("div", { class: "footer-grid" }, [
      // Kiri: lokasi + maps
      el("div", { class: "footer-left" }, [
        el("p", { class: "footer-item" }, [
          el("i", { class: "fa-solid fa-location-dot" }),
          "Kantor ITB Career Center, GKU Timur, Lantai Dasar ITB Ganesha. Jln. Ganesha 10, Bandung 40132 Indonesia"
        ]),
        el("div", { class: "footer-item" }, [
          el("iframe", {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.002698998236!2d107.60966287475671!3d-6.890278793108773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e650a65b5dc1%3A0xda56d0b353cae67c!2sITB%20Career%20Center!5e0!3m2!1sen!2sid!4v1768614758438!5m2!1sen!2sid",
            width: "260",
            height: "200",
            style: "border:0;border-radius:12px;margin-top:8px;",
            allowfullscreen: "",
            loading: "lazy",
            referrerpolicy: "no-referrer-when-downgrade"
          })
        ])
      ]),

      // Kanan: kontak digital
      el("div", { class: "footer-right" }, [
        el("p", { class: "footer-item" }, [
          el("i", { class: "fa-brands fa-instagram" }),
          el("a", { href: "https://www.instagram.com/itbcareercenterofficial/", target: "_blank" }, "@itbcareercenterofficial")
        ]),
        el("p", { class: "footer-item" }, [
          el("i", { class: "fa-solid fa-globe" }),
          el("a", { href: "https://karir.itb.ac.id", target: "_blank" }, "karir.itb.ac.id")
        ]),
        el("p", { class: "footer-item" }, [
          el("i", { class: "fa-brands fa-whatsapp" }),
          el("a", { 
            href: "https://wa.me/6281111119463?text=Halo%20Admin%20ITB%20Career%20Center,%20saya%20ingin%20konsultasi%20terkait%20konseling%20karir...", 
            target: "_blank" 
          }, "081111119463")
        ]),
        el("p", { class: "footer-item" }, [
          el("i", { class: "fa-solid fa-envelope" }),
          el("a", { href: "mailto:career@itb.ac.id" }, "career@itb.ac.id")
        ]),
         el("p", { class: "footer-item" }, [
        ]), el("p", { class: "footer-item" }, [
        ]),
        // Ajakan / quotes
        el("p", { class: "footer-quote" }, [
          el("i", { class: "fa-solid fa-quote-left" }),
          "Tim ITB Career Center selalu siap mendampingi perjalanan karier Anda. Konsultasi, informasi, dan dukungan kami hadir untuk membantu Anda menemukan arah terbaik.."
        ]),

      ])
    ])
  ]);
}
