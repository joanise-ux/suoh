import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Order Confirmed — SUOH" },
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
