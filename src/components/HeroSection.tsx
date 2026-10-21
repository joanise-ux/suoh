"use client";

import Image from "next/image";
import { useStore } from "@/lib/store";

export default function HeroSection() {
  const { t } = useStore();

  return (
    <section className="h-screen relative overflow-hidden p-0">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <Image
            src="/images/hero-brown-shoulder.webp"
            alt={t("Brown crochet shoulder bag on the rocks", "Brązowa szydełkowa torebka na kamieniach")}
            fill
            className="object-cover object-[center_40%]"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="relative hidden md:block">
          <Image
            src="/images/hero-navy-chain.webp"
            alt={t("Navy crochet bag with a chain strap", "Granatowa szydełkowa torebka z łańcuszkiem")}
            fill
            className="object-cover object-[center_60%]"
            priority
            sizes="50vw"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,6,5,0.2)] via-[rgba(10,6,5,0.35)] to-[rgba(10,6,5,0.88)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[rgba(10,6,5,0.75)] to-transparent" />
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
