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

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  favouritePaczkomat: string;
}

export interface Order {
  id: string;
  date: string;
  items: { slug: string; qty: number; price: number }[];
  delivery: string;
  deliveryCost: number;
  total: number;
  status: "processing" | "shipped" | "delivered";
  trackingCode?: string;
  paymentMethod: string;
}

interface StoreContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, pl: string) => string;
  cart: CartItem[];
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
  isLoggedIn: boolean;
  user: UserProfile | null;
  orders: Order[];
  login: (email: string, password: string) => void;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
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

const defaultUser: UserProfile = {
  firstName: "Anna",
  lastName: "Kowalska",
  email: "anna@example.com",
  phone: "+48 500 123 456",
  street: "ul. Świdnicka 12/4",
  city: "Wrocław",
  postalCode: "50-066",
  country: "Poland",
  favouritePaczkomat: "WRO01M — ul. Świdnicka 1, Wrocław",
};

const defaultOrders: Order[] = [
  {
    id: "#SUOH-2026-0042",
    date: "1 June 2026",
    items: [{ slug: "slate-chain-bag", qty: 1, price: 540 }],
    delivery: "InPost KRA15A",
    deliveryCost: 14,
    total: 554,
    status: "shipped",
    trackingCode: "SUOH6420260042",
    paymentMethod: "BLIK",
  },
  {
    id: "#SUOH-2026-0031",
    date: "12 April 2026",
    items: [{ slug: "noir-crossbody", qty: 1, price: 490 }],
    delivery: "DPD Kurier",
    deliveryCost: 18,
    total: 508,
    status: "delivered",
    trackingCode: "SUOH6420260031",
    paymentMethod: "BLIK",
  },
  {
    id: "#SUOH-2025-0019",
    date: "28 November 2025",
    items: [
      { slug: "mauve-shoulder", qty: 1, price: 420 },
      { slug: "slate-chain-bag", qty: 1, price: 540 },
    ],
    delivery: "InPost WRO02M",
    deliveryCost: 14,
    total: 974,
    status: "delivered",
    trackingCode: "SUOH6420250019",
    paymentMethod: "Mastercard ···8801",
  },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLang(loadJSON<Lang>("suoh-lang", "en"));
    setCart(loadJSON<CartItem[]>("suoh-cart", []));
    setWishlist(loadJSON<string[]>("suoh-wishlist", []));
    const savedLoggedIn = loadJSON<boolean>("suoh-logged-in", false);
    setIsLoggedIn(savedLoggedIn);
    if (savedLoggedIn) {
      setUser(loadJSON<UserProfile>("suoh-user", defaultUser));
      setOrders(loadJSON<Order[]>("suoh-orders", defaultOrders));
    }
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

  useEffect(() => {
    if (!hydrated) return;
    saveJSON("suoh-logged-in", isLoggedIn);
    if (isLoggedIn && user) saveJSON("suoh-user", user);
    if (isLoggedIn) saveJSON("suoh-orders", orders);
  }, [isLoggedIn, user, orders, hydrated]);

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

  const clearCart = useCallback(() => {
    setCart([]);
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

  const login = useCallback((_email: string, _password: string) => {
    setIsLoggedIn(true);
    setUser(loadJSON<UserProfile>("suoh-user", defaultUser));
    setOrders(loadJSON<Order[]>("suoh-orders", defaultOrders));
  }, []);

  const register = useCallback(
    (data: { firstName: string; lastName: string; email: string; password: string }) => {
      const newUser: UserProfile = {
        ...defaultUser,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };
      setIsLoggedIn(true);
      setUser(newUser);
      setOrders([]);
    },
    []
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setOrders([]);
    try {
      localStorage.removeItem("suoh-logged-in");
      localStorage.removeItem("suoh-user");
      localStorage.removeItem("suoh-orders");
    } catch {}
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

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
        clearCart,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isLoggedIn,
        user,
        orders,
        login,
        register,
        logout,
        addOrder,
        updateProfile,
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
