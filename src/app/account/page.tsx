"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { getProductBySlug } from "@/lib/products";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Tab = "login" | "register";
type AccountTab = "orders" | "wishlist" | "profile" | "payments";

function LoginRegisterView() {
  const { t, login, register } = useStore();
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    register({ firstName, lastName, email, password });
  };

  const inputClass =
    "w-full bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-3.5 text-[13px] tracking-[0.05em] text-champagne font-sans outline-none placeholder:text-champagne-faint focus:border-whiskey transition-colors";

  return (
    <div className="max-w-md mx-auto">
      <Link
        href="/"
        className="text-[11px] tracking-[0.2em] uppercase text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline mb-6 inline-block"
      >
        &larr; {t("Back", "Wróć")}
      </Link>

      <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-light text-champagne mb-10 text-center">
        {t("My Account", "Moje konto")}
      </h1>

      <div className="flex mb-10 border-b border-[rgba(211,152,88,0.15)]">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-3.5 text-[11px] tracking-[0.2em] uppercase bg-transparent border-none transition-all duration-300 cursor-pointer ${
            tab === "login"
              ? "text-champagne border-b-2 border-b-whiskey"
              : "text-champagne-dim hover:text-champagne"
          }`}
        >
          {t("Sign In", "Zaloguj się")}
        </button>
        <button
          onClick={() => setTab("register")}
          className={`flex-1 py-3.5 text-[11px] tracking-[0.2em] uppercase bg-transparent border-none transition-all duration-300 cursor-pointer ${
            tab === "register"
              ? "text-champagne border-b-2 border-b-whiskey"
              : "text-champagne-dim hover:text-champagne"
          }`}
        >
          {t("Register", "Zarejestruj się")}
        </button>
      </div>

      {tab === "login" ? (
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
              {t("Email", "Email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("your@email.com", "twoj@email.com")}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
              {t("Password", "Hasło")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-whiskey border-none py-4 text-[11px] tracking-[0.22em] uppercase text-black font-sans hover:bg-champagne transition-colors duration-300 mt-3 cursor-pointer"
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
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
                {t("First name", "Imię")}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
                {t("Last name", "Nazwisko")}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
              {t("Email", "Email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("your@email.com", "twoj@email.com")}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
              {t("Password", "Hasło")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-whiskey mb-2 block">
              {t("Confirm password", "Potwierdź hasło")}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-whiskey border-none py-4 text-[11px] tracking-[0.22em] uppercase text-black font-sans hover:bg-champagne transition-colors duration-300 mt-3 cursor-pointer"
          >
            {t("Create Account", "Utwórz konto")}
          </button>
        </form>
      )}
    </div>
  );
}

function OrdersSection() {
  const { orders, t } = useStore();

  const statusColor = (status: string) => {
    if (status === "shipped") return "border-[rgba(211,152,88,0.4)] text-whiskey";
    if (status === "delivered") return "border-[rgba(100,180,100,0.3)] text-[rgba(150,210,150,0.8)]";
    return "border-[rgba(234,206,170,0.2)] text-champagne-muted";
  };

  const statusLabel = (status: string) => {
    if (status === "shipped") return t("Shipped", "Wysłane");
    if (status === "delivered") return t("Delivered", "Dostarczone");
    return t("Processing", "W realizacji");
  };

  return (
    <div>
      <h2 className="font-serif text-[32px] font-light text-champagne mb-1.5">
        {t("My Orders", "Moje zamówienia")}
      </h2>
      <p className="text-[12px] text-champagne-muted mb-10 tracking-[0.05em]">
        {t("Your order history", "Historia zamówień")}
      </p>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-champagne-dim text-[14px] mb-6">
            {t("No orders yet.", "Brak zamówień.")}
          </p>
          <Link
            href="/"
            className="inline-block border border-whiskey text-champagne py-3 px-8 text-[11px] tracking-[0.2em] uppercase no-underline hover:bg-whiskey hover:text-black transition-colors duration-300"
          >
            {t("Start shopping", "Zacznij zakupy")}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-6 md:p-7 grid grid-cols-[1fr_auto] gap-4 items-center hover:border-[rgba(211,152,88,0.35)] transition-colors"
            >
              <div>
                <div className="font-serif text-[18px] text-champagne mb-1.5">
                  {order.id}
                </div>
                <div className="text-[11px] tracking-[0.08em] text-champagne-muted">
                  {order.date} &nbsp;&middot;&nbsp; {order.items.length}{" "}
                  {order.items.length === 1
                    ? t("item", "przedmiot")
                    : t("items", "przedmiotów")}{" "}
                  &nbsp;&middot;&nbsp; {order.delivery}
                </div>
                <div className="text-[16px] text-whiskey mt-2 tracking-[0.06em]">
                  {order.total.toLocaleString("pl")} PLN
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase border ${statusColor(
                    order.status
                  )}`}
                >
                  {statusLabel(order.status)}
                </span>
                {order.trackingCode && (
                  <Link
                    href={`/tracking/${order.trackingCode}`}
                    className="block mt-2 text-[10px] tracking-[0.15em] uppercase text-champagne-muted bg-transparent border border-[rgba(211,152,88,0.15)] px-4 py-2 hover:text-champagne hover:border-whiskey transition-all no-underline whitespace-nowrap text-center"
                  >
                    {t("Track Package", "Śledź przesyłkę")}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WishlistSection() {
  const { wishlist, toggleWishlist, addToCart, t } = useStore();

  return (
    <div>
      <h2 className="font-serif text-[32px] font-light text-champagne mb-1.5">
        {t("Wishlist", "Ulubione")}
      </h2>
      <p className="text-[12px] text-champagne-muted mb-10 tracking-[0.05em]">
        {wishlist.length}{" "}
        {t("saved pieces", "zapisanych produktów")}
      </p>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-champagne-dim text-[14px] mb-6">
            {t("Your wishlist is empty.", "Lista ulubionych jest pusta.")}
          </p>
          <Link
            href="/"
            className="inline-block border border-whiskey text-champagne py-3 px-8 text-[11px] tracking-[0.2em] uppercase no-underline hover:bg-whiskey hover:text-black transition-colors duration-300"
          >
            {t("Explore collections", "Przeglądaj kolekcje")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {wishlist.map((slug) => {
            const product = getProductBySlug(slug);
            if (!product) return null;
            return (
              <div
                key={slug}
                className="bg-balsamico border border-[rgba(211,152,88,0.15)] overflow-hidden hover:border-[rgba(211,152,88,0.35)] transition-colors"
              >
                <Link
                  href={`/product/${slug}`}
                  className="block relative w-full aspect-[3/4] overflow-hidden"
                >
                  <Image
                    src={product.image}
                    alt={t(product.name, product.namePL)}
                    fill
                    className="object-cover brightness-[0.85] hover:brightness-100 transition-all duration-400"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
                <div className="p-4">
                  <div className="font-serif text-[17px] font-light text-champagne mb-1">
                    {t(product.name, product.namePL)}
                  </div>
                  <div className="text-[12px] text-whiskey mb-3.5 tracking-[0.06em]">
                    {product.priceFormatted}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => addToCart(slug)}
                      className="flex-1 bg-whiskey border-none py-2.5 text-[10px] tracking-[0.18em] uppercase text-black font-sans hover:bg-champagne transition-colors cursor-pointer"
                    >
                      {t("Add to Bag", "Dodaj do koszyka")}
                    </button>
                    <button
                      onClick={() => toggleWishlist(slug)}
                      className="w-9 h-9 bg-transparent border border-[rgba(211,152,88,0.15)] text-champagne-muted flex items-center justify-center text-[16px] hover:border-whiskey hover:text-champagne transition-all cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProfileSection() {
  const { user, updateProfile, t } = useStore();
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  if (!user) return null;

  const handleSave = () => {
    if (editData) {
      updateProfile(editData);
    }
    setEditing(false);
  };

  const fieldClass =
    "w-full bg-transparent border-none border-b border-b-[rgba(211,152,88,0.15)] py-2 text-[13px] text-champagne font-sans outline-none focus:border-b-whiskey transition-colors";

  return (
    <div>
      <h2 className="font-serif text-[32px] font-light text-champagne mb-1.5">
        {t("Profile & Address", "Profil i adres")}
      </h2>
      <p className="text-[12px] text-champagne-muted mb-10 tracking-[0.05em]">
        {t(
          "Your personal details and delivery addresses",
          "Twoje dane osobowe i adresy dostawy"
        )}
      </p>

      {editing ? (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7">
            <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
              {t("Personal Info", "Dane osobowe")}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5 block">
                  {t("First Name", "Imię")}
                </label>
                <input
                  value={editData?.firstName || ""}
                  onChange={(e) =>
                    setEditData((prev) =>
                      prev ? { ...prev, firstName: e.target.value } : null
                    )
                  }
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5 block">
                  {t("Last Name", "Nazwisko")}
                </label>
                <input
                  value={editData?.lastName || ""}
                  onChange={(e) =>
                    setEditData((prev) =>
                      prev ? { ...prev, lastName: e.target.value } : null
                    )
                  }
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5 block">
                {t("Phone", "Telefon")}
              </label>
              <input
                value={editData?.phone || ""}
                onChange={(e) =>
                  setEditData((prev) =>
                    prev ? { ...prev, phone: e.target.value } : null
                  )
                }
                className={fieldClass}
              />
            </div>
          </div>

          <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7">
            <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
              {t("Default Address", "Domyślny adres")}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5 block">
                  {t("Street", "Ulica")}
                </label>
                <input
                  value={editData?.street || ""}
                  onChange={(e) =>
                    setEditData((prev) =>
                      prev ? { ...prev, street: e.target.value } : null
                    )
                  }
                  className={fieldClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5 block">
                    {t("Postal Code", "Kod pocztowy")}
                  </label>
                  <input
                    value={editData?.postalCode || ""}
                    onChange={(e) =>
                      setEditData((prev) =>
                        prev ? { ...prev, postalCode: e.target.value } : null
                      )
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5 block">
                    {t("City", "Miasto")}
                  </label>
                  <input
                    value={editData?.city || ""}
                    onChange={(e) =>
                      setEditData((prev) =>
                        prev ? { ...prev, city: e.target.value } : null
                      )
                    }
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-whiskey border-none py-3 px-8 text-[11px] tracking-[0.2em] uppercase text-black font-sans hover:bg-champagne transition-colors cursor-pointer"
            >
              {t("Save Changes", "Zapisz zmiany")}
            </button>
            <button
              onClick={() => {
                setEditData(user);
                setEditing(false);
              }}
              className="bg-transparent border border-[rgba(211,152,88,0.15)] py-3 px-8 text-[11px] tracking-[0.2em] uppercase text-champagne-muted font-sans hover:border-whiskey hover:text-champagne transition-all cursor-pointer"
            >
              {t("Cancel", "Anuluj")}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7">
              <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
                {t("Personal Info", "Dane osobowe")}
              </div>
              <div className="mb-4">
                <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5">
                  {t("Full Name", "Imię i nazwisko")}
                </div>
                <div className="text-[13px] text-champagne pb-2 border-b border-[rgba(211,152,88,0.15)]">
                  {user.firstName} {user.lastName}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5">
                  Email
                </div>
                <div className="text-[13px] text-champagne pb-2 border-b border-[rgba(211,152,88,0.15)]">
                  {user.email}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5">
                  {t("Phone", "Telefon")}
                </div>
                <div className="text-[13px] text-champagne pb-2 border-b border-[rgba(211,152,88,0.15)]">
                  {user.phone}
                </div>
              </div>
              <button
                onClick={() => {
                  setEditData(user);
                  setEditing(true);
                }}
                className="text-[10px] tracking-[0.15em] uppercase text-whiskey bg-transparent border-none mt-4 hover:opacity-70 transition-opacity cursor-pointer"
              >
                {t("Edit Details", "Edytuj dane")} &rarr;
              </button>
            </div>

            <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7">
              <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
                {t("Default Address", "Domyślny adres")}
              </div>
              <div className="mb-4">
                <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5">
                  {t("Street", "Ulica")}
                </div>
                <div className="text-[13px] text-champagne pb-2 border-b border-[rgba(211,152,88,0.15)]">
                  {user.street}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5">
                  {t("City", "Miasto")}
                </div>
                <div className="text-[13px] text-champagne pb-2 border-b border-[rgba(211,152,88,0.15)]">
                  {user.postalCode} {user.city}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5">
                  {t("Country", "Kraj")}
                </div>
                <div className="text-[13px] text-champagne pb-2 border-b border-[rgba(211,152,88,0.15)]">
                  {user.country}
                </div>
              </div>
              <button
                onClick={() => {
                  setEditData(user);
                  setEditing(true);
                }}
                className="text-[10px] tracking-[0.15em] uppercase text-whiskey bg-transparent border-none mt-4 hover:opacity-70 transition-opacity cursor-pointer"
              >
                {t("Edit Address", "Edytuj adres")} &rarr;
              </button>
            </div>
          </div>

          <div className="bg-balsamico border border-[rgba(211,152,88,0.15)] p-7">
            <div className="text-[11px] tracking-[0.2em] uppercase text-whiskey mb-5">
              {t("InPost Favourite", "Ulubiony InPost")}
            </div>
            <div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.35)] mb-1.5">
                Paczkomat
              </div>
              <div className="text-[13px] text-champagne pb-2 border-b border-[rgba(211,152,88,0.15)]">
                {user.favouritePaczkomat}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PaymentsSection() {
  const { orders, t } = useStore();

  return (
    <div>
      <h2 className="font-serif text-[32px] font-light text-champagne mb-1.5">
        {t("Payment History", "Historia płatności")}
      </h2>
      <p className="text-[12px] text-champagne-muted mb-10 tracking-[0.05em]">
        {t("All transactions processed via Stripe", "Transakcje przetworzone przez Stripe")}
      </p>

      {orders.length === 0 ? (
        <p className="text-champagne-dim text-[14px] text-center py-16">
          {t("No payments yet.", "Brak płatności.")}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-[10px] tracking-[0.18em] uppercase text-[rgba(234,206,170,0.35)] pb-4 text-left border-b border-[rgba(211,152,88,0.15)]">
                  {t("Date", "Data")}
                </th>
                <th className="text-[10px] tracking-[0.18em] uppercase text-[rgba(234,206,170,0.35)] pb-4 text-left border-b border-[rgba(211,152,88,0.15)]">
                  {t("Order", "Zamówienie")}
                </th>
                <th className="text-[10px] tracking-[0.18em] uppercase text-[rgba(234,206,170,0.35)] pb-4 text-left border-b border-[rgba(211,152,88,0.15)]">
                  {t("Method", "Metoda")}
                </th>
                <th className="text-[10px] tracking-[0.18em] uppercase text-[rgba(234,206,170,0.35)] pb-4 text-left border-b border-[rgba(211,152,88,0.15)]">
                  Status
                </th>
                <th className="text-[10px] tracking-[0.18em] uppercase text-[rgba(234,206,170,0.35)] pb-4 text-right border-b border-[rgba(211,152,88,0.15)]">
                  {t("Amount", "Kwota")}
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-4 text-[13px] text-champagne-muted border-b border-[rgba(211,152,88,0.06)]">
                    {order.date}
                  </td>
                  <td className="py-4 text-[13px] text-champagne border-b border-[rgba(211,152,88,0.06)]">
                    {order.id}
                  </td>
                  <td className="py-4 text-[13px] text-champagne-muted border-b border-[rgba(211,152,88,0.06)]">
                    {order.paymentMethod}
                  </td>
                  <td className="py-4 text-[13px] border-b border-[rgba(211,152,88,0.06)]">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] tracking-[0.1em] border border-[rgba(100,200,100,0.3)] text-[rgba(150,220,150,0.75)] uppercase">
                      {t("Paid", "Zapłacone")}
                    </span>
                  </td>
                  <td className="py-4 text-[13px] text-whiskey text-right border-b border-[rgba(211,152,88,0.06)]">
                    {order.total.toLocaleString("pl")} PLN
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AccountDashboard() {
  const { user, logout, t } = useStore();
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");

  if (!user) return null;

  const navItems: { id: AccountTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "orders",
      label: t("My Orders", "Zamówienia"),
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      id: "wishlist",
      label: t("Wishlist", "Ulubione"),
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: t("Profile & Address", "Profil i adres"),
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
    {
      id: "payments",
      label: t("Payment History", "Historia płatności"),
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[calc(100vh-65px)]">
      {/* Sidebar */}
      <div className="bg-balsamico border-r border-[rgba(211,152,88,0.15)] md:block">
        <div className="px-7 py-8 border-b border-[rgba(211,152,88,0.15)]">
          <div className="font-serif text-[20px] font-light text-champagne mb-1">
            {user.firstName} {user.lastName.charAt(0)}.
          </div>
          <div className="text-[11px] text-champagne-muted tracking-[0.05em]">
            {user.email}
          </div>
        </div>

        <div className="py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full text-left px-7 py-3.5 text-[12px] tracking-[0.12em] uppercase border-none bg-transparent transition-all cursor-pointer border-l-2 ${
                activeTab === item.id
                  ? "text-champagne border-l-whiskey bg-[rgba(211,152,88,0.06)]"
                  : "text-champagne-muted border-l-transparent hover:text-champagne hover:bg-[rgba(211,152,88,0.04)]"
              }`}
            >
              <span
                className={`shrink-0 ${
                  activeTab === item.id ? "opacity-100" : "opacity-50"
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="px-7 pt-7 mt-10 border-t border-[rgba(211,152,88,0.15)]">
          <button
            onClick={logout}
            className="text-[10px] tracking-[0.15em] uppercase text-[rgba(234,206,170,0.25)] bg-transparent border-none hover:text-champagne transition-colors cursor-pointer"
          >
            {t("Sign Out", "Wyloguj się")}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-12">
        {activeTab === "orders" && <OrdersSection />}
        {activeTab === "wishlist" && <WishlistSection />}
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "payments" && <PaymentsSection />}
      </div>
    </div>
  );
}

export default function AccountPage() {
  const { isLoggedIn } = useStore();

  return (
    <>
      <AnnouncementBar />
      <Header />
      {isLoggedIn ? (
        <main className="bg-black min-h-screen pt-20 md:pt-24">
          <AccountDashboard />
        </main>
      ) : (
        <main className="bg-black min-h-screen pt-32 md:pt-40 pb-20 px-6 md:px-12">
          <LoginRegisterView />
        </main>
      )}
      <Footer />
    </>
  );
}
