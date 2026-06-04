"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function AboutPage() {
  const { t } = useStore();

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen">
        {/* Hero */}
        <div className="relative h-[50vh] overflow-hidden">
          <Image
            src="/images/about-suoh.jpg"
            alt="About SUOH"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-3">
              ✦ {t("Our Story", "Nasza historia")}
            </span>
            <h1 className="font-serif text-[clamp(36px,6vw,64px)] font-light text-champagne tracking-[0.1em]">
              SUOH
            </h1>
          </div>
        </div>

        <div className="px-6 md:px-12 py-16 md:py-24 max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline mb-16 inline-block"
          >
            ← {t("Back to home", "Wróć na stronę główną")}
          </Link>

          {/* Section 1: The Beginning */}
          <RevealOnScroll>
            <section className="mb-20">
              <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-4 block">
                ✦ {t("The Beginning", "Początki")}
              </span>
              <h2 className="font-serif text-[clamp(24px,3vw,38px)] font-light text-champagne leading-[1.2] mb-6">
                {t(
                  "Born from a love of craft",
                  "Zrodzone z miłości do rzemiosła"
                )}
              </h2>
              <p className="text-[14px] leading-[1.95] text-champagne-dim mb-5">
                {t(
                  "SUOH began as a quiet dream — a desire to create something meaningful with my own hands. What started as evenings spent experimenting with leather and thread slowly became a passion I couldn't set aside. Every piece I made felt like a conversation between material and maker, and I knew I wanted to share that feeling with others.",
                  "SUOH zaczęło się jako cichy sen — pragnienie stworzenia czegoś znaczącego własnymi rękami. To, co zaczynało się jako wieczory spędzone na eksperymentowaniu ze skórą i nicią, powoli stało się pasją, której nie mogłam odłożyć na bok. Każdy wykonany przeze mnie element był jak rozmowa między materiałem a twórcą, i wiedziałam, że chcę podzielić się tym uczuciem z innymi."
                )}
              </p>
              <p className="text-[14px] leading-[1.95] text-champagne-dim">
                {t(
                  "In 2023, working from a small studio in Wrocław, SUOH was born — not as a brand chasing trends, but as a space where handcraft meets intention.",
                  "W 2023 roku, pracując w małym studio we Wrocławiu, SUOH się narodziło — nie jako marka goniąca za trendami, lecz jako przestrzeń, gdzie rękodzieło spotyka się z intencją."
                )}
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 2: The Philosophy */}
          <RevealOnScroll>
            <section className="mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/lookbook-2.jpg"
                    alt={t("Handcrafted details", "Ręcznie wykonane detale")}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-4 block">
                    ✦ {t("Philosophy", "Filozofia")}
                  </span>
                  <h2 className="font-serif text-[clamp(24px,3vw,38px)] font-light text-champagne leading-[1.2] mb-6">
                    {t(
                      "Every stitch, intentional",
                      "Każdy ścieg, z intencją"
                    )}
                  </h2>
                  <p className="text-[14px] leading-[1.95] text-champagne-dim mb-5">
                    {t(
                      "I believe accessories should carry weight — not just physical, but emotional. A bag isn't just a bag when someone poured hours into every fold and seam. A keychain isn't just a trinket when it's shaped by hand with someone specific in mind.",
                      "Wierzę, że akcesoria powinny nieść ze sobą ciężar — nie tylko fizyczny, ale emocjonalny. Torebka to nie tylko torebka, gdy ktoś poświęcił godziny na każde zagięcie i szew. Brelok to nie tylko drobiazg, gdy został uformowany ręcznie z myślą o konkretnej osobie."
                    )}
                  </p>
                  <p className="text-[14px] leading-[1.95] text-champagne-dim">
                    {t(
                      "There's no mass production here. No shortcuts. Each piece is one of a kind — because the person receiving it is, too.",
                      "Nie ma tu masowej produkcji. Żadnych skrótów. Każdy element jest jedyny w swoim rodzaju — bo osoba, która go otrzyma, też taka jest."
                    )}
                  </p>
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* Section 3: The Process */}
          <RevealOnScroll>
            <section className="mb-20">
              <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-4 block">
                ✦ {t("The Process", "Proces")}
              </span>
              <h2 className="font-serif text-[clamp(24px,3vw,38px)] font-light text-champagne leading-[1.2] mb-6">
                {t(
                  "From raw material to your hands",
                  "Od surowca do Twoich rąk"
                )}
              </h2>
              <p className="text-[14px] leading-[1.95] text-champagne-dim mb-5">
                {t(
                  "Every SUOH product starts as an idea — sometimes inspired by a color, a texture, or a feeling I want to capture. I source materials carefully, choosing quality leathers, fabrics, and hardware that will age beautifully over time.",
                  "Każdy produkt SUOH zaczyna się jako pomysł — czasem inspirowany kolorem, teksturą lub uczuciem, które chcę uchwycić. Starannie dobieram materiały, wybierając wysokiej jakości skóry, tkaniny i okucia, które pięknie starzeją się z upływem czasu."
                )}
              </p>
              <p className="text-[14px] leading-[1.95] text-champagne-dim mb-5">
                {t(
                  "Cutting, stitching, finishing — each step is done by hand in my Wrocław studio. There's no assembly line, no delegation. When you receive a SUOH piece, you receive something that one person made from start to finish, with focus and care at every stage.",
                  "Krojenie, szycie, wykańczanie — każdy etap jest wykonywany ręcznie w moim wrocławskim studio. Nie ma linii montażowej, nie ma delegowania. Kiedy otrzymujesz produkt SUOH, otrzymujesz coś, co jedna osoba wykonała od początku do końca, z uwagą i troską na każdym etapie."
                )}
              </p>
            </section>
          </RevealOnScroll>

          {/* Section 4: The Future */}
          <RevealOnScroll>
            <section className="mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-4 block">
                    ✦ {t("Looking Ahead", "Patrząc w przyszłość")}
                  </span>
                  <h2 className="font-serif text-[clamp(24px,3vw,38px)] font-light text-champagne leading-[1.2] mb-6">
                    {t(
                      "Small studio, big heart",
                      "Małe studio, wielkie serce"
                    )}
                  </h2>
                  <p className="text-[14px] leading-[1.95] text-champagne-dim mb-5">
                    {t(
                      "SUOH will always be small — and that's by design. Staying small means I can pour my full attention into every piece. It means I can know my materials, know my craft, and know that what I send out into the world meets my own standard.",
                      "SUOH zawsze będzie małe — i to celowo. Bycie małym oznacza, że mogę poświęcić pełną uwagę każdemu elementowi. To znaczy, że znam swoje materiały, znam swoje rzemiosło i wiem, że to, co wypuszczam w świat, spełnia moje własne standardy."
                    )}
                  </p>
                  <p className="text-[14px] leading-[1.95] text-champagne-dim">
                    {t(
                      "Thank you for being here, for supporting handmade, and for choosing something made with love over something made with speed.",
                      "Dziękuję, że tu jesteś, że wspierasz ręczne rzemiosło i że wybierasz coś zrobionego z miłością zamiast czegoś zrobionego na szybko."
                    )}
                  </p>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/lookbook-4.jpg"
                    alt={t("SUOH studio", "Studio SUOH")}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* CTA */}
          <RevealOnScroll>
            <div className="text-center py-12 border-t border-[rgba(211,152,88,0.15)]">
              <p className="font-serif text-[clamp(20px,2.5vw,32px)] font-light text-champagne mb-6">
                {t(
                  "Ready to find your piece?",
                  "Gotowa znaleźć swój element?"
                )}
              </p>
              <Link
                href="/"
                className="inline-block text-[11px] tracking-[0.2em] uppercase text-black bg-whiskey px-8 py-3 hover:bg-champagne transition-colors duration-300 no-underline"
              >
                {t("Explore the collection", "Odkryj kolekcję")}
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </main>
      <Footer />
    </>
  );
}
