"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getProductsByCategory, categories } from "@/lib/products";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Product } from "@/lib/products";

function CategoryProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist, t } = useStore();
  const [added, setAdded] = useState(false);
  const inWishlist = isInWishlist(product.slug);

  const handleAdd = () => {
    addToCart(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group">
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[3/4] mb-4">
        <Image
          src={product.image}
          alt={t(product.name, product.namePL)}
          fill
          className="object-cover transition-transform duration-600 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>
      <div className="mb-1">
        <Link
          href={`/product/${product.slug}`}
          className="font-serif text-[18px] font-light text-champagne no-underline hover:text-whiskey transition-colors"
        >
          {t(product.name, product.namePL)}
        </Link>
      </div>
      <div className="text-[11px] tracking-[0.1em] text-champagne-dim mb-1">
        {t(product.tag, product.tagPL)}
      </div>
      <div className="text-[13px] tracking-[0.1em] text-whiskey mb-4">
        {product.priceFormatted}
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={handleAdd}
          className={`flex-1 border-none py-2.5 text-[10px] tracking-[0.2em] uppercase font-sans font-light transition-colors duration-300 ${
            added
              ? "bg-burnt text-champagne"
              : "bg-whiskey text-black hover:bg-champagne"
          }`}
        >
          {added ? t("Added ✓", "Dodano ✓") : t("Add to bag", "Dodaj do koszyka")}
        </button>
        <button
          onClick={() => toggleWishlist(product.slug)}
          className={`w-[38px] h-[38px] flex items-center justify-center transition-all duration-300 text-[15px] shrink-0 ${
            inWishlist
              ? "bg-whiskey text-black border border-whiskey"
              : "bg-transparent border border-[rgba(234,206,170,0.35)] text-champagne hover:border-whiskey hover:text-whiskey"
          }`}
        >
          {inWishlist ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useStore();
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = getProductsByCategory(slug);

  if (!category) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <div className="bg-black min-h-screen pt-40 text-center">
          <h1 className="font-serif text-3xl text-champagne mb-4">
            {t("Category not found", "Nie znaleziono kategorii")}
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

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen">
        <div className="relative h-[40vh] overflow-hidden">
          <Image
            src={category.image}
            alt={t(category.name, category.namePL)}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-3">
              ✦ {t("Collection", "Kolekcja")}
            </span>
            <h1 className="font-serif text-[clamp(36px,6vw,64px)] font-light text-champagne tracking-[0.15em]">
              {t(category.name, category.namePL)}
            </h1>
          </div>
        </div>

        <div className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
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
            <span className="text-champagne">
              {t(category.name, category.namePL)}
            </span>
          </nav>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {categoryProducts.map((product) => (
              <CategoryProductCard key={product.slug} product={product} />
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-champagne-dim text-sm">
                {t("No products in this category yet.", "Brak produktów w tej kategorii.")}
              </p>
            </div>
          )}

          <div className="mt-20 pt-12 border-t border-[rgba(234,206,170,0.1)]">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-6">
              {t("Other Collections", "Inne kolekcje")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories
                .filter((c) => c.slug !== slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="text-[11px] tracking-[0.2em] uppercase bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-2.5 text-champagne-muted hover:text-champagne hover:border-whiskey transition-all duration-300 no-underline"
                  >
                    {t(c.name, c.namePL)}
                  </Link>
                ))}
              <Link
                href="/shop"
                className="text-[11px] tracking-[0.2em] uppercase bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-2.5 text-champagne-muted hover:text-champagne hover:border-whiskey transition-all duration-300 no-underline"
              >
                {t("View all", "Zobacz wszystko")} →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
