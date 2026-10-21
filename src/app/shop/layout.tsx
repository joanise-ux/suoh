import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Handmade crochet bags, keychains and gifts from SUOH.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
