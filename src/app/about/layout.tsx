import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind SUOH — handmade in Wrocław, Poland.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
