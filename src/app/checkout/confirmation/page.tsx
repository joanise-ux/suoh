"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { t } = useStore();

  const orderId = searchParams.get("id") || "#SUOH-2026-0000";
  const total = searchParams.get("total") || "0";
  const items = searchParams.get("items") || "0";
  const delivery = searchParams.get("delivery") || "InPost";
  const payment = searchParams.get("payment") || "Card";

  return (
    <div className="max-w-[580px] mx-auto text-center py-12 md:py-20 px-6">
      {/* Check icon */}
      <div className="w-[60px] h-[60px] border border-whiskey rounded-full flex items-center justify-center mx-auto mb-8 text-[22px] text-whiskey">
        &#10003;
      </div>

      <h1 className="font-serif text-[clamp(28px,4vw,44px)] font-light text-champagne mb-3">
        {t("Order Confirmed.", "Zamówienie potwierdzone.")}
      </h1>
      <p className="text-[13px] text-champagne-muted leading-[1.8] mb-10">
        {t(
          "Thank you for your order. We'll handcraft your piece with care and notify you when it ships.",
          "Dziękujemy za zamówienie. Powiadomimy Cię, gdy przesyłka zostanie wysłana."
        )}
      </p>

      <div className="text-[11px] tracking-[0.2em] text-whiskey mb-10">
        {t("Order", "Zamówienie")} {orderId}
      </div>

      {/* Order details card */}
      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 text-left mb-8">
        <div className="flex justify-between py-2 border-b border-[rgba(211,152,88,0.07)] text-[13px]">
          <span className="text-champagne-muted">{t("Items", "Produkty")}</span>
          <span className="text-champagne">
            {items} {Number(items) === 1 ? t("piece", "sztuka") : t("pieces", "sztuk")}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-[rgba(211,152,88,0.07)] text-[13px]">
          <span className="text-champagne-muted">{t("Delivery", "Dostawa")}</span>
          <span className="text-champagne">{delivery}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-[rgba(211,152,88,0.07)] text-[13px]">
          <span className="text-champagne-muted">{t("Estimated", "Przewidywany czas")}</span>
          <span className="text-champagne">{t("2-4 business days", "2-4 dni robocze")}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-[rgba(211,152,88,0.07)] text-[13px]">
          <span className="text-champagne-muted">{t("Payment", "Płatność")}</span>
          <span className="text-champagne">Stripe &middot; {payment}</span>
        </div>
        <div className="flex justify-between py-2 mt-2 border-t border-[rgba(211,152,88,0.15)] text-[13px]">
          <span className="text-champagne-muted">{t("Total paid", "Zapłacono")}</span>
          <span className="text-whiskey">{Number(total).toLocaleString("pl")} PLN</span>
        </div>
      </div>

      <Link
        href="/account"
        className="block w-full max-w-[300px] mx-auto bg-whiskey border-none py-4 text-[11px] tracking-[0.25em] uppercase text-black font-sans hover:bg-champagne transition-colors no-underline text-center mb-3"
      >
        {t("View My Orders", "Moje zamówienia")}
      </Link>
      <Link
        href="/"
        className="block w-full max-w-[300px] mx-auto bg-transparent border border-[rgba(211,152,88,0.15)] py-3.5 text-[11px] tracking-[0.2em] uppercase text-champagne-muted font-sans hover:border-whiskey hover:text-champagne transition-all no-underline text-center"
      >
        {t("Continue Shopping", "Kontynuuj zakupy")}
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-28 md:pt-36 pb-20">
        <Suspense
          fallback={
            <div className="text-center text-champagne-muted pt-20">
              Loading...
            </div>
          }
        >
          <ConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
