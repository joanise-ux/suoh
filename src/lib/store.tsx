"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type Lang = "en" | "pl";

interface CartItem {
  slug: string;
  qty: number;
}

interface StoreContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, pl: string) => string;
  cart: CartItem[];
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  cartCount: number;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLang(loadJSON<Lang>("suoh-lang", "en"));
    setCart(loadJSON<CartItem[]>("suoh-cart", []));
    setWishlist(loadJSON<string[]>("suoh-wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveJSON("suoh-lang", lang);
  }, [lang, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveJSON("suoh-cart", cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveJSON("suoh-wishlist", wishlist);
  }, [wishlist, hydrated]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "pl" : "en"));
  }, []);

  const t = useCallback(
    (en: string, pl: string) => (lang === "en" ? en : pl),
    [lang]
  );

  const addToCart = useCallback((slug: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.slug === slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === slug ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { slug, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.slug !== slug));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.slug === slug ? { ...item, qty } : item))
      );
    }
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const isInWishlist = useCallback(
    (slug: string) => wishlist.includes(slug),
    [wishlist]
  );

  return (
    <StoreContext.Provider
      value={{
        lang,
        toggleLang,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
