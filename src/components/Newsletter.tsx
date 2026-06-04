"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import RevealOnScroll from "./RevealOnScroll";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useStore();

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <RevealOnScroll>
      <div id="contact" className="bg-burnt text-center py-16 md:py-20 px-6 md:px-12">
        <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-2.5 block">
          ✦ {t("Join Us", "Dołącz do nas")}
        </span>
        <div className="font-serif text-[clamp(28px,3vw,44px)] font-light text-champagne mb-2.5">
          {t("Be the first to know.", "Bądź na bieżąco.")}
        </div>
        <div className="text-[13px] text-[rgba(234,206,170,0.55)] mb-10 tracking-[0.06em]">
          {t(
            "New drops, limited pieces, behind the scenes.",
            "Nowe kolekcje, limitowane edycje, kulisy pracy."
          )}
        </div>
        <div className="flex max-w-[420px] mx-auto flex-col sm:flex-row">
          <input
            type="email"
            placeholder={t("Your email address", "Twój adres email")}
            className="flex-1 bg-transparent border border-[rgba(211,152,88,0.35)] sm:border-r-0 px-5 py-3.5 text-[12px] tracking-[0.1em] text-champagne font-sans outline-none placeholder:text-[rgba(234,206,170,0.35)]"
          />
          <button
            onClick={handleSubmit}
            className="bg-whiskey border-none py-3.5 px-7 text-[10px] tracking-[0.22em] uppercase text-black font-sans hover:bg-champagne transition-colors duration-300 whitespace-nowrap"
          >
            {submitted ? t("Thank you ✓", "Dziękujemy ✓") : t("Subscribe", "Subskrybuj")}
          </button>
        </div>
      </div>
    </RevealOnScroll>
  );
}
