"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function CarePage() {
  const { t } = useStore();

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
              ✦ {t("Care Guide", "Pielęgnacja")}
            </span>
            <h1 className="font-serif text-[clamp(28px,5vw,48px)] font-light text-champagne mb-3">
              {t("How to care for your SUOH", "Jak dbać o produkty SUOH")}
            </h1>
            <p className="text-[13px] text-champagne-muted leading-[1.8] mb-10">
              {t(
                "All SUOH products are handmade from polyester silk cord using crochet techniques. With proper care, they will serve you beautifully for years.",
                "Wszystkie produkty SUOH są ręcznie wykonane na szydełku ze sznurka z jedwabiu poliestrowego. Przy odpowiedniej pielęgnacji będą Ci pięknie służyć przez lata."
              )}
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <SectionHeading>
              {t("Composition", "Skład")}
            </SectionHeading>
            <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-10">
              <InfoRow
                label={t("Main material", "Główny materiał")}
                value={t("100% polyester silk cord", "Sznurek z jedwabiu poliestrowego 100%")}
              />
              <InfoRow
                label={t("Technique", "Technika")}
                value={t("Handmade crochet", "Ręczne szydełkowanie")}
              />
              <div className="flex justify-between py-3 text-[13px]">
                <span className="text-champagne-muted">
                  {t("Alternative version", "Wersja alternatywna")}
                </span>
                <span className="text-champagne text-right">
                  {t("T-shirt yarn (select models)", "Sznurek t-shirt (wybrane modele)")}
                </span>
              </div>
            </div>

            <Paragraph>
              {t(
                "Some models are also available in t-shirt yarn version. Not every design is made in both versions — the choice of material depends on the pattern, the final look and the functionality of the product.",
                "Niektóre modele dostępne są również w wersji ze sznurka t-shirt. Nie każdy wzór jest wykonywany w obu wersjach — wybór materiału zależy od wzoru, końcowego wyglądu i funkcjonalności produktu."
              )}
            </Paragraph>
          </RevealOnScroll>

          <RevealOnScroll>
            <SectionHeading>
              {t("Daily care", "Codzienna pielęgnacja")}
            </SectionHeading>
            <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
              <div className="flex flex-col gap-4">
                {[
                  t(
                    "Store your bag in the dust bag provided when not in use — it protects against dust and sunlight.",
                    "Przechowuj torebkę w dołączonym woreczku ochronnym, gdy jej nie używasz — chroni przed kurzem i światłem."
                  ),
                  t(
                    "Avoid prolonged exposure to direct sunlight to prevent color fading.",
                    "Unikaj długotrwałego wystawiania na bezpośrednie światło słoneczne, aby zapobiec blaknięciu kolorów."
                  ),
                  t(
                    "Do not overload the bag beyond its intended capacity to maintain its shape.",
                    "Nie przeciążaj torebki ponad jej pojemność, aby zachować kształt."
                  ),
                  t(
                    "Keep away from sharp objects that could snag the crochet weave.",
                    "Trzymaj z dala od ostrych przedmiotów, które mogłyby zahaczyć o splot szydełkowy."
                  ),
                ].map((text, i) => (
                  <div key={i}>
                    <div className="flex gap-3">
                      <span className="text-whiskey text-[12px] mt-0.5 flex-shrink-0">✦</span>
                      <span className="text-[13px] text-champagne-muted leading-[1.8]">{text}</span>
                    </div>
                    {i < 3 && <div className="h-px bg-[rgba(211,152,88,0.07)] mt-4" />}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <SectionHeading>
              {t("Cleaning", "Czyszczenie")}
            </SectionHeading>
            <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
              <div className="flex flex-col gap-5">
                {[
                  {
                    step: "01",
                    title: t("Spot cleaning", "Czyszczenie punktowe"),
                    desc: t(
                      "For small stains, gently wipe with a damp cloth. Use mild soap if needed. Do not rub aggressively — dab gently.",
                      "W przypadku małych plam delikatnie przetrzyj wilgotną ściereczką. W razie potrzeby użyj łagodnego mydła. Nie trzyj agresywnie — delikatnie tamponuj."
                    ),
                  },
                  {
                    step: "02",
                    title: t("Hand washing", "Pranie ręczne"),
                    desc: t(
                      "If needed, hand wash in lukewarm water (max 30°C) with a gentle detergent. Gently squeeze — do not wring or twist. Rinse thoroughly.",
                      "W razie potrzeby pierz ręcznie w letniej wodzie (max 30°C) z delikatnym detergentem. Delikatnie wyciśnij — nie wykręcaj. Dokładnie wypłucz."
                    ),
                  },
                  {
                    step: "03",
                    title: t("Drying", "Suszenie"),
                    desc: t(
                      "Reshape while damp and lay flat on a towel to dry. Do not use a dryer or hang to dry — this can deform the crochet structure.",
                      "Uformuj kształt na wilgotno i połóż płasko na ręczniku do wyschnięcia. Nie używaj suszarki ani nie wieszaj — może to zdeformować strukturę szydełkową."
                    ),
                  },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex gap-4">
                      <span className="text-whiskey text-[18px] font-serif flex-shrink-0 w-[28px]">
                        {item.step}
                      </span>
                      <div>
                        <div className="text-[13px] text-champagne mb-1.5">{item.title}</div>
                        <div className="text-[12px] text-champagne-muted leading-[1.8]">{item.desc}</div>
                      </div>
                    </div>
                    {i < 2 && <div className="h-px bg-[rgba(211,152,88,0.07)] mt-5" />}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <SectionHeading>
              {t("What to avoid", "Czego unikać")}
            </SectionHeading>
            <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
              <div className="flex flex-col gap-4">
                {[
                  t("Machine washing or dry cleaning", "Prania w pralce i prania chemicznego"),
                  t("Ironing directly on the cord", "Prasowania bezpośrednio na sznurku"),
                  t("Bleach or harsh chemical cleaners", "Wybielacza i agresywnych środków chemicznych"),
                  t("Tumble drying", "Suszenia w suszarce bębnowej"),
                ].map((text, i) => (
                  <div key={i}>
                    <div className="flex gap-3">
                      <span className="text-[rgba(211,152,88,0.5)] text-[12px] mt-0.5 flex-shrink-0">✕</span>
                      <span className="text-[13px] text-champagne-muted leading-[1.8]">{text}</span>
                    </div>
                    {i < 3 && <div className="h-px bg-[rgba(211,152,88,0.07)] mt-4" />}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <SectionHeading>
              {t("Hardware care", "Pielęgnacja okuć")}
            </SectionHeading>
            <Paragraph>
              {t(
                "Metal hardware (clasps, chains, rings) can be wiped with a soft, dry cloth. Avoid contact with water, perfumes and cosmetics to prevent tarnishing.",
                "Metalowe okucia (zapięcia, łańcuszki, kółka) można przetrzeć miękką, suchą ściereczką. Unikaj kontaktu z wodą, perfumami i kosmetykami, aby zapobiec matowieniu."
              )}
            </Paragraph>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mt-10 text-center">
              <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-3">
                {t("Questions?", "Pytania?")}
              </div>
              <Paragraph>
                {t(
                  "If you need help with care or have any questions about your product, don't hesitate to reach out.",
                  "Jeśli potrzebujesz pomocy z pielęgnacją lub masz pytania dotyczące swojego produktu, napisz do nas."
                )}
              </Paragraph>
              <a
                href="mailto:hello@suoh.pl"
                className="inline-block text-[13px] text-whiskey no-underline hover:text-champagne transition-colors tracking-[0.05em]"
              >
                hello@suoh.pl
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5 mt-10 first:mt-0">
      {children}
    </h2>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 border-b border-[rgba(211,152,88,0.07)] text-[13px]">
      <span className="text-champagne-muted">{label}</span>
      <span className="text-champagne text-right">{value}</span>
    </div>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] text-champagne-muted leading-[1.9] mb-4">
      {children}
    </p>
  );
}
