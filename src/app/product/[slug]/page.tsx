"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getProductBySlug, categories } from "@/lib/products";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const { addToCart, toggleWishlist, isInWishlist, t } = useStore();
  const [addedToBag, setAddedToBag] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <div className="bg-black min-h-screen pt-40 text-center">
          <h1 className="font-serif text-3xl text-champagne mb-4">
            {t("Product not found", "Nie znaleziono produktu")}
          </h1>
          <Link
            href="/"
            className="text-whiskey text-sm tracking-widest uppercase hover:text-champagne transition-colors"
          >
            {t("← Back to shop", "← Wróć do sklepu")}
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToBag = () => {
    addToCart(product.slug);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 1800);
  };

  const inWishlist = isInWishlist(product.slug);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-32 md:pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase mb-10">
            <Link
              href="/"
              className="text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline"
            >
              {t("Home", "Strona główna")}
            </Link>
            <span className="text-champagne-dim opacity-40">/</span>
            <Link
              href="/shop"
              className="text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline"
            >
              {t("Shop", "Sklep")}
            </Link>
            <span className="text-champagne-dim opacity-40">/</span>
            <Link
              href={`/category/${product.category}`}
              className="text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline"
            >
              {t(
                categories.find((c) => c.slug === product.category)?.name || "",
                categories.find((c) => c.slug === product.category)?.namePL || ""
              )}
            </Link>
            <span className="text-champagne-dim opacity-40">/</span>
            <span className="text-champagne">
              {t(product.name, product.namePL)}
            </span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <div className="relative aspect-[3/4] overflow-hidden mb-3">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 overflow-hidden border-2 transition-colors ${
                        selectedImage === i
                          ? "border-whiskey"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-3 block">
                {t(product.tag, product.tagPL)}
              </span>
              <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-light text-champagne mb-2 leading-tight">
                {t(product.name, product.namePL)}
              </h1>
              <div className="text-[18px] tracking-[0.1em] text-whiskey mb-8">
                {product.priceFormatted}
              </div>

              <p className="text-[14px] leading-[1.95] text-champagne-dim mb-8">
                {t(product.description, product.descriptionPL)}
              </p>

              <div className="mb-8 space-y-4">
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-whiskey mb-2">
                    {t("Materials", "Materiały")}
                  </div>
                  <div className="text-[13px] text-champagne-dim leading-relaxed">
                    {t(product.materials, product.materialsPL)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-whiskey mb-2">
                    {t("Dimensions", "Wymiary")}
                  </div>
                  <div className="text-[13px] text-champagne-dim">
                    {product.dimensions}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToBag}
                  className={`flex-1 border-none py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-light transition-colors duration-300 ${
                    addedToBag
                      ? "bg-burnt text-champagne"
                      : "bg-whiskey text-black hover:bg-champagne"
                  }`}
                >
                  {addedToBag
                    ? t("Added ✓", "Dodano ✓")
                    : t("Add to bag", "Dodaj do koszyka")}
                </button>
                <button
                  onClick={() => toggleWishlist(product.slug)}
                  className={`w-[52px] h-[52px] flex items-center justify-center transition-all duration-300 text-[18px] shrink-0 ${
                    inWishlist
                      ? "bg-whiskey text-black border border-whiskey"
                      : "bg-transparent border border-[rgba(234,206,170,0.35)] text-champagne hover:border-whiskey hover:text-whiskey"
                  }`}
                >
                  {inWishlist ? "♥" : "♡"}
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-[rgba(211,152,88,0.1)]">
                <div className="text-[10px] tracking-[0.25em] uppercase text-whiskey mb-4">
                  {t("Details", "Szczegóły")}
                </div>
                <ul className="list-none space-y-2">
                  <li className="text-[12px] text-champagne-dim">
                    ✦ {t("Handmade in Wrocław, Poland", "Ręcznie robione we Wrocławiu")}
                  </li>
                  <li className="text-[12px] text-champagne-dim">
                    ✦ {t("Each piece is unique", "Każda sztuka jest wyjątkowa")}
                  </li>
                  <li className="text-[12px] text-champagne-dim">
                    ✦ {t("Free shipping above 200 PLN", "Darmowa wysyłka powyżej 200 PLN")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
