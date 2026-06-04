"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const { lang, toggleLang, cartCount, t } = useStore();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY && y > 220);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const navLinks = [
    { href: "/#new", label: t("Shop", "Sklep") },
    { href: "/#collections", label: t("Collections", "Kolekcje") },
    { href: "/#about", label: t("About", "O nas") },
    { href: "/#lookbook", label: "Lookbook" },
    { href: "/#contact", label: t("Contact", "Kontakt") },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 z-100 transition-all duration-400 ${
        scrolled
          ? "top-0 bg-[rgba(10,6,5,0.95)] backdrop-blur-[10px]"
          : "top-9 bg-transparent"
      } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[rgba(211,152,88,0.1)]">
        <Link
          href="/"
          className="font-serif text-[22px] font-light tracking-[0.3em] text-champagne no-underline"
        >
          SUOH
        </Link>

        <ul className="hidden md:flex gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[11px] tracking-[0.18em] uppercase text-champagne no-underline opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-5 items-center">
          <button
            onClick={toggleLang}
            className="text-[10px] tracking-[0.15em] text-champagne opacity-60 hover:opacity-100 bg-transparent border-none transition-opacity duration-300 hidden md:block cursor-pointer"
          >
            {lang === "en" ? "PL" : "EN"} / {lang === "en" ? "EN" : "PL"}
          </button>

          <Link
            href="/account"
            className="bg-transparent border-none text-champagne opacity-70 hover:opacity-100 transition-opacity duration-300 text-lg"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </Link>

          <Link
            href="/wishlist"
            className="bg-transparent border-none text-champagne opacity-70 hover:opacity-100 transition-opacity duration-300 text-lg relative"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Link>

          <Link
            href="/cart"
            className="bg-transparent border-none text-champagne opacity-70 hover:opacity-100 transition-opacity duration-300 text-lg relative"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              viewBox="0 0 24 24"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-whiskey text-black w-[15px] h-[15px] rounded-full text-[8px] flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          <button
            className="md:hidden bg-transparent border-none text-champagne text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[rgba(10,6,5,0.98)] backdrop-blur-[10px] px-6 py-8">
          <ul className="flex flex-col gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] tracking-[0.18em] uppercase text-champagne no-underline opacity-80 hover:opacity-100 transition-opacity"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleLang}
            className="mt-6 text-[10px] tracking-[0.15em] text-champagne opacity-60 bg-transparent border-none cursor-pointer"
          >
            {lang === "en" ? "PL" : "EN"} / {lang === "en" ? "EN" : "PL"}
          </button>
        </div>
      )}
    </nav>
  );
}
