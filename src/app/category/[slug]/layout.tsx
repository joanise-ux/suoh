import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/lib/products";

function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: LayoutProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Handmade crochet ${category.name.toLowerCase()} from SUOH.`,
  };
}

export default async function Layout({ children, params }: LayoutProps<"/category/[slug]">) {
  const { slug } = await params;
  if (!getCategory(slug)) notFound();
  return children;
}
