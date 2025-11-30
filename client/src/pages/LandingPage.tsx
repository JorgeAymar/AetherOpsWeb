import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Features from "@/components/Features";
import SuccessStories from "@/components/SuccessStories";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Features />
        <SuccessStories />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
