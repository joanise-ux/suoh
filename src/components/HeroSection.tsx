"use client";

import Image from "next/image";
import { useStore } from "@/lib/store";

export default function HeroSection() {
  const { t } = useStore();

  return (
    <section className="h-screen relative overflow-hidden p-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/noir-crossbody-gold.jpg"
          alt="SUOH Hero"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,6,5,0.35)] via-[rgba(10,6,5,0.55)] to-[rgba(10,6,5,0.9)]" />
      <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center w-full px-4">
        <div className="text-[11px] tracking-[0.3em] uppercase text-whiskey mb-4 opacity-0 animate-[fadeUp_1s_0.5s_forwards]">
          {t("New Collection", "Nowa kolekcja")} &nbsp;✦&nbsp; SS 2026
        </div>
        <h1 className="font-serif text-[clamp(48px,9vw,110px)] font-light leading-none text-champagne mb-2 opacity-0 animate-[fadeUp_1s_0.8s_forwards] tracking-[0.3em]">
          SUOH
        </h1>
        <div className="font-serif text-[clamp(16px,2vw,24px)] italic font-light text-whiskey mb-10 opacity-0 animate-[fadeUp_1s_1.1s_forwards]">
          {t("Art you can carry.", "Sztuka, którą nosisz.")}
        </div>
        <a
          href="#new"
          className="inline-block border border-whiskey text-champagne py-3.5 px-11 text-[11px] tracking-[0.25em] uppercase no-underline hover:bg-whiskey hover:text-black transition-colors duration-300 opacity-0 animate-[fadeUp_1s_1.4s_forwards]"
        >
          {t("Explore Collection", "Przeglądaj kolekcję")}
        </a>
      </div>
    </section>
  );
}
