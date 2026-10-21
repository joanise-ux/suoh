import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "SUOH pieces as worn.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
