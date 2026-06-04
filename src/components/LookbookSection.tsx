"use client";

import Image from "next/image";
import { useStore } from "@/lib/store";
import RevealOnScroll from "./RevealOnScroll";

const looks = [
  { src: "/images/lookbook-1.jpg", alt: "Look 1", span: true },
  { src: "/images/lookbook-2.jpg", alt: "Look 2" },
  { src: "/images/lookbook-3.jpg", alt: "Look 3" },
  { src: "/images/lookbook-4.jpg", alt: "Look 4" },
  { src: "/images/lookbook-5.jpg", alt: "Look 5" },
];

export default function LookbookSection() {
  const { t } = useStore();

  return (
    <section id="lookbook" className="bg-balsamico pt-16 md:pt-24 pb-0 px-6 md:px-12">
      <RevealOnScroll className="pb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-4 block">
          ✦ Lookbook
        </span>
        <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-light text-champagne">
          {t("As Worn", "W stylizacjach")}
        </h2>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-[250px_250px] gap-0.5">
          {looks.map((look) => (
            <div
              key={look.alt}
              className={`overflow-hidden group ${
                look.span ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={look.src}
                alt={look.alt}
                width={800}
                height={800}
                className="w-full h-full object-cover block brightness-[0.8] group-hover:scale-104 group-hover:brightness-100 transition-all duration-600"
              />
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
