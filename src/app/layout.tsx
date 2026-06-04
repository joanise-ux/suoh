import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
  title: "SUOH — Art you can carry.",
  description:
    "Handmade bags, keychains and gifts crafted in Wrocław, Poland. Each piece is unique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <body className="font-sans">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
