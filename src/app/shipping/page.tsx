"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Section = "shipping" | "returns";

export default function ShippingPage() {
  const { t } = useStore();
  const [active, setActive] = useState<Section>("shipping");

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-28 md:pt-36 pb-20">
        <div className="max-w-[760px] mx-auto px-6">
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline mb-8 inline-block"
          >
            &larr; {t("Back to Home", "Wróć na stronę główną")}
          </Link>

          <h1 className="font-serif text-[clamp(28px,5vw,48px)] font-light text-champagne mb-3">
            {t("Shipping & Returns", "Wysyłka i zwroty")}
          </h1>
          <p className="text-[13px] text-champagne-muted leading-[1.8] mb-10">
            {t(
              "Everything you need to know about delivery, costs, and our return policy.",
              "Wszystko, co musisz wiedzieć o dostawie, kosztach i naszej polityce zwrotów."
            )}
          </p>

          {/* Tabs */}
          <div className="flex border-b border-[rgba(211,152,88,0.15)] mb-10">
            <button
              onClick={() => setActive("shipping")}
              className={`flex-1 py-3.5 text-[11px] tracking-[0.2em] uppercase bg-transparent border-none transition-all duration-300 cursor-pointer ${
                active === "shipping"
                  ? "text-whiskey border-b-2 border-b-whiskey"
                  : "text-champagne-muted hover:text-champagne"
              }`}
            >
              {t("Shipping", "Wysyłka")}
            </button>
            <button
              onClick={() => setActive("returns")}
              className={`flex-1 py-3.5 text-[11px] tracking-[0.2em] uppercase bg-transparent border-none transition-all duration-300 cursor-pointer ${
                active === "returns"
                  ? "text-whiskey border-b-2 border-b-whiskey"
                  : "text-champagne-muted hover:text-champagne"
              }`}
            >
              {t("Returns & Refunds", "Zwroty i reklamacje")}
            </button>
          </div>

          {active === "shipping" ? (
            <ShippingSection t={t} />
          ) : (
            <ReturnsSection t={t} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5 mt-10 first:mt-0">
      {children}
    </h2>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 border-b border-[rgba(211,152,88,0.07)] text-[13px]">
      <span className="text-champagne-muted">{label}</span>
      <span className="text-champagne text-right">{value}</span>
    </div>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] text-champagne-muted leading-[1.9] mb-4">
      {children}
    </p>
  );
}

