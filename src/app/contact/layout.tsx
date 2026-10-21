import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SUOH about orders and custom pieces.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
