"use client";

import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/lib/products";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, t } = useStore();

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as { slug: string; qty: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }[];

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-black min-h-screen pt-32 md:pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase text-whiskey opacity-60 hover:opacity-100 transition-opacity no-underline mb-6 inline-block"
          >
            ← {t("Back", "Wróć")}
          </Link>

          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-light text-champagne mb-12">
            {t("Your Bag", "Twój koszyk")}
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-[48px] mb-6 opacity-30">🛍</div>
              <p className="text-champagne-dim text-[14px] mb-6">
                {t("Your bag is empty.", "Twój koszyk jest pusty.")}
              </p>
              <Link
                href="/"
                className="inline-block border border-whiskey text-champagne py-3 px-8 text-[11px] tracking-[0.2em] uppercase no-underline hover:bg-whiskey hover:text-black transition-colors duration-300"
              >
                {t("Continue shopping", "Kontynuuj zakupy")}
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-0">
                {cartItems.map((item) => (
                  <div
                    key={item.slug}
                    className="flex gap-5 py-6 border-b border-[rgba(211,152,88,0.1)]"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      className="relative w-24 h-32 shrink-0 overflow-hidden"
                    >
                      <Image
                        src={item.product.image}
                        alt={t(item.product.name, item.product.namePL)}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-serif text-[17px] text-champagne no-underline hover:text-whiskey transition-colors"
                        >
                          {t(item.product.name, item.product.namePL)}
                        </Link>
                        <div className="text-[11px] text-champagne-dim mt-1">
                          {t(item.product.tag, item.product.tagPL)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQty(item.slug, item.qty - 1)}
                            className="bg-transparent border border-[rgba(234,206,170,0.2)] text-champagne w-8 h-8 flex items-center justify-center text-[14px] hover:border-whiskey transition-colors"
                          >
                            −
                          </button>
                          <span className="text-[13px] text-champagne w-6 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.slug, item.qty + 1)}
                            className="bg-transparent border border-[rgba(234,206,170,0.2)] text-champagne w-8 h-8 flex items-center justify-center text-[14px] hover:border-whiskey transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-[14px] text-whiskey tracking-[0.05em]">
                          {item.product.price * item.qty} PLN
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.slug)}
                      className="bg-transparent border-none text-champagne-dim hover:text-champagne transition-colors self-start text-[14px] mt-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[rgba(211,152,88,0.15)]">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-champagne-dim">
                    {t("Total", "Razem")}
                  </span>
                  <span className="font-serif text-[24px] text-champagne">
                    {total} PLN
                  </span>
                </div>
                {total >= 200 && (
                  <div className="text-[11px] text-whiskey tracking-[0.15em] text-center mb-5">
                    ✦ {t("Free shipping included", "Darmowa wysyłka w zestawie")}
                  </div>
                )}
                <Link
                  href="/checkout"
                  className="block w-full bg-whiskey border-none py-4 text-[11px] tracking-[0.22em] uppercase text-black font-sans hover:bg-champagne transition-colors duration-300 text-center no-underline"
                >
                  {t("Checkout", "Przejdź do płatności")}
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
