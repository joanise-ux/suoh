import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Delivery options, costs and the SUOH return policy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
