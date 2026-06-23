import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhatWereBuilding } from "@/components/WhatWereBuilding";
import { Waitlist } from "@/components/Waitlist";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatWereBuilding />
        <Waitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
