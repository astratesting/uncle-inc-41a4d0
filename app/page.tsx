import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { WaitlistCTA } from '@/components/WaitlistCTA';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Nav />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <WaitlistCTA />
      <Footer />
    </div>
  );
}
