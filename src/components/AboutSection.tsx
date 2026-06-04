"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import RevealOnScroll from "./RevealOnScroll";

export default function AboutSection() {
  const { t } = useStore();

  return (
    <section id="about" className="bg-black py-16 md:py-24 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="relative">
            <Image
              src="/images/about-suoh.jpg"
              alt="About SUOH"
              width={600}
              height={800}
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute -top-5 -left-5 w-[55%] h-[55%] border border-[rgba(211,152,88,0.18)] -z-0 hidden md:block" />
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-4 block">
              ✦ {t("About SUOH", "O SUOH")}
            </span>
            <h2 className="font-serif text-[clamp(28px,3vw,46px)] font-light text-champagne leading-[1.15] mb-6">
              {t("Every stitch,", "Każdy ścieg,")}
              <br />
              {t("intentional.", "z intencją.")}
            </h2>
            <p className="text-[14px] leading-[1.95] text-champagne-dim mb-5">
              {t(
                "SUOH is a one-woman studio based in Wrocław, Poland. Each bag, keychain and gift is handcrafted from start to finish — no shortcuts, no mass production. Only pieces made with care, attention, and a quiet obsession with detail.",
                "SUOH to jednoosobowe studio z Wrocławia. Każda torebka, brelok i prezent jest ręcznie wykonany od początku do końca — bez skrótów, bez masowej produkcji. Tylko produkty tworzone z troską, uwagą i cichą obsesją na punkcie detalu."
              )}
            </p>
            <p className="text-[14px] leading-[1.95] text-champagne-dim mb-5">
              {t(
                "Each product is unique and one of a kind. We do this out of love for craft.",
                "Każdy produkt jest wyjątkowy i niepowtarzalny. Robimy to z miłości do rzemiosła."
              )}
            </p>
            <Link
              href="/about"
              className="text-[11px] tracking-[0.2em] uppercase text-whiskey no-underline border-b border-[rgba(211,152,88,0.35)] pb-1 hover:border-whiskey transition-colors duration-300"
            >
              {t("Our Story →", "Nasza historia →")}
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
