"use client";

import { Hero, Marquee } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Fraunces, Geist } from "next/font/google";
import './globals.css';

import { BaandAid } from "@/components/sections/Baandaid";
import { FAQ } from "@/components/sections/FAQ";
import { Feed } from "@/components/sections/Feed";
import { Footer } from "@/components/sections/Footer";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Manifesto } from "@/components/sections/Manifesto";
import { Signup } from "@/components/sections/Signup";
import { Swaps } from "@/components/sections/Swaps";
import { Maths } from "@/components/sections/TheMath";


const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function HomePage() {
  return (
    <main
      className={`${fraunces.variable} ${geist.variable} min-h-screen bg-paper text-ink font-sans antialiased`}
    >
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Maths />
      <Swaps />
      <BaandAid />
      <Manifesto />
      <Feed />
      <FAQ />
      <Signup />
      <Footer />
    </main>
  );
}
















