import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import CollectionsGrid from "@/components/CollectionsGrid";
import AboutSection from "@/components/AboutSection";
import LookbookSection from "@/components/LookbookSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <ProductGrid />
      <CollectionsGrid />
      <AboutSection />
      <LookbookSection />
      <Newsletter />
      <Footer />
    </>
  );
}
