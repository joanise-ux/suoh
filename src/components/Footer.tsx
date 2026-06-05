"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function Footer() {
  const { t } = useStore();

  const shopLinks = [
    { label: t("Bags", "Torebki"), href: "/category/bags" },
    { label: t("Keychains", "Breloki"), href: "/category/keychains" },
    { label: t("Gifts", "Prezenty"), href: "/category/gifts" },
    { label: t("New In", "Nowości"), href: "/#new" },
  ];

  const infoLinks = [
    { label: t("About", "O nas"), href: "/about" },
    { label: t("Shipping & Returns", "Wysyłka i zwroty"), href: "/shipping" },
    { label: t("Care Guide", "Pielęgnacja"), href: "/care" },
    { label: t("Contact", "Kontakt"), href: "/contact" },
  ];

  const socialLinks = ["Instagram", "TikTok", "Pinterest"];

  return (
    <footer className="bg-balsamico px-6 md:px-12 pt-15 pb-7.5 border-t border-[rgba(211,152,88,0.08)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <Link
            href="/"
            className="font-serif text-[20px] font-light tracking-[0.35em] text-champagne no-underline"
          >
            SUOH
          </Link>
          <div className="font-serif italic text-[15px] text-[rgba(234,206,170,0.45)] leading-[1.7] mt-3.5">
            &ldquo;Art you can carry.&rdquo;
            <br />
            &ldquo;Sztuka, którą nosisz.&rdquo;
          </div>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-whiskey mb-5">
            {t("Shop", "Sklep")}
          </div>
          <ul className="list-none flex flex-col gap-3">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13px] text-[rgba(234,206,170,0.45)] no-underline hover:text-champagne transition-colors duration-300 tracking-[0.05em]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-whiskey mb-5">
            Info
          </div>
          <ul className="list-none flex flex-col gap-3">
            {infoLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13px] text-[rgba(234,206,170,0.45)] no-underline hover:text-champagne transition-colors duration-300 tracking-[0.05em]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-whiskey mb-5">
            {t("Follow", "Obserwuj")}
          </div>
          <ul className="list-none flex flex-col gap-3">
            {socialLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[13px] text-[rgba(234,206,170,0.45)] no-underline hover:text-champagne transition-colors duration-300 tracking-[0.05em]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[rgba(211,152,88,0.08)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-[11px] text-[rgba(234,206,170,0.25)] tracking-[0.1em]">
          © 2026 SUOH · Wrocław, Poland · All rights reserved
        </div>
        <div className="flex gap-5">
          {socialLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[11px] tracking-[0.15em] text-[rgba(234,206,170,0.35)] no-underline uppercase hover:text-whiskey transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
