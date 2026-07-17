import { Nav } from "@/components/nav/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Methodology } from "@/components/methodology/Methodology";
import { Features } from "@/components/features/Features";
import { Installation } from "@/components/installation/Installation";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Methodology />
      <Features />
      <Installation />
      <Footer />
    </>
  );
}