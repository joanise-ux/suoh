"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

const looks = [
  { src: "/images/lookbook-1.jpg", alt: "Look 1", span: true },
  { src: "/images/lookbook-2.jpg", alt: "Look 2" },
  { src: "/images/lookbook-3.jpg", alt: "Look 3" },
  { src: "/images/lookbook-4.jpg", alt: "Look 4" },
  { src: "/images/lookbook-5.jpg", alt: "Look 5" },
];

export default function LookbookPage() {
  const { t } = useStore();

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen">
        <div className="relative h-[50vh] overflow-hidden">
          <Image
            src="/images/lookbook-1.jpg"
            alt="Lookbook"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-3">
              ✦ Lookbook
            </span>
            <h1 className="font-serif text-[clamp(36px,6vw,64px)] font-light text-champagne tracking-[0.1em]">
              {t("As Worn", "W stylizacjach")}
            </h1>
          </div>
        </div>

        <div className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline mb-10 inline-block"
          >
            ← {t("Back to home", "Wróć na stronę główną")}
          </Link>

          <RevealOnScroll>
            <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-[300px_300px] gap-1">
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

          <RevealOnScroll>
            <div className="text-center py-16 border-t border-[rgba(211,152,88,0.15)] mt-16">
              <p className="font-serif text-[clamp(20px,2.5vw,32px)] font-light text-champagne mb-6">
                {t(
                  "Ready to find your piece?",
                  "Gotowa znaleźć swój element?"
                )}
              </p>
              <Link
                href="/shop"
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