function ShippingSection({ t }: { t: (en: string, pl: string) => string }) {
  return (
    <div>
      {/* Domestic */}
      <SectionHeading>{t("Domestic Shipping — Poland", "Wysyłka krajowa — Polska")}</SectionHeading>

      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
        <InfoRow
          label="InPost Paczkomat"
          value={t("14 PLN", "14 PLN")}
        />
        <InfoRow
          label={t("DPD Courier", "DPD Kurier")}
          value={t("18 PLN", "18 PLN")}
        />
        <div className="flex justify-between py-3 text-[13px]">
          <span className="text-champagne-muted">
            {t("Free shipping", "Darmowa wysyłka")}
          </span>
          <span className="text-whiskey text-right">
            {t("Orders over 200 PLN", "Zamówienia powyżej 200 PLN")}
          </span>
        </div>
      </div>

      <Paragraph>
        {t(
          "All domestic orders are shipped from Wrocław. InPost Paczkomat is our recommended option — fast, convenient, and available 24/7 at thousands of locations across Poland.",
          "Wszystkie zamówienia krajowe wysyłamy z Wrocławia. InPost Paczkomat to nasza rekomendowana opcja — szybka, wygodna i dostępna 24/7 w tysiącach lokalizacji w całej Polsce."
        )}
      </Paragraph>

      {/* International — Europe */}
      <SectionHeading>{t("International Shipping — Europe", "Wysyłka międzynarodowa — Europa")}</SectionHeading>

      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
        <InfoRow
          label={t("InPost International (EU)", "InPost International (UE)")}
          value={t("from 29 PLN", "od 29 PLN")}
        />
        <div className="py-3 border-b border-[rgba(211,152,88,0.07)]">
          <div className="text-[11px] text-champagne-muted leading-[1.8]">
            {t(
              "Available countries: France, Spain, Portugal, Italy, Belgium, Netherlands, Luxembourg, United Kingdom",
              "Dostępne kraje: Francja, Hiszpania, Portugalia, Włochy, Belgia, Holandia, Luksemburg, Wielka Brytania"
            )}
          </div>
        </div>
        <InfoRow
          label={t("DHL Express (rest of Europe)", "DHL Express (reszta Europy)")}
          value={t("from 49 PLN", "od 49 PLN")}
        />
      </div>

      <Paragraph>
        {t(
          "For countries served by InPost International, your package will be delivered to a local parcel locker or pick-up point. For other European destinations, we ship via DHL Express with door-to-door delivery.",
          "W krajach obsługiwanych przez InPost International przesyłka zostanie dostarczona do lokalnego paczkomatu lub punktu odbioru. Do pozostałych krajów europejskich wysyłamy za pośrednictwem DHL Express z dostawą pod drzwi."
        )}
      </Paragraph>

      {/* International — Worldwide */}
      <SectionHeading>{t("Worldwide Shipping", "Wysyłka na cały świat")}</SectionHeading>

      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
        <InfoRow
          label={t("DHL Express (worldwide)", "DHL Express (cały świat)")}
          value={t("from 79 PLN", "od 79 PLN")}
        />
        <div className="py-3">
          <div className="text-[11px] text-champagne-muted leading-[1.8]">
            {t(
              "Exact cost depends on the destination country and package weight. Calculated at checkout.",
              "Dokładny koszt zależy od kraju docelowego i wagi paczki. Obliczany przy składaniu zamówienia."
            )}
          </div>
        </div>
      </div>

      <Paragraph>
        {t(
          "We ship worldwide via DHL Express. International orders may be subject to customs duties and import taxes, which are the responsibility of the recipient. Delivery times vary by destination.",
          "Wysyłamy na cały świat za pośrednictwem DHL Express. Zamówienia międzynarodowe mogą podlegać cłom i podatkom importowym, które ponosi odbiorca. Czas dostawy zależy od kraju docelowego."
        )}
      </Paragraph>

      {/* Production & Delivery Time */}
      <SectionHeading>{t("Production & Delivery Time", "Czas produkcji i dostawy")}</SectionHeading>

      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
        <InfoRow
          label={t("Handcrafting your order", "Ręczne wykonanie zamówienia")}
          value={t("3–5 business days", "3–5 dni roboczych")}
        />
        <InfoRow
          label={t("Domestic delivery", "Dostawa krajowa")}
          value={t("1–3 business days", "1–3 dni roboczych")}
        />
        <InfoRow
          label={t("European delivery", "Dostawa europejska")}
          value={t("3–7 business days", "3–7 dni roboczych")}
        />
        <InfoRow
          label={t("Worldwide delivery", "Dostawa światowa")}
          value={t("5–14 business days", "5–14 dni roboczych")}
        />
      </div>

      <Paragraph>
        {t(
          "Every SUOH piece is handcrafted to order. Production typically takes 3–5 business days. For larger orders or during high-demand periods, the preparation time may be extended — in such cases, we will notify you by email with an updated timeline.",
          "Każdy produkt SUOH jest ręcznie wykonywany na zamówienie. Produkcja trwa zazwyczaj 3–5 dni roboczych. W przypadku większych zamówień lub w okresach wzmożonego popytu czas przygotowania może się wydłużyć — w takiej sytuacji poinformujemy Cię mailowo o zaktualizowanym terminie."
        )}
      </Paragraph>

      {/* Packaging */}
      <SectionHeading>{t("Packaging", "Pakowanie")}</SectionHeading>

      <Paragraph>
        {t(
          "Every order is carefully packed in our signature SUOH packaging — a branded dust bag and a rigid box to ensure your piece arrives in perfect condition. Gift wrapping is included with every order at no extra charge.",
          "Każde zamówienie jest starannie pakowane w nasze autorskie opakowanie SUOH — firmowy woreczek ochronny i sztywne pudełko, aby Twój produkt dotarł w idealnym stanie. Eleganckie pakowanie na prezent jest dołączane do każdego zamówienia bezpłatnie."
        )}
      </Paragraph>
    </div>
  );
}

