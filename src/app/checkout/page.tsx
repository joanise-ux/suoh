"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type DeliveryMethod = "inpost" | "dpd" | "dhl";
type PaymentMethod = "card" | "blik" | "applepay" | "googlepay" | "paypal";

const deliveryOptions: {
  id: DeliveryMethod;
  name: string;
  sub: string;
  subPL: string;
  price: number;
}[] = [
  { id: "inpost", name: "InPost Paczkomat", sub: "1-2 business days", subPL: "1-2 dni robocze", price: 14 },
  { id: "dpd", name: "DPD Kurier", sub: "1-3 business days", subPL: "1-3 dni robocze", price: 18 },
  { id: "dhl", name: "DHL Express", sub: "Next business day", subPL: "Następny dzień roboczy", price: 24 },
];

const paczkomatOptions = [
  "WRO01M — ul. Świdnicka 1, Wrocław",
  "WRO02M — ul. Legnicka 55, Wrocław",
  "WRO03M — ul. Powstańców Śl. 28, Wrocław",
  "WRO04M — Galeria Magnolia, al. Legnicka",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, t, user, isLoggedIn, addOrder, clearCart } = useStore();
  const [delivery, setDelivery] = useState<DeliveryMethod>("inpost");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [paczkomat, setPaczkomat] = useState(paczkomatOptions[0]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [email, setEmail] = useState(isLoggedIn && user ? user.email : "");
  const [firstName, setFirstName] = useState(isLoggedIn && user ? user.firstName : "");
  const [lastName, setLastName] = useState(isLoggedIn && user ? user.lastName : "");
  const [street, setStreet] = useState(isLoggedIn && user ? user.street : "");
  const [postalCode, setPostalCode] = useState(isLoggedIn && user ? user.postalCode : "");
  const [city, setCity] = useState(isLoggedIn && user ? user.city : "");
  const [phone, setPhone] = useState(isLoggedIn && user ? user.phone : "");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [blikCode, setBlikCode] = useState("");

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as { slug: string; qty: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }[];

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const deliveryCost = deliveryOptions.find((d) => d.id === delivery)?.price || 14;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + (subtotal >= 200 ? 0 : deliveryCost);
  const freeShipping = subtotal >= 200;

  const formatCard = (value: string) => {
    const v = value.replace(/\D/g, "").substring(0, 16);
    return v.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "").substring(0, 4);
    if (v.length >= 2) return v.substring(0, 2) + " / " + v.substring(2);
    return v;
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SUOH10") {
      setPromoApplied(true);
    }
  };

  const placeOrder = () => {
    const orderId = `#SUOH-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const deliveryLabel =
      delivery === "inpost"
        ? `InPost ${paczkomat.split(" — ")[0]}`
        : delivery === "dpd"
        ? "DPD Kurier"
        : "DHL Express";

    const paymentLabel =
      payment === "card"
        ? `Visa ···${cardNumber.replace(/\s/g, "").slice(-4) || "0000"}`
        : payment === "blik"
        ? "BLIK"
        : payment === "applepay"
        ? "Apple Pay"
        : payment === "googlepay"
        ? "Google Pay"
        : "PayPal";

    addOrder({
      id: orderId,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      items: cartItems.map((i) => ({
        slug: i.slug,
        qty: i.qty,
        price: i.product.price,
      })),
      delivery: deliveryLabel,
      deliveryCost: freeShipping ? 0 : deliveryCost,
      total,
      status: "processing",
      trackingCode: `PL${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      paymentMethod: paymentLabel,
    });

    clearCart();

    const params = new URLSearchParams({
      id: orderId,
      total: String(total),
      items: String(cartItems.length),
      delivery: deliveryLabel,
      payment: paymentLabel,
    });
    router.push(`/checkout/confirmation?${params.toString()}`);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="bg-black min-h-screen pt-32 md:pt-40 pb-20 px-6 md:px-12">
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="text-[48px] mb-6 opacity-30">🛍</div>
            <p className="text-champagne-dim text-[14px] mb-6">
              {t("Your bag is empty. Add items before checkout.", "Twój koszyk jest pusty. Dodaj produkty przed zamówieniem.")}
            </p>
            <Link
              href="/"
              className="inline-block border border-whiskey text-champagne py-3 px-8 text-[11px] tracking-[0.2em] uppercase no-underline hover:bg-whiskey hover:text-black transition-colors duration-300"
            >
              {t("Continue shopping", "Kontynuuj zakupy")}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const inputClass =
    "w-full bg-transparent border-none border-b border-b-[rgba(211,152,88,0.15)] py-2.5 text-[13px] text-champagne font-sans outline-none focus:border-b-whiskey transition-colors placeholder:text-[rgba(234,206,170,0.2)]";

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-32 md:pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          {/* Steps */}
          <div className="flex items-center gap-2 mb-10 justify-center">
            <Link href="/cart" className="text-[10px] tracking-[0.15em] uppercase text-champagne no-underline">
              {t("Cart", "Koszyk")}
            </Link>
            <span className="w-1 h-1 rounded-full bg-[rgba(211,152,88,0.15)]" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-whiskey">
              {t("Checkout", "Zamówienie")}
            </span>
            <span className="w-1 h-1 rounded-full bg-[rgba(211,152,88,0.15)]" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-champagne-muted">
              {t("Confirmation", "Potwierdzenie")}
            </span>
          </div>

          <h1 className="font-serif text-[clamp(28px,4vw,48px)] font-light text-champagne mb-2">
            {t("Checkout", "Zamówienie")}
          </h1>
          <p className="text-[12px] tracking-[0.1em] text-champagne-muted mb-12">
            {t("Fill in your details below", "Wypełnij poniższe dane")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
            {/* LEFT: Forms */}
            <div>
              {/* Contact */}
              <section className="mb-10">
                <h2 className="font-serif text-[22px] font-light text-champagne mb-6 pb-3 border-b border-[rgba(211,152,88,0.15)]">
                  {t("Contact", "Kontakt")}
                </h2>
                <div>
                  <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                    {t("Email address", "Adres email")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("your@email.com", "twoj@email.com")}
                    className={inputClass}
                  />
                </div>
              </section>

              {/* Delivery Address */}
              <section className="mb-10">
                <h2 className="font-serif text-[22px] font-light text-champagne mb-6 pb-3 border-b border-[rgba(211,152,88,0.15)]">
                  {t("Delivery Address", "Adres dostawy")}
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                      {t("First name", "Imię")}
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Anna"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                      {t("Last name", "Nazwisko")}
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Kowalska"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                    {t("Street address", "Adres")}
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="ul. Świdnicka 12/4"
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                      {t("Postal code", "Kod pocztowy")}
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="50-066"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                      {t("City", "Miasto")}
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Wrocław"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                    {t("Phone number", "Numer telefonu")}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+48 500 000 000"
                    className={inputClass}
                  />
                </div>

                {/* Delivery method */}
                <div className="mt-6">
                  <div className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-3">
                    {t("Delivery method", "Sposób dostawy")}
                  </div>
                  <div className="flex flex-col gap-2">
                    {deliveryOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-colors ${
                          delivery === opt.id
                            ? "border-whiskey"
                            : "border-[rgba(211,152,88,0.15)] hover:border-[rgba(211,152,88,0.4)]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          checked={delivery === opt.id}
                          onChange={() => setDelivery(opt.id)}
                          className="accent-[var(--whiskey)] w-3.5 h-3.5"
                        />
                        <div className="flex-1">
                          <div className="text-[13px] text-champagne">
                            {opt.name}
                          </div>
                          <div className="text-[11px] text-champagne-muted tracking-[0.05em]">
                            {t(opt.sub, opt.subPL)}
                          </div>
                        </div>
                        <div className="text-[13px] text-whiskey">
                          {freeShipping ? (
                            <span className="line-through opacity-50">{opt.price} PLN</span>
                          ) : (
                            `${opt.price} PLN`
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  {freeShipping && (
                    <div className="text-[11px] text-whiskey tracking-[0.15em] mt-3">
                      &#10022; {t("Free shipping for orders over 200 PLN", "Darmowa wysyłka od 200 PLN")}
                    </div>
                  )}

                  {delivery === "inpost" && (
                    <div className="mt-5 p-4 bg-balsamico border border-[rgba(211,152,88,0.15)]">
                      <div className="text-[11px] tracking-[0.15em] uppercase text-whiskey mb-2.5">
                        InPost Paczkomat
                      </div>
                      <div className="text-[12px] text-champagne-muted mb-3">
                        {t("Select your nearest parcel locker", "Wybierz najbliższy paczkomat")}
                      </div>
                      <select
                        value={paczkomat}
                        onChange={(e) => setPaczkomat(e.target.value)}
                        className="w-full bg-black border-none border-b border-b-[rgba(211,152,88,0.15)] py-2.5 text-[13px] text-champagne font-sans outline-none cursor-pointer"
                      >
                        {paczkomatOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-balsamico">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </section>

              {/* Payment */}
              <section className="mb-10">
                <h2 className="font-serif text-[22px] font-light text-champagne mb-6 pb-3 border-b border-[rgba(211,152,88,0.15)]">
                  {t("Payment", "Płatność")}
                </h2>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(["card", "blik", "applepay", "googlepay", "paypal"] as PaymentMethod[]).map(
                    (method) => {
                      const labels: Record<PaymentMethod, string> = {
                        card: "Card",
                        blik: "BLIK",
                        applepay: "Apple Pay",
                        googlepay: "Google Pay",
                        paypal: "PayPal",
                      };
                      return (
                        <button
                          key={method}
                          onClick={() => setPayment(method)}
                          className={`px-4.5 py-2.5 border text-[11px] tracking-[0.12em] font-sans transition-all cursor-pointer ${
                            payment === method
                              ? "border-whiskey text-champagne"
                              : "border-[rgba(211,152,88,0.15)] text-champagne-muted bg-transparent hover:border-whiskey hover:text-champagne"
                          }`}
                        >
                          {labels[method]}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Card form */}
                {payment === "card" && (
                  <div>
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                      {["VISA", "MC", "AMEX"].map((icon) => (
                        <div
                          key={icon}
                          className="w-9 h-[22px] bg-balsamico border border-[rgba(211,152,88,0.15)] rounded-sm flex items-center justify-center text-[8px] tracking-[0.05em] text-champagne-muted"
                        >
                          {icon}
                        </div>
                      ))}
                    </div>
                    <div className="mb-4">
                      <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                        {t("Card number", "Numer karty")}
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCard(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                          {t("Expiry date", "Data ważności")}
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM / YY"
                          maxLength={7}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").substring(0, 4))}
                          placeholder="&middot;&middot;&middot;"
                          maxLength={4}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                        {t("Name on card", "Imię na karcie")}
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="ANNA KOWALSKA"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[rgba(234,206,170,0.22)] tracking-[0.08em] mt-3">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Secured by Stripe &middot; 256-bit SSL encryption
                    </div>
                  </div>
                )}

                {/* BLIK form */}
                {payment === "blik" && (
                  <div>
                    <div>
                      <label className="text-[10px] tracking-[0.18em] uppercase text-champagne-muted mb-1.5 block">
                        {t("BLIK Code (6 digits)", "Kod BLIK (6 cyfr)")}
                      </label>
                      <input
                        type="text"
                        value={blikCode}
                        onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, "").substring(0, 6))}
                        placeholder="123 456"
                        maxLength={7}
                        className={`${inputClass} !text-[20px] !tracking-[0.3em]`}
                      />
                    </div>
                    <div className="text-[11px] text-champagne-muted mt-2.5 leading-[1.7]">
                      {t(
                        "Generate the code in your banking app. The code is valid for 2 minutes.",
                        "Wygeneruj kod w aplikacji bankowej. Kod jest ważny przez 2 minuty."
                      )}
                    </div>
                  </div>
                )}

                {/* Other payment methods */}
                {payment !== "card" && payment !== "blik" && (
                  <div className="p-6 bg-balsamico border border-[rgba(211,152,88,0.15)] text-center">
                    <div className="text-[13px] text-champagne-muted leading-[1.8]">
                      {t(
                        "You will be redirected to complete payment securely via Stripe.",
                        "Zostaniesz przekierowany do bezpiecznej płatności przez Stripe."
                      )}
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-8 lg:sticky lg:top-28">
              <h3 className="font-serif text-[20px] font-light text-champagne mb-7 pb-4 border-b border-[rgba(211,152,88,0.15)]">
                {t("Order Summary", "Podsumowanie")}
              </h3>

              {/* Items */}
              <div className="mb-5">
                {cartItems.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-center gap-3 py-3 border-b border-[rgba(211,152,88,0.07)]"
                  >
                    <div className="relative w-12 h-14 shrink-0 overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={t(item.product.name, item.product.namePL)}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] text-champagne-muted truncate">
                        {t(item.product.name, item.product.namePL)} &times; {item.qty}
                      </div>
                    </div>
                    <div className="text-[13px] text-champagne shrink-0">
                      {item.product.price * item.qty} PLN
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <div className="flex gap-0 mb-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t("Promo code", "Kod rabatowy")}
                  className="flex-1 bg-transparent border border-[rgba(211,152,88,0.15)] border-r-0 px-3.5 py-2.5 text-[12px] text-champagne font-sans outline-none placeholder:text-[rgba(234,206,170,0.25)] placeholder:text-[11px] placeholder:tracking-[0.08em] focus:border-whiskey transition-colors"
                />
                <button
                  onClick={applyPromo}
                  className="bg-transparent border border-[rgba(211,152,88,0.15)] px-4 py-2.5 text-[10px] tracking-[0.18em] uppercase text-champagne-muted font-sans hover:border-whiskey hover:text-champagne transition-all cursor-pointer whitespace-nowrap"
                >
                  {t("Apply", "Zastosuj")}
                </button>
              </div>

              {promoApplied && (
                <div className="flex justify-between mb-3.5 text-[13px] text-[rgba(150,220,150,0.7)]">
                  <span>Promo (SUOH10)</span>
                  <span>-{discount} PLN</span>
                </div>
              )}

              <div className="flex justify-between mb-3.5 text-[13px]">
                <span className="text-champagne-muted">{t("Subtotal", "Suma częściowa")}</span>
                <span className="text-champagne">{subtotal.toLocaleString("pl")} PLN</span>
              </div>
              <div className="flex justify-between mb-3.5 text-[13px]">
                <span className="text-champagne-muted">{t("Delivery", "Dostawa")}</span>
                <span className="text-champagne">
                  {freeShipping ? (
                    <span className="text-whiskey">{t("Free", "Gratis")}</span>
                  ) : (
                    `${deliveryCost} PLN`
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-4 mt-2 border-t border-[rgba(211,152,88,0.15)] font-serif text-[20px] font-light">
                <span className="text-champagne">{t("Total", "Razem")}</span>
                <span className="text-whiskey">{total.toLocaleString("pl")} PLN</span>
              </div>

              <button
                onClick={placeOrder}
                className="w-full bg-whiskey border-none py-4 text-[11px] tracking-[0.25em] uppercase text-black font-sans hover:bg-champagne transition-colors mt-5 cursor-pointer"
              >
                {t("Place Order", "Złóż zamówienie")}
              </button>
              <Link
                href="/cart"
                className="block w-full text-center bg-transparent border border-[rgba(211,152,88,0.15)] py-3.5 text-[11px] tracking-[0.2em] uppercase text-champagne-muted font-sans hover:border-whiskey hover:text-champagne transition-all mt-2 no-underline"
              >
                &larr; {t("Back to Cart", "Wróć do koszyka")}
              </Link>
              <div className="flex items-center justify-center gap-1.5 mt-3.5 text-[10px] tracking-[0.1em] text-[rgba(234,206,170,0.25)]">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secured by Stripe
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
