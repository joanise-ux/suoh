"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { products as allProducts } from "@/lib/products";
import RevealOnScroll from "./RevealOnScroll";
import type { Product } from "@/lib/products";

const featuredProducts = allProducts.slice(0, 4);

function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist, t } = useStore();
  const [added, setAdded] = useState(false);
  const inWishlist = isInWishlist(product.slug);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
  };

  return (
    <Link href={`/product/${product.slug}`} className="relative overflow-hidden aspect-[3/4] group block no-underline">
      <Image
        src={product.image}
        alt={t(product.name, product.namePL)}
        fill
        className="object-cover transition-transform duration-600 group-hover:scale-107"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-[rgba(10,6,5,0)] group-hover:bg-[rgba(10,6,5,0.55)] transition-[background] duration-400 flex flex-col justify-end p-6">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <div className="font-serif text-[19px] font-light text-champagne mb-1">
            {t(product.name, product.namePL)}
          </div>
          <div className="text-[12px] tracking-[0.1em] text-whiskey mb-3.5">
            {product.priceFormatted}
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={handleAdd}
              className={`flex-1 border-none py-2.5 text-[10px] tracking-[0.2em] uppercase font-sans font-light transition-colors duration-300 cursor-pointer ${
                added
                  ? "bg-burnt text-champagne"
                  : "bg-whiskey text-black hover:bg-champagne"
              }`}
            >
              {added ? t("Added ✓", "Dodano ✓") : t("Add to bag", "Dodaj do koszyka")}
            </button>
            <button
              onClick={handleWishlist}
              className={`w-[38px] h-[38px] flex items-center justify-center transition-all duration-300 text-[15px] shrink-0 cursor-pointer ${
                inWishlist
                  ? "bg-whiskey text-black border border-whiskey"
                  : "bg-transparent border border-[rgba(234,206,170,0.35)] text-champagne hover:border-whiskey hover:text-whiskey"
              }`}
            >
              {inWishlist ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductGrid() {
  const { t } = useStore();

  return (
    <section id="new" className="bg-black py-16 md:py-24 px-6 md:px-12">
      <RevealOnScroll>
        <span className="text-[10px] tracking-[0.3em] uppercase text-whiskey mb-4 block">
          ✦ {t("New In", "Nowości")}
        </span>
        <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-light text-champagne mb-14">
          {t("Latest Pieces", "Najnowsze produkty")}
        </h2>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
