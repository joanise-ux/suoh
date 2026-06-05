"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function ContactPage() {
  const { t } = useStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-28 md:pt-36 pb-20">
        <div className="max-w-[760px] mx-auto px-6">
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline mb-8 inline-block"
          >
            &larr; {t("Back to Home", "Wróć na stronę główną")}
          </Link>

          <RevealOnScroll>
            <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-3 block">
              ✦ {t("Contact", "Kontakt")}
            </span>
            <h1 className="font-serif text-[clamp(28px,5vw,48px)] font-light text-champagne mb-3">
              {t("Get in touch", "Napisz do nas")}
            </h1>
            <p className="text-[13px] text-champagne-muted leading-[1.8] mb-12">
              {t(
                "Have a question, custom order idea, or just want to say hello? We'd love to hear from you.",
                "Masz pytanie, pomysł na zamówienie indywidualne, lub po prostu chcesz się przywitać? Chętnie od Ciebie usłyszymy."
              )}
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7">
                <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
                  {t("Email", "Email")}
                </div>
                <a
                  href="mailto:hello@suoh.pl"
                  className="text-[15px] text-champagne no-underline hover:text-whiskey transition-colors"
                >
                  hello@suoh.pl
                </a>
                <p className="text-[12px] text-champagne-muted leading-[1.8] mt-3">
                  {t(
                    "We respond within 24 hours on business days.",
                    "Odpowiadamy w ciągu 24 godzin w dni robocze."
                  )}
                </p>
              </div>

              <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7">
                <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
                  {t("Studio", "Studio")}
                </div>
                <p className="text-[15px] text-champagne mb-1">
                  {t("Wrocław, Poland", "Wrocław, Polska")}
                </p>
                <p className="text-[12px] text-champagne-muted leading-[1.8] mt-3">
                  {t(
                    "We do not accept visitors at our studio.",
                    "Nie przyjmujemy gości w studio."
                  )}
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 md:p-10">
              <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-6">
                {t("Send us a message", "Wyślij wiadomość")}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder={t("Your name", "Twoje imię")}
                    required
                    className="bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[12px] tracking-[0.1em] text-champagne font-sans outline-none placeholder:text-[rgba(234,206,170,0.35)] focus:border-whiskey transition-colors"
                  />
                  <input
                    type="email"
                    placeholder={t("Your email", "Twój email")}
                    required
                    className="bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[12px] tracking-[0.1em] text-champagne font-sans outline-none placeholder:text-[rgba(234,206,170,0.35)] focus:border-whiskey transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder={t("Subject", "Temat")}
                  className="bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[12px] tracking-[0.1em] text-champagne font-sans outline-none placeholder:text-[rgba(234,206,170,0.35)] focus:border-whiskey transition-colors"
                />
                <textarea
                  placeholder={t("Your message", "Twoja wiadomość")}
                  required
                  rows={6}
                  className="bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[12px] tracking-[0.1em] text-champagne font-sans outline-none placeholder:text-[rgba(234,206,170,0.35)] focus:border-whiskey transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="self-start bg-whiskey border-none py-3.5 px-10 text-[10px] tracking-[0.22em] uppercase text-black font-sans hover:bg-champagne transition-colors duration-300"
                >
                  {submitted
                    ? t("Sent ✓", "Wysłano ✓")
                    : t("Send message", "Wyślij wiadomość")}
                </button>
              </form>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-16 text-center">
              <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
                {t("Follow us", "Obserwuj nas")}
              </div>
              <div className="flex justify-center gap-8">
                {["Instagram", "TikTok", "Pinterest"].map((social) => (
                  <span
                    key={social}
                    className="text-[12px] tracking-[0.15em] text-champagne-muted hover:text-whiskey transition-colors cursor-pointer"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </main>
      <Footer />
    </>
  );
}
