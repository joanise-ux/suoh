"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  const { t } = useStore();

  return (
    <>
      <title>Page not found — SUOH</title>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-28 md:pt-36 pb-20">
        <div className="max-w-[580px] mx-auto text-center px-6 py-20">
          <div className="text-[11px] tracking-[0.3em] uppercase text-whiskey mb-6">
            ✦ 404
          </div>
          <h1 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-champagne mb-4">
            {t("This page has wandered off", "Ta strona gdzieś się zgubiła")}
          </h1>
          <p className="text-[13px] text-champagne-muted leading-[1.8] mb-10">
            {t(
              "The page you're looking for doesn't exist or has been moved.",
              "Strona, której szukasz, nie istnieje lub została przeniesiona."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-block bg-whiskey text-black py-3.5 px-9 text-[11px] tracking-[0.2em] uppercase no-underline hover:bg-champagne transition-colors duration-300"
            >
              {t("Go to shop", "Przejdź do sklepu")}
            </Link>
            <Link
              href="/"
              className="inline-block border border-whiskey text-champagne py-3.5 px-9 text-[11px] tracking-[0.2em] uppercase no-underline hover:bg-whiskey hover:text-black transition-colors duration-300"
            >
              {t("Back to home", "Wróć na stronę główną")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