function ReturnsSection({ t }: { t: (en: string, pl: string) => string }) {
  return (
    <div>
      {/* Right to Return */}
      <SectionHeading>{t("Right of Withdrawal", "Prawo do odstąpienia od umowy")}</SectionHeading>

      <Paragraph>
        {t(
          "In accordance with Polish consumer protection law (Ustawa o prawach konsumenta), you have the right to withdraw from a distance contract within 14 calendar days of receiving your order, without giving any reason.",
          "Zgodnie z Ustawą o prawach konsumenta, masz prawo odstąpić od umowy zawartej na odległość w ciągu 14 dni kalendarzowych od dnia otrzymania przesyłki, bez podania przyczyny."
        )}
      </Paragraph>

      <Paragraph>
        {t(
          "The 14-day period begins on the day you — or a third party indicated by you — take physical possession of the goods. To exercise this right, it is sufficient to send a return request before the deadline expires.",
          "Termin 14 dni liczy się od dnia, w którym Ty — lub wskazana przez Ciebie osoba trzecia — weszliście w fizyczne posiadanie towaru. Aby skorzystać z tego prawa, wystarczy wysłać zgłoszenie zwrotu przed upływem terminu."
        )}
      </Paragraph>

      {/* Exceptions */}
      <SectionHeading>{t("Exceptions from Returns", "Wyłączenia z prawa do zwrotu")}</SectionHeading>

      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <span className="text-whiskey text-[13px] mt-0.5 flex-shrink-0">01</span>
            <span className="text-[13px] text-champagne-muted leading-[1.8]">
              {t(
                "Products made to your individual specification or personalized to your order (e.g., monogrammed items, custom color combinations) — in accordance with Art. 38 point 3 of the Consumer Rights Act.",
                "Produkty wykonane według Twojej indywidualnej specyfikacji lub spersonalizowane na zamówienie (np. produkty z monogramem, indywidualne kombinacje kolorów) — zgodnie z art. 38 pkt 3 Ustawy o prawach konsumenta."
              )}
            </span>
          </div>
          <div className="h-px bg-[rgba(211,152,88,0.07)]" />
          <div className="flex gap-3">
            <span className="text-whiskey text-[13px] mt-0.5 flex-shrink-0">02</span>
            <span className="text-[13px] text-champagne-muted leading-[1.8]">
              {t(
                "Products that show clear signs of use beyond what is necessary to assess the nature, characteristics, and functioning of the item.",
                "Produkty noszące wyraźne ślady użytkowania wykraczające poza zakres konieczny do stwierdzenia charakteru, cech i funkcjonowania rzeczy."
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Return conditions */}
      <SectionHeading>{t("Return Conditions", "Warunki zwrotu")}</SectionHeading>

      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
        <div className="flex flex-col gap-4">
          {[
            t(
              "The product must be unused, in its original condition, without signs of wear or damage.",
              "Produkt musi być nieużywany, w oryginalnym stanie, bez śladów noszenia lub uszkodzeń."
            ),
            t(
              "Return the product in its original SUOH packaging (dust bag, box) with all tags attached.",
              "Zwróć produkt w oryginalnym opakowaniu SUOH (woreczek ochronny, pudełko) ze wszystkimi metkami."
            ),
            t(
              "Include a completed return form (sent to you by email after submitting a return request).",
              "Dołącz wypełniony formularz zwrotu (wysłany na Twój e-mail po zgłoszeniu zwrotu)."
            ),
            t(
              "The cost of return shipping is borne by the customer.",
              "Koszt przesyłki zwrotnej ponosi klient."
            ),
          ].map((text, i) => (
            <div key={i}>
              <div className="flex gap-3">
                <span className="text-whiskey text-[12px] mt-0.5 flex-shrink-0">✦</span>
                <span className="text-[13px] text-champagne-muted leading-[1.8]">{text}</span>
              </div>
              {i < 3 && <div className="h-px bg-[rgba(211,152,88,0.07)] mt-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* How to return */}
      <SectionHeading>{t("How to Return", "Jak dokonać zwrotu")}</SectionHeading>

      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
        <div className="flex flex-col gap-5">
          {[
            {
              step: "01",
              title: t("Submit a return request", "Zgłoś zwrot"),
              desc: t(
                "Send an email to hello@suoh.pl with your order number and the reason for return. You can also use the return form available in your account panel.",
                "Wyślij e-mail na hello@suoh.pl z numerem zamówienia i powodem zwrotu. Możesz również skorzystać z formularza zwrotu dostępnego w panelu konta."
              ),
            },
            {
              step: "02",
              title: t("Receive return instructions", "Otrzymaj instrukcje"),
              desc: t(
                "Within 24 hours, we will send you a return form and the address to which the package should be sent.",
                "W ciągu 24 godzin wyślemy Ci formularz zwrotu oraz adres, na który należy nadać przesyłkę."
              ),
            },
            {
              step: "03",
              title: t("Ship the package", "Wyślij paczkę"),
              desc: t(
                "Pack the product securely in its original packaging, attach the return form, and send it via a carrier of your choice. We recommend InPost or DPD for domestic returns.",
                "Zapakuj produkt bezpiecznie w oryginalne opakowanie, dołącz formularz zwrotu i nadaj przesyłkę wybranym przewoźnikiem. W przypadku zwrotów krajowych rekomendujemy InPost lub DPD."
              ),
            },
            {
              step: "04",
              title: t("Receive your refund", "Otrzymaj zwrot środków"),
              desc: t(
                "Once we receive and inspect the returned product, we will process your refund within 14 days. The refund will be issued to the original payment method.",
                "Po otrzymaniu i sprawdzeniu zwróconego produktu przetworzymy zwrot środków w ciągu 14 dni. Zwrot zostanie dokonany na oryginalną metodę płatności."
              ),
            },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex gap-4">
                <span className="text-whiskey text-[18px] font-serif flex-shrink-0 w-[28px]">
                  {item.step}
                </span>
                <div>
                  <div className="text-[13px] text-champagne mb-1.5">{item.title}</div>
                  <div className="text-[12px] text-champagne-muted leading-[1.8]">{item.desc}</div>
                </div>
              </div>
              {i < 3 && <div className="h-px bg-[rgba(211,152,88,0.07)] mt-5" />}
            </div>
          ))}
        </div>
      </div>

      {/* Refund details */}
      <SectionHeading>{t("Refund Details", "Szczegóły zwrotu środków")}</SectionHeading>

      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mb-6">
        <InfoRow
          label={t("Refund processing time", "Czas przetwarzania zwrotu")}
          value={t("up to 14 days", "do 14 dni")}
        />
        <InfoRow
          label={t("Refund method", "Metoda zwrotu")}
          value={t("Original payment method", "Oryginalna metoda płatności")}
        />
        <InfoRow
          label={t("Refund scope", "Zakres zwrotu")}
          value={t("Product price", "Cena produktu")}
        />
        <div className="flex justify-between py-3 text-[13px]">
          <span className="text-champagne-muted">
            {t("Shipping cost refund", "Zwrot kosztów wysyłki")}
          </span>
          <span className="text-champagne text-right">
            {t(
              "Only the cheapest standard option",
              "Tylko najtańsza opcja standardowa"
            )}
          </span>
        </div>
      </div>

      <Paragraph>
        {t(
          "If you paid for a premium shipping method, we will refund only the cost equivalent to our cheapest standard shipping option (InPost Paczkomat, 14 PLN). The cost of return shipping is not refundable.",
          "Jeśli wybrałeś droższą metodę wysyłki, zwrócimy jedynie kwotę odpowiadającą najtańszej standardowej opcji wysyłki (InPost Paczkomat, 14 PLN). Koszt przesyłki zwrotnej nie podlega zwrotowi."
        )}
      </Paragraph>

      {/* Complaints / Reklamacje */}
      <SectionHeading>{t("Complaints", "Reklamacje")}</SectionHeading>

      <Paragraph>
        {t(
          "If your product arrived damaged or has a manufacturing defect, please contact us at hello@suoh.pl within 14 days of delivery. Include your order number and photos of the defect. We treat every complaint individually and will respond within 14 business days.",
          "Jeśli Twój produkt dotarł uszkodzony lub posiada wadę produkcyjną, skontaktuj się z nami pod adresem hello@suoh.pl w ciągu 14 dni od dostawy. Dołącz numer zamówienia oraz zdjęcia wady. Każdą reklamację rozpatrujemy indywidualnie i odpowiadamy w ciągu 14 dni roboczych."
        )}
      </Paragraph>

      <Paragraph>
        {t(
          "For valid complaints, we offer repair, replacement, or a full refund at our discretion. Return shipping for approved complaints is covered by SUOH.",
          "W przypadku uzasadnionych reklamacji oferujemy naprawę, wymianę lub pełny zwrot środków — decyzja należy do SUOH. Koszt przesyłki zwrotnej w przypadku uznanych reklamacji pokrywa SUOH."
        )}
      </Paragraph>

      {/* Legal note */}
      <SectionHeading>{t("Legal Basis", "Podstawa prawna")}</SectionHeading>

      <Paragraph>
        {t(
          "This return policy is based on the Polish Consumer Rights Act of 30 May 2014 (Ustawa z dnia 30 maja 2014 r. o prawach konsumenta, Dz.U. 2014 poz. 827) and EU Directive 2011/83/EU on consumer rights. For customers outside of Poland, local consumer protection laws may also apply.",
          "Niniejsza polityka zwrotów opiera się na Ustawie z dnia 30 maja 2014 r. o prawach konsumenta (Dz.U. 2014 poz. 827) oraz Dyrektywie UE 2011/83/UE w sprawie praw konsumentów. W przypadku klientów spoza Polski mogą mieć zastosowanie również lokalne przepisy o ochronie konsumentów."
        )}
      </Paragraph>

      {/* Contact */}
      <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7 mt-10 text-center">
        <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-3">
          {t("Questions?", "Pytania?")}
        </div>
        <Paragraph>
          {t(
            "If you have any questions about shipping or returns, don't hesitate to reach out.",
            "Jeśli masz pytania dotyczące wysyłki lub zwrotów, napisz do nas."
          )}
        </Paragraph>
        <a
          href="mailto:hello@suoh.pl"
          className="inline-block text-[13px] text-whiskey no-underline hover:text-champagne transition-colors tracking-[0.05em]"
        >
          hello@suoh.pl
        </a>
      </div>
    </div>
  );
}
