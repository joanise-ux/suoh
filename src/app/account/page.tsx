"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Tab = "login" | "register";

export default function AccountPage() {
  const { t } = useStore();
  const [tab, setTab] = useState<Tab>("login");

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-32 md:pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline mb-6 inline-block"
          >
            ← {t("Back", "Wróć")}
          </Link>

          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-light text-champagne mb-10 text-center">
            {t("My Account", "Moje konto")}
          </h1>

          <div className="flex mb-10 border-b border-[rgba(211,152,88,0.15)]">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-3.5 text-[11px] tracking-[0.2em] uppercase bg-transparent border-none transition-all duration-300 ${
                tab === "login"
                  ? "text-champagne border-b-2 border-b-whiskey"
                  : "text-champagne-dim hover:text-champagne"
              }`}
            >
              {t("Sign In", "Zaloguj się")}
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-3.5 text-[11px] tracking-[0.2em] uppercase bg-transparent border-none transition-all duration-300 ${
                tab === "register"
                  ? "text-champagne border-b-2 border-b-whiskey"
                  : "text-champagne-dim hover:text-champagne"
              }`}
            >
              {t("Register", "Zarejestruj się")}
            </button>
          </div>

          {tab === "login" ? (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
                  {t("Email", "Email")}
                </label>
                <input
                  type="email"
                  placeholder={t("your@email.com", "twoj@email.com")}
                  className="w-full bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[13px] tracking-[0.05em] text-champagne font-sans outline-none placeholder:text-champagne-faint focus:border-whiskey transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
                  {t("Password", "Hasło")}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[13px] tracking-[0.05em] text-champagne font-sans outline-none placeholder:text-champagne-faint focus:border-whiskey transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-whiskey border-none py-4 text-[11px] tracking-[0.22em] uppercase text-black font-sans hover:bg-champagne transition-colors duration-300 mt-3"
              >
                {t("Sign In", "Zaloguj się")}
              </button>
              <div className="text-center">
                <a
                  href="#"
                  className="text-[11px] text-champagne-dim tracking-[0.1em] no-underline hover:text-whiskey transition-colors"
                >
                  {t("Forgot password?", "Zapomniałeś hasła?")}
                </a>
              </div>
            </form>
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
                    {t("First name", "Imię")}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[13px] tracking-[0.05em] text-champagne font-sans outline-none placeholder:text-champagne-faint focus:border-whiskey transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
                    {t("Last name", "Nazwisko")}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[13px] tracking-[0.05em] text-champagne font-sans outline-none placeholder:text-champagne-faint focus:border-whiskey transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
                  {t("Email", "Email")}
                </label>
                <input
                  type="email"
                  placeholder={t("your@email.com", "twoj@email.com")}
                  className="w-full bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[13px] tracking-[0.05em] text-champagne font-sans outline-none placeholder:text-champagne-faint focus:border-whiskey transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
                  {t("Password", "Hasło")}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[13px] tracking-[0.05em] text-champagne font-sans outline-none placeholder:text-champagne-faint focus:border-whiskey transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
                  {t("Confirm password", "Potwierdź hasło")}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[13px] tracking-[0.05em] text-champagne font-sans outline-none placeholder:text-champagne-faint focus:border-whiskey transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-whiskey border-none py-4 text-[11px] tracking-[0.22em] uppercase text-black font-sans hover:bg-champagne transition-colors duration-300 mt-3"
              >
                {t("Create Account", "Utwórz konto")}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
