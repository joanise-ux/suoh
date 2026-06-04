"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/products";
import { useStore } from "@/lib/store";
import RevealOnScroll from "./RevealOnScroll";

export default function CollectionsGrid() {
  const { t } = useStore();

  return (
    <section id="collections" className="bg-balsamico py-16 md:py-24 px-6 md:px-12">
      <RevealOnScroll>
        <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-4 block">
          ✦ {t("Collections", "Kolekcje")}
        </span>
        <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-light text-champagne mb-14">
          {t("Shop by Category", "Kategorie")}
        </h2>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5">
          {categories.map((col) => (
            <Link
              key={col.slug}
              href={`/category/${col.slug}`}
              className="relative overflow-hidden aspect-[2/3] group cursor-pointer block no-underline"
            >
              <Image
                src={col.image}
                alt={t(col.name, col.namePL)}
                fill
                className="object-cover brightness-[0.65] group-hover:scale-105 group-hover:brightness-[0.4] transition-all duration-700"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                <div className="font-serif text-[clamp(24px,3vw,34px)] font-light tracking-[0.12em] text-champagne group-hover:tracking-[0.25em] transition-all duration-500">
                  {t(col.name, col.namePL)}
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-whiskey opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {t("Explore →", "Przeglądaj →")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
