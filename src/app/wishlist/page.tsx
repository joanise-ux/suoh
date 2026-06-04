"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getProductBySlug } from "@/lib/products";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function WishlistItem({ slug }: { slug: string }) {
  const { addToCart, toggleWishlist, t } = useStore();
  const product = getProductBySlug(slug);
  const [added, setAdded] = useState(false);

  if (!product) return null;

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
      <Link
        href={`/product/${product.slug}`}
        className="font-serif text-[18px] font-light text-champagne no-underline hover:text-whiskey transition-colors block mb-1"
      >
        {t(product.name, product.namePL)}
      </Link>
      <div className="text-[13px] tracking-[0.1em] text-whiskey mb-4">
        {product.priceFormatted}
      </div>
      <div className="flex gap-2">
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
          className="w-[38px] h-[38px] flex items-center justify-center bg-transparent border border-[rgba(234,206,170,0.35)] text-champagne hover:border-red-400 hover:text-red-400 transition-all duration-300 text-[12px] shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { wishlist, t } = useStore();

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-32 md:pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline mb-6 inline-block"
          >
            ← {t("Back", "Wróć")}
          </Link>

          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-light text-champagne mb-12">
            {t("Wishlist", "Ulubione")}
          </h1>

          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-[48px] mb-6 opacity-30">♡</div>
              <p className="text-champagne-dim text-[14px] mb-6">
                {t(
                  "Your wishlist is empty. Browse our collections and save pieces you love.",
                  "Twoja lista ulubionych jest pusta. Przeglądaj kolekcje i zapisuj ulubione produkty."
                )}
              </p>
              <Link
                href="/"
                className="inline-block border border-whiskey text-champagne py-3 px-8 text-[11px] tracking-[0.2em] uppercase no-underline hover:bg-whiskey hover:text-black transition-colors duration-300"
              >
                {t("Explore collections", "Przeglądaj kolekcje")}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {wishlist.map((slug) => (
                <WishlistItem key={slug} slug={slug} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
