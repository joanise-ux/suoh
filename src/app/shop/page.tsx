"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { products, categories } from "@/lib/products";
import { useRouter } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { Product } from "@/lib/products";

function ShopProductCard({ product }: { product: Product }) {
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
      <Link
        href={`/product/${product.slug}`}
        className="block relative overflow-hidden aspect-[3/4] mb-4"
      >
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
          {added
            ? t("Added ✓", "Dodano ✓")
            : t("Add to bag", "Dodaj do koszyka")}
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

function ShopContent() {
  const { t } = useStore();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const router = useRouter();
  const [filter, setFilter] = useState<string>(categoryParam || "all");

  useEffect(() => {
    if (categoryParam && categories.some((c) => c.slug === categoryParam)) {
      setFilter(categoryParam);
    }
  }, [categoryParam]);

  const handleFilter = (slug: string) => {
    setFilter(slug);
    if (slug === "all") {
      router.replace("/shop", { scroll: false });
    } else {
      router.replace(`/shop?category=${slug}`, { scroll: false });
    }
  };

  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-28 md:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase mb-8">
            <Link
              href="/"
              className="text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline"
            >
              {t("Home", "Strona główna")}
            </Link>
            <span className="text-champagne-dim opacity-40">/</span>
            <span className="text-champagne">
              {filter === "all"
                ? t("Shop", "Sklep")
                : t(
                    categories.find((c) => c.slug === filter)?.name || "Shop",
                    categories.find((c) => c.slug === filter)?.namePL || "Sklep"
                  )}
            </span>
          </nav>

          <RevealOnScroll>
            <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-3 block">
              ✦ {t("Shop", "Sklep")}
            </span>
            <h1 className="font-serif text-[clamp(28px,5vw,48px)] font-light text-champagne mb-3">
              {t("All products", "Wszystkie produkty")}
            </h1>
            <p className="text-[13px] text-champagne-muted leading-[1.8] mb-10">
              {t(
                "Every piece handmade in Wrocław. One at a time.",
                "Każdy element ręcznie wykonany we Wrocławiu. Jeden po drugim."
              )}
            </p>
          </RevealOnScroll>

          <div className="flex gap-4 mb-10 flex-wrap">
            <button
              onClick={() => handleFilter("all")}
              className={`text-[11px] tracking-[0.2em] uppercase bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-2.5 transition-all duration-300 cursor-pointer ${
                filter === "all"
                  ? "text-black bg-whiskey border-whiskey"
                  : "text-champagne-muted hover:text-champagne hover:border-whiskey"
              }`}
            >
              {t("All", "Wszystko")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleFilter(cat.slug)}
                className={`text-[11px] tracking-[0.2em] uppercase bg-transparent border border-[rgba(211,152,88,0.25)] px-5 py-2.5 transition-all duration-300 cursor-pointer ${
                  filter === cat.slug
                    ? "text-black bg-whiskey border-whiskey"
                    : "text-champagne-muted hover:text-champagne hover:border-whiskey"
                }`}
              >
                {t(cat.name, cat.namePL)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
            {filtered.map((product) => (
              <ShopProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
