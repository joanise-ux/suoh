import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";

export async function generateMetadata({
  params,
}: LayoutProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function Layout({ children, params }: LayoutProps<"/product/[slug]">) {
  const { slug } = await params;
  if (!getProductBySlug(slug)) notFound();
  return children;
}
