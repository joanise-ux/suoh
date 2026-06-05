"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { getProductBySlug } from "@/lib/products";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  { en: "Order Placed", pl: "Zamówienie złożone" },
  { en: "Processing", pl: "W przygotowaniu" },
  { en: "Shipped", pl: "Wysłane" },
  { en: "Delivered", pl: "Dostarczone" },
];

function stepIndex(status: "processing" | "shipped" | "delivered") {
  if (status === "processing") return 1;
  if (status === "shipped") return 2;
  return 3;
}

export default function TrackingPage() {
  const params = useParams();
  const code = params.code as string;
  const { orders, t, lang } = useStore();

  const order = orders.find((o) => o.trackingCode === code);

  if (!order) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="bg-black min-h-screen pt-28 md:pt-36 pb-20">
          <div className="max-w-[580px] mx-auto text-center px-6 py-20">
            <div className="w-[60px] h-[60px] border border-[rgba(211,152,88,0.3)] rounded-full flex items-center justify-center mx-auto mb-8 text-[22px] text-champagne-muted">
              ?
            </div>
            <h1 className="font-serif text-[clamp(26px,4vw,40px)] font-light text-champagne mb-3">
              {t("Shipment Not Found", "Nie znaleziono przesyłki")}
            </h1>
            <p className="text-[13px] text-champagne-muted leading-[1.8] mb-8">
              {t(
                "We couldn't find a shipment with this tracking code. Please check the code and try again.",
                "Nie znaleźliśmy przesyłki o podanym numerze. Sprawdź kod i spróbuj ponownie."
              )}
            </p>
            <Link
              href="/account"
              className="inline-block border border-whiskey text-champagne py-3 px-8 text-[11px] tracking-[0.2em] uppercase no-underline hover:bg-whiskey hover:text-black transition-colors duration-300"
            >
              {t("My Orders", "Moje zamówienia")}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const current = stepIndex(order.status);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-28 md:pt-36 pb-20">
        <div className="max-w-[640px] mx-auto px-6">
          <Link
            href="/account"
            className="text-[11px] tracking-[0.2em] uppercase text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline mb-8 inline-block"
          >
            &larr; {t("Back to Account", "Wróć do konta")}
          </Link>

          <h1 className="font-serif text-[clamp(26px,4vw,40px)] font-light text-champagne mb-2">
            {t("Track Shipment", "Śledzenie przesyłki")}
          </h1>
          <p className="text-[12px] text-champagne-muted tracking-[0.08em] mb-10">
            {t("Order", "Zamówienie")} {order.id}
          </p>

          {/* Progress steps */}
          <div className="relative flex justify-between mb-12">
            <div className="absolute top-[14px] left-0 right-0 h-px bg-[rgba(211,152,88,0.15)]" />
            <div
              className="absolute top-[14px] left-0 h-px bg-whiskey transition-all duration-700"
              style={{ width: `${(current / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center z-10">
                <div
                  className={`w-[28px] h-[28px] rounded-full border flex items-center justify-center text-[11px] transition-colors duration-300 ${
                    i <= current
                      ? "border-whiskey bg-whiskey text-black"
                      : "border-[rgba(211,152,88,0.2)] bg-black text-champagne-muted"
                  }`}
                >
                  {i < current ? "✓" : i + 1}
                </div>
                <span
                  className={`mt-3 text-[10px] tracking-[0.12em] uppercase text-center max-w-[80px] ${
                    i <= current ? "text-champagne" : "text-champagne-muted"
                  }`}
                >
                  {lang === "pl" ? step.pl : step.en}
                </span>
              </div>
            ))}
          </div>

          {/* Shipment details card */}
          <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
            <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
              {t("Shipment Details", "Szczegóły przesyłki")}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-[13px]">
                <span className="text-champagne-muted">{t("Tracking Code", "Numer przesyłki")}</span>
                <span className="text-champagne font-mono text-[12px]">{order.trackingCode}</span>
              </div>
              <div className="h-px bg-[rgba(211,152,88,0.07)]" />
              <div className="flex justify-between text-[13px]">
                <span className="text-champagne-muted">{t("Carrier", "Przewoźnik")}</span>
                <span className="text-champagne">{order.delivery}</span>
              </div>
              <div className="h-px bg-[rgba(211,152,88,0.07)]" />
              <div className="flex justify-between text-[13px]">
                <span className="text-champagne-muted">{t("Status", "Status")}</span>
                <span className="text-whiskey uppercase text-[12px] tracking-[0.1em]">
                  {order.status === "processing"
                    ? t("Processing", "W przygotowaniu")
                    : order.status === "shipped"
                    ? t("Shipped", "Wysłane")
                    : t("Delivered", "Dostarczone")}
                </span>
              </div>
              <div className="h-px bg-[rgba(211,152,88,0.07)]" />
              <div className="flex justify-between text-[13px]">
                <span className="text-champagne-muted">{t("Order Date", "Data zamówienia")}</span>
                <span className="text-champagne">{order.date}</span>
              </div>
              <div className="h-px bg-[rgba(211,152,88,0.07)]" />
              <div className="flex justify-between text-[13px]">
                <span className="text-champagne-muted">{t("Estimated Delivery", "Przewidywana dostawa")}</span>
                <span className="text-champagne">{t("2–4 business days", "2–4 dni robocze")}</span>
              </div>
            </div>
          </div>

          {/* Items in shipment */}
          <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
            <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
              {t("Items in Shipment", "Zawartość przesyłki")}
            </div>

            <div className="flex flex-col gap-4">
              {order.items.map((item, i) => {
                const product = getProductBySlug(item.slug);
                return (
                  <div key={i} className="flex gap-4 items-center">
                    {product && (
                      <div className="relative w-[56px] h-[56px] flex-shrink-0 bg-[rgba(211,152,88,0.05)]">
                        <Image
                          src={product.image}
                          alt={lang === "pl" ? product.namePL : product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-champagne truncate">
                        {product
                          ? lang === "pl"
                            ? product.namePL
                            : product.name
                          : item.slug}
                      </div>
                      <div className="text-[11px] text-champagne-muted mt-0.5">
                        {t("Qty", "Szt.")}: {item.qty}
                      </div>
                    </div>
                    <div className="text-[13px] text-whiskey whitespace-nowrap">
                      {item.price.toLocaleString("pl")} PLN
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-[rgba(211,152,88,0.15)] mt-5 mb-4" />
            <div className="flex justify-between text-[13px]">
              <span className="text-champagne-muted">{t("Delivery", "Dostawa")}</span>
              <span className="text-champagne">{order.deliveryCost.toLocaleString("pl")} PLN</span>
            </div>
            <div className="flex justify-between text-[14px] mt-3">
              <span className="text-champagne">{t("Total", "Razem")}</span>
              <span className="text-whiskey">{order.total.toLocaleString("pl")} PLN</span>
            </div>
          </div>

          {/* Back button */}
          <div className="text-center mt-10">
            <Link
              href="/account"
              className="inline-block border border-whiskey text-champagne py-3.5 px-10 text-[11px] tracking-[0.2em] uppercase no-underline hover:bg-whiskey hover:text-black transition-colors duration-300"
            >
              {t("Back to My Orders", "Wróć do zamówień")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
