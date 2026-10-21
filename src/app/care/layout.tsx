import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care Guide",
  description: "How to care for your handmade SUOH piece.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
